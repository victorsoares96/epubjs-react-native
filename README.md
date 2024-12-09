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
npx expo install @epubjs-react-native/expo-file-system react-native-fs react-native-webview react-native-gesture-handler
```

#### If you develop for iOS use this command for install CocoaPods deps (if you use an expo managed project you don't need this)

In your ios project folder run:

```sh
npx pod-install
```

For bare react-native projects, add the following permissions to `Info.plist`:

```sh
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
```

## Usage

Wrap your root component in ReaderProvider. If you have a vanilla React Native project, it's a good idea to add it in the component which is passed to AppRegistry.registerComponent. This will usually be in the index.js file. If you have an Expo project, you can do this inside the exported component in the App.js file.

```tsx
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { ReaderProvider } from '@epubjs-react-native/core';
import { name as appName } from './app.json';
import App from './src/App';

export default function Main() {
  return (
    <ReaderProvider>
      <App />
    </ReaderProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
```

The `<ReaderProvider>` component provides `<Reader>` manipulation methods for all components of the framework.
**Without this the `useReader` hook will not work.**

After the above step you can initialize the reader as follows:

```tsx
import * as React from 'react';

import { SafeAreaView } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
// import { useFileSystem } from '@epubjs-react-native/file-system'; // for Bare React Native project
// import { useFileSystem } from '@epubjs-react-native/expo-file-system'; // for Expo project

export default function App() {
  const { goToLocation } = useReader();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Reader
        src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
        fileSystem={useFileSystem}
      />
    </SafeAreaView>
  );
}
```

## Reader Params

| Param                        | Type          | Description                                                  |
| ---------------------------- | ------------- | ------------------------------------------------------------ |
| `src`                        | `string`      | Can be a `base64`, `epub`, `opf`. Required.                  |
| `width`                      | `number` `string`      | The width of the ePub Rendition. Optional.                   |
| `height`                     | `number` `string`      | The height of the ePub Rendition. Optional.                  |
| `fileSystem`                 | `function`    | A function that returns a `FileSystem` object. Required.     |
| `initialLocation`            | `ePubCfi`     | Can be an ePubCfi or chapter url. Optional.                  |
| `enableSwipe`                | `boolean`     | Enable swipe actions. Default is `true`.                     |
| `enableSelection`            | `boolean`     | Enable text selection feature on the book. Default is `true`.|
| `onSwipeLeft`                | `function`    | Called when swipe left gesture is detected. Optional.        |
| `onSwipeRight`               | `function`    | Called when swipe right gesture is detected. Optional.       |
| `renderLoadingFileComponent` | `JSX.Element` | Render when the book is loading. Optional.                   |
| `renderOpeningBookComponent` | `JSX.Element` | Appears when the book is been rendering. Optional.           |
| `onStarted`                  | `function`    | Called once the book loads is started. Optional.             |
| `onReady`                    | `function`    | Called once book has been displayed. Optional.               |
| `onDisplayError`             | `function`    | Called once book has not been displayed. Optional.           |
| `onRendered`                 | `function`    | Emit that a section has been rendered. Optional.             |
| `onChangeSection`            | `function`    | Called when section has been change. Optional.               |
| `onResized`                  | `function`    | Called when occurred a page change. Optional.                |
| `onLocationChange`           | `function`    | Called when occurred a page change. Optional.                |
| `onSearch`                   | `function`    | Called once when the book has been searched. Optional.       |
| `onLocationsReady`           | `function`    | Called once the locations has been generated. Optional.      |
| `onSelected`                 | `function`    | Called once a text selection has occurred. Optional.         |
| `onOrientationChange`        | `function`    | Called when screen orientation change is detected. Optional. |
| `onPress`                    | `function`    | Called when the book was pressed. Optional.                  |
| `onDoublePress`              | `function`    | Called when the book was double pressed. Optional.           |
| `onBeginning`                | `function`    | Called when the book is on the homepage. Optional.           |
| `onFinish`                   | `function`    | Called when the book is on the final page. Optional.         |
| `onLayout`                   | `function`    | Called when book layout is change. Optional.                 |
| `defaultTheme`               | `object`      | Theme object. Optional.                                      |
| `allowScriptedContent`       | `boolean`     | Allow run scripted content on sandbox. *Default is false on Android and true in iOS* |
| `allowPopups`                | `boolean`     | Epubjs is rendering the epub-content inside and iframe which defaults to sandbox="allow-same-origin", to enable opening links or running javascript in an epub, you will need to pass this param. |
| `onPressExternalLink`        | `function`    | Function that is invoked when external link is pressed. When used, the `allowPopups` property is automatically enabled |
| `menuItems`                  | `array`       | An array of objects which will be shown when selecting text. An empty array will suppress the menu.                    |
| `onAddAnnotation`            | `function`    | Function that is invoked when annotation is added in book.                                                             |
| `onChangeAnnotations`        | `function`    | Function that is invoked when annotations array is modified.                                                           |
| `onPressAnnotation`          | `function`    | Function that is invoked when annotation is pressed.                                                                   |
| `initialAnnotations`         | `array`       | Used for load book with annotations attached                                                                           |
| `onAddBookmark`              | `function`    |                                                              |
| `onRemoveBookmark`           | `function`    |                                                              |
| `onRemoveBookmarks`          | `function`    |                                                              |
| `onUpdateBookmark`           | `function`    |                                                              |
| `onChangeBookmarks`          | `function`    | Function that is invoked when bookmarks array is modified.                                                           |
| `initialBookmarks`           | `array`       | load bookmarks after render book                                                                           |
| `injectedJavascript`         | `string`      | Provide JavaScript that will be injected after the book loads.                                  |
| `getInjectionJavascriptFn`   | `function`    | Provides injectJavascript function, is same the webView function                                           |
| `onWebViewMessage`           | `function`    | A webview event listener, is same the webView onMessage                                                                           |
| `manager`                    | `default` `continuous`    |                                                                            |
| `flow`           | `auto` `paginated` `scrolled` `scrolled-doc` `scrolled-continuous`    |                                                                   |
| `snap`           | `boolean`    |                                                          |
| `spread`           | `auto` `none` `always`    |                                                                           |
| `fullsize`           | `boolean`    |                                                                           |
| `waitForLocationsReady`           |  `boolean`    | only render book after locations generated                                                                           |
| `keepScrollOffsetOnLocationChange` | `boolean` | Prevents scroll top when change location. Works with `scrolled-doc` flow.
| `charactersPerLocation`           | `number`    | Default is 1600                                                                          |

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
| `goPrevious`         | `PaginateOptions`        | Go to previous page in the book                                           |
| `goNext`             | `PaginateOptions`         | Go to next page in the book                                               |
| `search`             | `query`  | Search for a specific text in the book                                    |
| `clearSearchResults` | `void`   | Clear search results                                                      |
| `changeTheme`        | `theme`  | Change active theme                                                       |
| `getCurrentLocation` |          | Returns the current location of the book                                  |
| `getMeta`            |          | Returns an object containing the book's metadata.                         |
| `addAnnotation`      |    `annotation`      | Attach annotation in the book.                                            |
| `addAnnotationByTagId`      |    `annotation`      | Attach annotation in the book by dom element tag id.                                            |
| `updateAnnotation`   |     `annotation, data, styles`     | Update annotation data and style                                          |
| `updateAnnotationByTagId`   |     `annotation, data, styles`     | Update annotation data and style by dom element tag id                                          |
| `removeAnnotation`   |  `annotation`        | Detach annotation in the book.                                            |
| `removeAnnotationByTagId`   |  `annotation`        | Detach annotation in the book by dom element tag id.                                            |
| `removeAnnotationByCfi`  `cfi`          |          | Detach annotations in the book by provided cfi.                         |
| `removeAnnotations`  |    `type?: optional`      | Detach all annotations in the book. Can be detach by type                 |
| `removeSelection`    |          | Remove selection                 |
| `addBookmark`        |    `bookmark`      | Attach bookmark                                            |
| `updateBookmark`     |     `id, data`     | Update bookmark data                                          |
| `removeBookmark`     |  `bookmark`        | Remove bookmark                                            |
| `removeBookmarks`    |          | Remove all bookmarks                 |
| `injectJavascript`   |`function`| Provide JavaScript that will be injected after the book loads.                 |
| `changeFlow`   |`Flow`| Adjust the flow of the rendition to paginated or scrolled (scrolled-continuous vs scrolled-doc are handled by different view managers)                 |

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
- `meta`: A object containing the book's metadata.
- `annotations`: A array containing the book's annotations.
- `section`: A current section(chapter) of the book.
- `toc`: Also called table of contents, is an ordered list of links into the content.
- `landmarks`: Containing a array of major sections of the content
- `bookmarks`: A array containing the bookmarks.
- `isBookmarked`: Indicates if current location is bookmarked.

The `meta` object contains:

- **cover** *(string, ArrayBuffer, null or undefined)*: The book's cover image `e.g.data:image/jpeg;base64,/9j/4AAQSkZJ...`
- **author** *(string)*: The name of the book's creator/author `e.g. Herman Melville`
- **title** *(string)*: The book's title `e.g. Moby-Dick`
- **description** *(string)*: The book's description/summary.
- **language** *(string)* : The book's language `e.g. en-US`
- **publisher** *(string)*: The eBook's publisher `e.g. Harper & Brothers, Publishers`
- **rights** *(string)*: The book's rights `e.g. This work is shared with the public using the Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0) license.`

#### Examples

- [You can see the examples demo here](docs/EXAMPLES.md)

- [Examples running on Expo Project](example-expo/App.tsx)
- [Examples running on Bare React Native Project](example-bare/App.tsx)

Did you like this project? Consider [sponsoring](https://www.paypal.com/donate/?business=YNAUBS5LFN5KN&no_recurring=1&currency_code=USD) the development of this project to keep it alive! ❤️

## License

MIT
