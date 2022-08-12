import { SourceType } from './enums/source-type.enum';

export function getSourceType(source: string): SourceType | undefined {
  if (source.includes('base64,') || source.length > 1000) {
    return SourceType.BASE64;
  }

  if (source.includes('.epub')) {
    return SourceType.EPUB;
  }

  if (source.includes('.opf')) {
    return SourceType.OPF;
  }
  return undefined;
}
