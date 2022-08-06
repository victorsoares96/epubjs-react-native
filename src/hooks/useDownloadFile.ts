import { useCallback, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import type { DownloadProgressData } from 'expo-file-system';

export function useDownloadFile() {
  const [file, setFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const downloadFile = useCallback((fromUrl: string, toFile: string) => {
    const callback = (downloadProgress: DownloadProgressData) => {
      const currentProgress = Math.round(
        (downloadProgress.totalBytesWritten /
          downloadProgress.totalBytesExpectedToWrite) *
          100
      );
      setProgress(currentProgress);
    };

    const downloadResumable = FileSystem.createDownloadResumable(
      fromUrl,
      FileSystem.documentDirectory + toFile,
      { cache: true },
      callback
    );

    setDownloading(true);
    return downloadResumable
      .downloadAsync()
      .then((value) => {
        if (!value) throw new Error('Download failed');

        if (value.headers['Content-Length']) {
          setSize(Number(value.headers['Content-Length']));
        }

        setSuccess(true);
        setError(null);
        setFile(value.uri);

        return { uri: value.uri, mimeType: value.mimeType };
      })
      .catch((err) => {
        if (err instanceof Error) {
          setError(err.message);
        } else setError('Error downloading file');

        return { uri: null, mimeType: null };
      })
      .finally(() => setDownloading(false));
  }, []);

  const getFileInfo = useCallback((fileUri: string) => {
    return FileSystem.getInfoAsync(fileUri);
  }, []);
  return {
    file,
    progress,
    downloading,
    size,
    error,
    success,
    downloadFile,
    getFileInfo,
  };
}
