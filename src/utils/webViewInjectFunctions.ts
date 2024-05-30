import WebView from 'react-native-webview';
import {
  Annotation,
  AnnotationStyles,
  AnnotationType,
  ePubCfi,
} from '../types';

export function injectJavaScript(
  ref: React.MutableRefObject<WebView | null>,
  script: string
) {
  ref.current?.injectJavaScript(`
    try {
      ${script}
    } catch (error) {
      alert(error?.message);
    }

    true;
  `);
}

export function mapAnnotationStylesToEpubStyles(
  type: AnnotationType,
  styles?: AnnotationStyles
) {
  let epubStyles: { [key: string]: unknown } = {};

  if (type === 'highlight') {
    epubStyles = {
      'fill': styles?.color || 'yellow',
      'fill-opacity': styles?.opacity || 0.3,
    };
  }

  if (type === 'underline') {
    epubStyles = {
      'stroke': styles?.color || 'yellow',
      'stroke-opacity': styles?.opacity || 0.3,
      'stroke-width': styles?.thickness || 1,
    };
  }

  return epubStyles;
}

export function mapObjectToAnnotation(objectName = 'annotation') {
  return `{
    type: ${objectName}.type,
    data: ${objectName}.data,
    cfiRange: ${objectName}.cfiRange,
    sectionIndex: ${objectName}.sectionIndex,
    cfiRangeText: ${objectName}?.cfiRangeText ? ${objectName}.cfiRangeText : ${objectName}.mark?.range?.toString(),
    iconClass: ${objectName}.data?.iconClass,
    styles: ${objectName}.type !== 'mark' ? {
      color: ${objectName}.styles?.fill || ${objectName}.mark?.attributes?.fill || ${objectName}.mark?.attributes?.stroke || ${objectName}.styles?.color,
      opacity: Number(${objectName}.styles?.['fill-opacity'] || ${objectName}.mark?.attributes?.['fill-opacity'] || ${objectName}.mark?.attributes?.['stroke-opacity'] || ${objectName}.styles?.opacity),
      thickness: Number(${objectName}.styles?.['stroke-width'] || ${objectName}.mark?.attributes?.['stroke-width'] || ${objectName}.styles?.thickness),
    } : undefined
  }`;
}

export function mapArrayObjectsToAnnotations(array: string | Array<object>) {
  return `
    ${array}.map(annotation => {
      const transform = annotation;

      return ${mapObjectToAnnotation('transform')};
    })
  `;
}

export function onChangeAnnotations(
  annotations = 'Object.values(rendition.annotations._annotations)'
) {
  return `
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'onChangeAnnotations',
      annotations: ${mapArrayObjectsToAnnotations(annotations)}
    }));
  `;
}

export function addAnnotation(
  type: AnnotationType,
  cfiRange: ePubCfi,
  data?: object,
  iconClass?: string,
  styles?: AnnotationStyles,
  cfiRangeText?: string,
  noEmit = false
) {
  const epubStyles = mapAnnotationStylesToEpubStyles(type, styles);

  if (type === 'mark') {
    // eslint-disable-next-line no-param-reassign
    iconClass = iconClass || 'epubjs-mk-balloon';
  }

  return `
    const annotation = rendition.annotations.add('${type}', ${JSON.stringify(cfiRange)}, ${JSON.stringify(
      data ?? {}
    )}, () => {}, ${JSON.stringify(iconClass)}, ${JSON.stringify(epubStyles)}, ${JSON.stringify(cfiRangeText)});

    const noEmit = ${noEmit};

    if (!noEmit) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'onAddAnnotation',
        annotation: ${mapObjectToAnnotation('annotation')}
      }));
    }
  `;
}

export function updateAnnotation(
  annotation: Annotation,
  data = {},
  styles?: AnnotationStyles
) {
  const epubStyles = mapAnnotationStylesToEpubStyles(annotation.type, styles);

  return `
    let annotations = Object.values(rendition.annotations._annotations);

    annotations = annotations.filter(item => item.cfiRange === ${JSON.stringify(annotation.cfiRange)});

    annotations.forEach(annotation => {
      annotation.update(${JSON.stringify(data)}, ${JSON.stringify(epubStyles)});
    });

    rendition.views().forEach(view => view.pane ? view.pane.render() : null);

    ${onChangeAnnotations()}
  `;
}
