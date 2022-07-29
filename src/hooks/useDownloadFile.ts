import { useCallback, useState } from 'react';
import RNFS from 'react-native-fs';

export function useDownloadFile() {
  const [file, setFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const downloadFile = useCallback(
    (fromUrl: string, toFile: string, output?: 'utf8' | 'base64') => {
      return RNFS.downloadFile({
        fromUrl,
        toFile,
        begin: ({ contentLength }) => {
          setDownloading(true);
          setSize(contentLength);
        },
        progress: ({ bytesWritten, contentLength }) => {
          setProgress(Math.round((bytesWritten / contentLength) * 100));
        },
      })
        .promise.then(async ({ statusCode, jobId }) => {
          const File = await RNFS.readFile(toFile, output ?? 'utf8');
          setFile(File);

          if (statusCode === 200) {
            setSuccess(true);
          } else setError(`Error ${statusCode}`);
          setDownloading(false);

          return { jobId, file: File };
        })
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else setError(`Unknown Error`);

          setDownloading(false);
          console.log(err);

          return { jobId: null, file: null };
        });
    },
    []
  );

  return {
    file,
    progress,
    downloading,
    size,
    error,
    success,
    downloadFile,
  };
}
