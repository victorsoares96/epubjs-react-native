import React, { useContext, useEffect, useState } from 'react';
import { LoadingComponent } from './utils/LoadingComponent';
import type { ReaderProps } from './types';
import { useDownloadFile } from './hooks/useDownloadFile';
import { View } from './View';
import { useInjectBookVariables } from './hooks/useInjectBookVariables';
import { ReaderContext, defaultTheme as initialTheme } from './context';

export function Reader({
  src,
  width,
  height,
  defaultTheme = initialTheme,
  initialLocations,
  renderLoadingComponent = (props) => (
    <LoadingComponent {...props} width={width} height={height} />
  ),
  ...rest
}: ReaderProps) {
  const {
    downloadFile,
    size: fileSize,
    progress: downloadProgress,
    success: downloadSuccess,
    error: downloadError,
  } = useDownloadFile();

  const { setIsLoading, isLoading } = useContext(ReaderContext);
  const { injectBookVariables } = useInjectBookVariables();
  // const [isLoading, setIsLoading] = useState(true);

  const [template, setTemplate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      if (src.base64) {
        setTemplate(
          injectBookVariables({
            type: 'base64',
            book: src.base64,
            theme: defaultTheme,
            locations: initialLocations,
            enableSelection: true,
          })
        );
      } else if (src.url) {
        const { uri: bookFile } = await downloadFile(src.url, 'test.epub');

        if (!bookFile) throw new Error("Couldn't download book");

        setTemplate(
          injectBookVariables({
            type: 'url',
            book: bookFile,
            theme: defaultTheme,
            locations: initialLocations,
            enableSelection: true,
          })
        );
        setIsLoading(false);
      } else if (src.file) {
        setTemplate(
          injectBookVariables({
            type: 'file',
            book: src.file,
            theme: defaultTheme,
            locations: initialLocations,
            enableSelection: true,
          })
        );
      } else {
        throw new Error('src must be a base64, uri or a file object');
      }
    })().finally(() => setIsLoading(false));
  }, [
    defaultTheme,
    downloadFile,
    initialLocations,
    injectBookVariables,
    setIsLoading,
    src.base64,
    src.file,
    src.url,
  ]);

  if (isLoading) {
    return renderLoadingComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError,
    });
  }

  if (!template) throw new Error('Template is not set');
  return <View template={template} width={width} height={height} {...rest} />;
}
