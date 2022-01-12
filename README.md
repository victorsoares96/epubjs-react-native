# epubjs-react-native

ePub.js Reader for React Native

## Installation

```sh
npm install epubjs-react-native
```

#### Installing dependencies into a bare React Native project

In your project, run:

```sh
npm install react-native-webview
```

#### If you use Expo

In your project, run:

```sh
expo install react-native-webview
```

##### If you develop for iOS use this command for install CocoaPods deps (if you use Expo you don't need this)

```sh
cd ios
```

```sh
npx pod install
```

## Usage

```tsx
import * as React from 'react';

import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, BookProvider } from 'epubjs-react-native';

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <BookProvider>
        <Reader
          src={{ uri: "https://s3.amazonaws.com/moby-dick/OPS/package.opf" }}
          width={width}
          height={height}
        />
      </BookProvider>
    </SafeAreaView>
  );
}
```

## Reader Params

| Param                    | Type            | Description                                                                 |
| ------------------------ | --------------- | --------------------------------------------------------------------------- |
| `src`                    | `string`        | The source of your ePub. Can be a base64 string or a URL. Required.         |
| `width`                  | `number`        | The width of the ePub Rendition. Required.                                  |
| `height`                 | `number`        | The height of the ePub Rendition. Required.                                 |
| `initialLocation`        | `ePubCfi`       | Can be an ePubCfi or chapter url. Optional.                                 |
| `enableSwipe`            | `boolean`       | Enable swipe actions. Default is `true`.                                    |
| `onSwipeLeft`            | `function`      | Called when swipe left gesture is detected. Optional.                       |
| `onSwipeRight`           | `function`      | Called when swipe right gesture is detected. Optional.                      |
| `renderLoadingComponent` | `ReactNode`     | Render when the book is loading. Optional.                                  |
| `onStarted`              | `function`      | Called once the book loads is started. Optional.                            |
| `onAttached`             | `function`      | Emit that rendering has attached to an element. Optional.                   |
| `onDisplayed`            | `function`      | Called once book has been displayed. Optional.                              |
| `onDisplayError`         | `function`      | Called once book has not been displayed. Optional.                          |
| `onRendered`             | `function`      | Emit that a section has been rendered. Optional.                            |
| `onRemoved`              | `function`      | Emit that the rendition has been resized. Optional.                         |
| `onResized`              | `function`      | Called when occurred a page change. Optional.                               |
| `onLocationChange`       | `function`      | Called when occurred a page change. Optional.                               |
| `onSearch`               | `function`      | Called once when the book has been searched. Optional.                      |
| `onLocationsReady`       | `function`      | Called once the locations has been generated. Optional.                     |
| `onSelected`             | `function`      | Called once a text selection has occurred. Optional.                        |
| `onMarkPressed`          | `function`      | Called when marked text is pressed. Optional.                               |
| `onOrientationChange`    | `function`      | Called when screen orientation change is detected. Optional.                |
| `onPress`                | `function`      | Called when the book was pressed. Optional.                                 |
| `onDoublePress`          | `function`      | Called when the book was double pressed. Optional.                          |
| `onLocationsReady`       | `function`      | Called once the locations has been generated. Optional.                     |
| `onLocationsReady`       | `function`      | Called once the locations has been generated. Optional.                     |
| `onLocationsReady`       | `function`      | Called once the locations has been generated. Optional.                     |

## Hooks

#### useBook

`useBook()` is a customized hook that will return all Book states and the methods that will help you. **Make sure you use it within the BookProvider**

```tsx
const { changeFontSize, goToLocation, ... } = useBook();
```

##### Methods

| Method                   | Receives        | Description                                                                 |
| ------------------------ | --------------- | --------------------------------------------------------------------------- |
| `changeFontSize`         | `size`          | Change font size of all elements in the book                                |
| `changeFontFamily`       | `font`          | Change font family of all elements in the book                              |
| `goToLocation`           | `target`, `highlightColor` (optional)| Go to specific location in the book                    |
| `goToPage`               | `page`          | Go to specific page in the book                                             |
| `goPrevious`             |                 | Go to previous page in the book                                             |
| `goNext`                 |                 | Go to next page in the book                                                 |
| `search`                 | `query`         | Search for a specific text in the book                                      |
| `changeTheme`            | `theme`         | Change the current theme of the book                                        |
| `getCurrentLocation`     |                 | Returns the current location of the book                                    |

##### States

* `theme`: Returns the current theme of the book.
* `currentPage`: Returns the current page.
* `totalPages`: The total number of pages
* `progress`: The progress of the book.
* `isLoading`: Indicates if the book is loading.

#### Setting a default theme

If you want, you can set the default theme like this:

```tsx
import * as React from 'react';

import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, BookProvider } from 'epubjs-react-native';

// ...

const defaultTheme = {
  'fontSize': '100%',
  'body': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'background': '#fff',
    'font-size': '100%',
  },
  'p': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '100%',
  },
  'li': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'font-size': '100%',
  },
  'h1': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
  },
  'a': {
    'font-family': '"Helvetica Neue", Helvetica, Arial, sans-serif',
    'color': '#000 !important',
    'pointer-events': 'auto',
    'cursor': 'default',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <BookProvider defaultTheme={defaultTheme}>
        <Reader
          src={{ uri: "https://s3.amazonaws.com/moby-dick/OPS/package.opf" }}
          width={width}
          height={height}
        />
      </BookProvider>
    </SafeAreaView>
  );
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
