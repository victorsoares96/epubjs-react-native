import React, { useContext, useEffect, useState } from 'react';
import { LoadingFile } from './utils/LoadingFile';
import type { ReaderProps } from './types';
import { View } from './View';
import { useInjectBookVariables } from './hooks/useInjectBookVariables';
import { ReaderContext, defaultTheme as initialTheme } from './context';
import { isURL } from './utils/isURL';
import { getSourceType } from './utils/getSourceType';
import { getSourceName } from './utils/getPathname';
import { SourceType } from './utils/enums/source-type.enum';

// ...
export function Reader({
  src,
  width,
  height,
  defaultTheme = initialTheme,
  initialLocations,
  renderLoadingFileComponent = (props) => (
    <LoadingFile {...props} width={width} height={height} />
  ),
  fileSystem: useFileSystem,
  ...rest
}: ReaderProps) {
  const {
    downloadFile,
    size: fileSize,
    progress: downloadProgress,
    success: downloadSuccess,
    error: downloadError,
  } = useFileSystem();

  const { setIsLoading, isLoading } = useContext(ReaderContext);
  const { injectBookVariables } = useInjectBookVariables();

  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (src) {
        const sourceType = getSourceType(src);
        const isExternalSource = isURL(src);

        if (!sourceType) {
          throw new Error(`Invalid source type: ${src}`);
        }

        if (!isExternalSource) {
          if (sourceType === SourceType.BASE64) {
            setTemplate(
              injectBookVariables({
                type: SourceType.BASE64,
                book: src,
                theme: defaultTheme,
                locations: initialLocations,
                enableSelection: true,
              })
            );

            setIsLoading(false);
          } else {
            setTemplate(
              injectBookVariables({
                type: SourceType.BINARY,
                book: src,
                theme: defaultTheme,
                locations: initialLocations,
                enableSelection: true,
              })
            );

            setIsLoading(false);
          }
        }

        if (isExternalSource) {
          const sourceName = getSourceName(src);

          if (!sourceName) {
            throw new Error(`Invalid source name: ${src}`);
          }

          if (sourceType === SourceType.OPF || sourceType === SourceType.EPUB) {
            setTemplate(
              injectBookVariables({
                type: sourceType,
                book: src,
                theme: defaultTheme,
                locations: initialLocations,
                enableSelection: true,
              })
            );

            setIsLoading(false);
          } else {
            const { uri: bookFile } = await downloadFile(src, sourceName);

            if (!bookFile) throw new Error("Couldn't download book");

            setTemplate(
              injectBookVariables({
                type: sourceType,
                book: bookFile,
                theme: defaultTheme,
                locations: initialLocations,
                enableSelection: true,
              })
            );

            setIsLoading(false);
          }
        }
      }
    })();
  }, [
    defaultTheme,
    downloadFile,
    initialLocations,
    injectBookVariables,
    setIsLoading,
    src,
  ]);

  if (isLoading) {
    return renderLoadingFileComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError,
    });
  }

  if (!template) throw new Error('Template is not set');
  return <View template={template} width={width} height={height} {...rest} />;
}
