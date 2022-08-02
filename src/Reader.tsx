import React, { useEffect, useState } from 'react';
import { LoadingComponent } from './utils/LoadingComponent';
import type { ReaderProps } from './types';
import { useDownloadFile } from './hooks/useDownloadFile';
import { View } from './View';

export function Reader({
  src,
  renderLoadingComponent = (props) => <LoadingComponent {...props} />,
  ...rest
}: ReaderProps) {
  const {
    downloadFile,
    size: fileSize,
    progress: downloadProgress,
    success: downloadSuccess,
    error: downloadError,
  } = useDownloadFile();

  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      if (src.uri) {
        const { uri: bookFile } = await downloadFile(src.uri, 'test.epub');
        setFile(bookFile!);
        setIsLoading(false);
      }
    })();
  }, [downloadFile, src.uri]);

  if (isLoading) {
    return renderLoadingComponent({
      fileSize,
      downloadProgress,
      downloadSuccess,
      downloadError,
    });
  }
  return <View src={{ uri: file }} {...rest} />;
}
