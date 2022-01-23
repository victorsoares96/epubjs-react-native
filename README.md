# epubjs-react-native

ePub.js Reader for React Native

## Installation

```sh
npm install epubjs-react-native
```

#### Installing dependencies into a bare React Native project

In your project, run:

```sh
npm install react-native-webview react-native-gesture-handler
```

#### If you use Expo

In your project, run:

```sh
expo install react-native-webview react-native-gesture-handler
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
import { Reader, ReaderProvider } from 'epubjs-react-native';

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src={{ uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf' }}
          width={width}
          height={height}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
```

## Reader Params

| Param                    | Type        | Description                                                         |
| ------------------------ | ----------- | ------------------------------------------------------------------- |
| `src`                    | `string`    | The source of your ePub. Can be a base64 string or a URL. Required. |
| `width`                  | `number`    | The width of the ePub Rendition. Required.                          |
| `height`                 | `number`    | The height of the ePub Rendition. Required.                         |
| `initialLocation`        | `ePubCfi`   | Can be an ePubCfi or chapter url. Optional.                         |
| `enableSwipe`            | `boolean`   | Enable swipe actions. Default is `true`.                            |
| `onSwipeLeft`            | `function`  | Called when swipe left gesture is detected. Optional.               |
| `onSwipeRight`           | `function`  | Called when swipe right gesture is detected. Optional.              |
| `renderLoadingComponent` | `ReactNode` | Render when the book is loading. Optional.                          |
| `onStarted`              | `function`  | Called once the book loads is started. Optional.                    |
| `onReady`                | `function`  | Called once book has been displayed. Optional.                      |
| `onDisplayError`         | `function`  | Called once book has not been displayed. Optional.                  |
| `onRendered`             | `function`  | Emit that a section has been rendered. Optional.                    |
| `onResized`              | `function`  | Called when occurred a page change. Optional.                       |
| `onLocationChange`       | `function`  | Called when occurred a page change. Optional.                       |
| `onSearch`               | `function`  | Called once when the book has been searched. Optional.              |
| `onLocationsReady`       | `function`  | Called once the locations has been generated. Optional.             |
| `onSelected`             | `function`  | Called once a text selection has occurred. Optional.                |
| `onMarkPressed`          | `function`  | Called when marked text is pressed. Optional.                       |
| `onOrientationChange`    | `function`  | Called when screen orientation change is detected. Optional.        |
| `onPress`                | `function`  | Called when the book was pressed. Optional.                         |
| `onDoublePress`          | `function`  | Called when the book was double pressed. Optional.                  |
| `onBeginning`            | `function`  | Called when the book is on the homepage. Optional.                  |
| `onFinish`               | `function`  | Called when the book is on the final page. Optional.                |
| `onLayout`               | `function`  | Called when book layout is change. Optional.                        |
| `defaultTheme`           | `object`    | Theme object. Optional.                                             |

## Hooks

#### useReader

`useReader()` is a customized hook that will return all Book states and the methods that will help you. **Make sure you use it within the ReaderProvider**

```tsx
const { changeFontSize, goToLocation, ... } = useReader();
```

##### Methods

| Method               | Receives | Description                                                               |
| -------------------- | -------- | ------------------------------------------------------------------------- |
| `changeFontSize`     | `size`   | Change font size of all elements in the book. Can be a px, pt or percent. |
| `changeFontFamily`   | `font`   | Change font family of all elements in the book                            |
| `goToLocation`       | `cfi`    | Go to specific location in the book                                       |
| `getLocations`       |          | Get the total locations of the book                                       |
| `goPrevious`         |          | Go to previous page in the book                                           |
| `goNext`             |          | Go to next page in the book                                               |
| `search`             | `query`  | Search for a specific text in the book                                    |
| `changeTheme`        | `theme`  | Change active theme                                                       |
| `getCurrentLocation` |          | Returns the current location of the book                                  |
| `addMark`            |          | Add mark a specific cfi in the book                                       |
| `removeMark`         |          | Remove mark a specific cfi in the book                                    |

##### States

- `theme`: A object containing theme.
- `key`: Works like a unique id for book.
- `atStart`: Indicates if you are at the beginning of the book.
- `atEnd`: Indicates if you are at the end of the book.
- `currentLocation`: The current location of the book.
- `totalLocations`: The total number of locations.
- `progress`: The progress of the book.
- `isLoading`: Indicates if the book is loading.
- `searchResults`: Search results.

#### Setting a default theme

If you want, you can register a custom theme like this:

```tsx
import * as React from 'react';

import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, BookProvider } from 'epubjs-react-native';

// ...

const darkTheme = {
  'body': {
    background: '#333',
  },
  'span': {
    color: '#fff !important',
  },
  'p': {
    color: '#fff !important',
  },
  'li': {
    color: '#fff !important',
  },
  'h1': {
    color: '#fff !important',
  },
  'a': {
    'color': '#fff !important',
    'pointer-events': 'auto',
    'cursor': 'pointer',
  },
  '::selection': {
    background: 'lightskyblue',
  },
};

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <BookProvider>
        <Reader
          src={{ uri: 'https://s3.amazonaws.com/moby-dick/OPS/package.opf' }}
          width={width}
          height={height}
          defaultTheme={darkTheme}
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
