# epubjs-react-native

A digital book reader in .opf .epub format for react native using epub.js library inside a webview.

## Installation

```sh
npm install @epubjs-react-native/core
```

```sh
yarn add @epubjs-react-native/core
```

follow these steps below based on the type of project you want to apply this library:

#### Bare Installation

```sh
npm install @epubjs-react-native/file-system react-native-fs react-native-webview react-native-gesture-handler
```

```sh
yarn add @epubjs-react-native/file-system react-native-fs react-native-webview react-native-gesture-handler
```

#### Expo Installation

```sh
expo install @epubjs-react-native/expo-file-system react-native-fs react-native-webview react-native-gesture-handler
```

#### If you develop for iOS use this command for install CocoaPods deps (if you use an expo managed project you don't need this)

In your ios project folder run:

```sh
npx pod install
```

## Usage

```tsx
import * as React from 'react';

import { SafeAreaView, useWindowDimensions } from 'react-native';
import { Reader, ReaderProvider } from '@epubjs-react-native/core';
// import { useFileSystem } from '@epubjs-react-native/file-system'; // for Bare React Native project
// import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView>
      <ReaderProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
          width={width}
          height={height}
          fileSystem={useFileSystem}
        />
      </ReaderProvider>
    </SafeAreaView>
  );
}
```

## Reader Params

| Param                        | Type          | Description                                                  |
| ---------------------------- | ------------- | ------------------------------------------------------------ |
| `src`                        | `string`      | Can be a `base64`, `epub`, `opf`. Required.                  |
| `width`                      | `number`      | The width of the ePub Rendition. Required.                   |
| `height`                     | `number`      | The height of the ePub Rendition. Required.                  |
| `fileSystem`                 | `function`    | A function that returns a `FileSystem` object. Required.     |
| `initialLocation`            | `ePubCfi`     | Can be an ePubCfi or chapter url. Optional.                  |
| `enableSwipe`                | `boolean`     | Enable swipe actions. Default is `true`.                     |
| `onSwipeLeft`                | `function`    | Called when swipe left gesture is detected. Optional.        |
| `onSwipeRight`               | `function`    | Called when swipe right gesture is detected. Optional.       |
| `renderLoadingFileComponent` | `JSX.Element` | Render when the book is loading. Optional.                   |
| `renderOpeningBookComponent` | `JSX.Element` | Appears when the book is been rendering. Optional.           |
| `onStarted`                  | `function`    | Called once the book loads is started. Optional.             |
| `onReady`                    | `function`    | Called once book has been displayed. Optional.               |
| `onDisplayError`             | `function`    | Called once book has not been displayed. Optional.           |
| `onRendered`                 | `function`    | Emit that a section has been rendered. Optional.             |
| `onResized`                  | `function`    | Called when occurred a page change. Optional.                |
| `onLocationChange`           | `function`    | Called when occurred a page change. Optional.                |
| `onSearch`                   | `function`    | Called once when the book has been searched. Optional.       |
| `onLocationsReady`           | `function`    | Called once the locations has been generated. Optional.      |
| `onSelected`                 | `function`    | Called once a text selection has occurred. Optional.         |
| `onMarkPressed`              | `function`    | Called when marked text is pressed. Optional.                |
| `onOrientationChange`        | `function`    | Called when screen orientation change is detected. Optional. |
| `onPress`                    | `function`    | Called when the book was pressed. Optional.                  |
| `onDoublePress`              | `function`    | Called when the book was double pressed. Optional.           |
| `onBeginning`                | `function`    | Called when the book is on the homepage. Optional.           |
| `onFinish`                   | `function`    | Called when the book is on the final page. Optional.         |
| `onLayout`                   | `function`    | Called when book layout is change. Optional.                 |
| `defaultTheme`               | `object`      | Theme object. Optional.                                      |

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

#### Examples

You can see the examples in these repositories:

- [Examples running on Expo Project](example-expo/src/App.tsx)
- [Examples running on Bare React Native Project](example-bare/src/App.tsx)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Did you like this project? Consider sponsoring the development of this project to keep it alive! ❤️

## License

MIT
