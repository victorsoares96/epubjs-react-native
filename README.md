# epubjs-react-native

ePub.js Reader for React Native

## Installation

```sh
npm install epubjs-react-native
```

```sh
yarn add epubjs-react-native
```

##### If you develop for iOS use this command for install CocoaPods deps (if you use Expo you dont need this)

```sh
cd ios
```

```sh
npx pod install
```

## Usage

```tsx
import * as React from 'react';

import { View, SafeAreaView, useWindowDimensions, Text } from 'react-native';
import { Reader, BookProvider } from 'epubjs-react-native';

// ...

export default function App() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BookProvider>
        <Reader
          src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
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
| `src`                    | `string`        | The url of your ePub to render. Required.                                   |
| `width`                  | `number`        | The width of the ePub Rendition. Required.                                  |
| `height`                 | `number`        | The height of the ePub Rendition. Required.                                 |
| `initialLocation`        | `ePubCfi`       | Can be an ePubCfi or chapter url. Optional.                                 |
| `enableSwipe`            | `boolean`       | Enable swipe actions. Default is `true`.                                    |
| `onSwipeLeft`            | `function`      | Called when swipe left gesture is detected. Optional.                       |
| `onSwipeRight`           | `function`      | Called when swipe right gesture is detected. Optional.                      |
| `renderLoadingComponent` | `ReactNode`     | Render when the book is loading. Optional.                                 |
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

## Running Example

```bash
git clone https://github.com/victorsoares96/epubjs-react-native.git

yarn install
```

### Android

```bash
yarn example android
```

### iOS

```bash
yarn example ios
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
