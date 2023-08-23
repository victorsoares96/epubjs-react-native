import React, { useContext, useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { FileSystemDownloadResult } from 'expo-file-system';
import { LoadingFile } from './utils/LoadingFile';
import type { ReaderProps } from './types';
import { View } from './View';
import { useInjectWebVieWVariables } from './hooks/useInjectWebviewVariables';
import { ReaderContext, defaultTheme as initialTheme } from './context';
import { isURL } from './utils/isURL';
import { getSourceType } from './utils/getSourceType';
import { getSourceName } from './utils/getPathname';
import { SourceType } from './utils/enums/source-type.enum';
import { SafeAreaView, Text } from 'react-native';

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
  const { injectWebVieWVariables } = useInjectWebVieWVariables();
  const [template, setTemplate] = useState<string | null>(null);
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);
  const [allowedUris, setAllowedUris] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let jzipJsFileUri;
      let epubJsFileUri;

      const jzipDownloadResumable = FileSystem.createDownloadResumable(
        'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js',
        `${FileSystem.documentDirectory}jszip.min.js`,
        {},
        () => {}
      );

      try {
        jzipJsFileUri = ((await jzipDownloadResumable.downloadAsync()) as FileSystemDownloadResult)
          .uri;
      } catch (e) {
        throw new Error('failed to download jzip js file');
      }

      const epubjsDownloadResumable = FileSystem.createDownloadResumable(
        'https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js',
        `${FileSystem.documentDirectory}epub.min.js`,
        {},
        () => {}
      );

      try {
        epubJsFileUri = ((await epubjsDownloadResumable.downloadAsync()) as FileSystemDownloadResult)
          .uri;
      } catch (e) {
        throw new Error('failed to download epubjs js file');
      }

      if (src) {
        const sourceType = getSourceType(src);
        const isExternalSource = isURL(src);

        if (!sourceType) {
          throw new Error(`Invalid source type: ${src}`);
        }

        if (!isExternalSource) {
          if (sourceType === SourceType.BASE64) {
            setTemplate(
              injectWebVieWVariables({
                jzipJs: jzipJsFileUri,
                epubJs: epubJsFileUri,
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
              injectWebVieWVariables({
                jzipJs: jzipJsFileUri,
                epubJs: epubJsFileUri,
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

          if (sourceType === SourceType.OPF) {
            setTemplate(
              injectWebVieWVariables({
                jzipJs: jzipJsFileUri,
                epubJs: epubJsFileUri,
                type: sourceType,
                book: src,
                theme: defaultTheme,
                locations: initialLocations,
                enableSelection: true,
              })
            );

            setIsLoading(false);
          } else {
            const { uri: bookFileUri } = await downloadFile(src, sourceName);

            if (!bookFileUri) throw new Error("Couldn't download book");

            setAllowedUris(`${bookFileUri},${jzipJsFileUri},${epubJsFileUri}`);

            setTemplate(
              injectWebVieWVariables({
                jzipJs: jzipJsFileUri,
                epubJs: epubJsFileUri,
                type: sourceType,
                book: bookFileUri,
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
    injectWebVieWVariables,
    setIsLoading,
    src,
  ]);

  useEffect(() => {
    const saveTemplateFileToDoc = async () => {
      try {
        if (template) {
          const content = template;

          const fileUri = `${FileSystem.documentDirectory}index.html`;
          await FileSystem.writeAsStringAsync(fileUri, content);
          setTemplateUrl(fileUri);
        }
      } catch (error) {
        console.error('Error saving index.html file:', error);
        throw new Error('Error saving index.html file:');
      }
    };
    if (template) {
      saveTemplateFileToDoc();
    }
  }, [template]);

  if (isLoading) {
    return renderLoadingFileComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError,
    });
  }

  if (!templateUrl || !allowedUris) {
    // throw new Error('Template not set');
    return (
      <SafeAreaView>
        <Text>Template is not set</Text>
      </SafeAreaView>
    );
  }
  return (
    <View
      templateUri={templateUrl!}
      allowedUris={allowedUris!}
      width={width}
      height={height}
      {...rest}
    />
  );
}
