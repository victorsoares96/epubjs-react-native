import * as webViewJavaScriptFunctions from './utils/webViewInjectFunctions';

export default `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EPUB.js</title>
    <script id="jszip"></script>
    <script id="epubjs"></script>

    <style type="text/css">
      body {
        margin: 0;
      }

      #viewer {
        height: 100vh;
        width: 100vw;
        overflow: hidden !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      [ref="epubjs-mk-balloon"] {
        background: url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHg9JzBweCcgeT0nMHB4JyB2aWV3Qm94PScwIDAgNzUgNzUnPjxnIGZpbGw9JyNCREJEQkQnIGlkPSdidWJibGUnPjxwYXRoIGNsYXNzPSdzdDAnIGQ9J00zNy41LDkuNEMxOS42LDkuNCw1LDIwLjUsNSwzNC4zYzAsNS45LDIuNywxMS4zLDcuMSwxNS42TDkuNiw2NS42bDE5LTcuM2MyLjgsMC42LDUuOCwwLjksOC45LDAuOSBDNTUuNSw1OS4yLDcwLDQ4LjEsNzAsMzQuM0M3MCwyMC41LDU1LjQsOS40LDM3LjUsOS40eicvPjwvZz48L3N2Zz4=") no-repeat;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 0;
      }

      [ref="epubjs-mk-heart"] {
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACOUlEQVR4nLWUTWgTURDH14Oe9JiPNqFNujvvzdsm3bdvPxKMFUEPag/iwdaD3j1JDymlCMXiqUeRHvWgFRQUxKPirUU8eFARvCnUj7QXP7DiJtk8easJjRjzIQ784bEz82Pe7MzTtP9tpmnu8UbNpOM4uzvFKF+3GM1BHHIAbwjA7xyY5AaGPuCarZtHmzGcsGM+YevKp2JUrAN4XeW2wSxKMy6wrSkKtbsiJZ96SfnAGZbl8bG6DawhdLwqAK9xYI25XLaufCrmjkjJKQpVF3DLzrDRFtAHXJ9hUNsoxOTH8hn5afGcrBRjkR66w3I/0GoJaPWRO9T63tRGISanmVHzgK1FMBvGmSr/iZeUn5fL8svlRbl5aKQt6bGXjPQ7bKefA5MOIahZOpsuAQmUY3t1pWNSN5WABtwwT2kW4Mki0OqgoMov+YA1rrMTmk3IhCr3hd/5St303EtEV54Yw5xq4y4PcHOFt/etH12xRqQHWFGsn/MFuHAQaPCmGO8b9roQl5OEBpaB862xoZTuc4F+uJDLhv0CF/LZ0DPoe9M097YNNwd2hAMLb9rpnmGrdlr1LrQJO/zH9bMMnBWA4X0n1RV2T6TU6oUc2Pm/vQ0aN/CSAKzfFp0rvWWnI5gNbEnrxWwD59UOL+UzjXc7ftTbYlxezGca0X4Dm+sJ1jQO7LgA/Hoa9eCln5Cv/IQ8i3ogAL+pZdAGMYcQdAGfHSAkmCQkUOc8pXQgWNPUgysAl5XU+Z9gg9gPaBjV+CGbZVoAAAAASUVORK5CYII=") no-repeat;
        width: 20px;
        height: 20px;
        cursor: pointer;
        margin-left: 0;
      }
    </style>
  </head>

  <body oncopy='return false' oncut='return false'>
    <div id="viewer"></div>

    <script>
      let book;
      let rendition;

      const type = window.type;
      const file = window.book;
      const theme = window.theme;
      const initialLocations = window.locations;
      const enableSelection = window.enable_selection;

      if (!file) {
        alert('Failed load book');
      }

      if (type === 'epub' || type === 'opf' || type === 'binary') {
        book = ePub(file);
      } else if (type === 'base64') {
        book = ePub(file, { encoding: "base64" });
      } else {
        alert('Missing file type');
      }

      rendition = book.renderTo("viewer", {
        width: "100%",
        height: "100%",
        manager: "default",
        flow: "auto",
        snap: undefined,
        spread: undefined,
        fullsize: undefined,
        allowPopups: allowPopups,
        allowScriptedContent: allowScriptedContent
      });
     const reactNativeWebview = window.ReactNativeWebView !== undefined && window.ReactNativeWebView!== null ? window.ReactNativeWebView: window;
      reactNativeWebview.postMessage(JSON.stringify({ type: "onStarted" }));

      function flatten(chapters) {
        return [].concat.apply([], chapters.map((chapter) => [].concat.apply([chapter], flatten(chapter.subitems))));
      }

      function getCfiFromHref(book, href) {
        const [_, id] = href.split('#')
        let section = book.spine.get(href.split('/')[1]) || book.spine.get(href) || book.spine.get(href.split('/').slice(1).join('/'))

        const el = (id ? section.document.getElementById(id) : section.document.body)
        return section.cfiFromElement(el)
      }

      function getChapter(location) {
          const locationHref = location.start.href

          let match = flatten(book.navigation.toc)
              .filter((chapter) => {
                  return book.canonical(chapter.href).includes(locationHref)
              }, null)
              .reduce((result, chapter) => {
                  const locationAfterChapter = ePub.CFI.prototype.compare(location.start.cfi, getCfiFromHref(book, chapter.href)) > 0
                  return locationAfterChapter ? chapter : result
              }, null);

          return match;
      };

      const makeRangeCfi = (a, b) => {
        const CFI = new ePub.CFI()
        const start = CFI.parse(a), end = CFI.parse(b)
        const cfi = {
            range: true,
            base: start.base,
            path: {
                steps: [],
                terminal: null
            },
            start: start.path,
            end: end.path
        }
        const len = cfi.start.steps.length
        for (let i = 0; i < len; i++) {
          if (CFI.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
              if (i == len - 1) {
                  // Last step is equal, check terminals
                  if (cfi.start.terminal === cfi.end.terminal) {
                      // CFI's are equal
                      cfi.path.steps.push(cfi.start.steps[i])
                      // Not a range
                      cfi.range = false
                  }
              } else cfi.path.steps.push(cfi.start.steps[i])
          } else break
        }
        cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length)
        cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length)

        return 'epubcfi(' + CFI.segmentString(cfi.base)
            + '!' + CFI.segmentString(cfi.path)
            + ',' + CFI.segmentString(cfi.start)
            + ',' + CFI.segmentString(cfi.end)
            + ')'
      }

      if (!enableSelection) {
        rendition.themes.default({
          'body': {
            '-webkit-touch-callout': 'none', /* iOS Safari */
            '-webkit-user-select': 'none', /* Safari */
            '-khtml-user-select': 'none', /* Konqueror HTML */
            '-moz-user-select': 'none', /* Firefox */
            '-ms-user-select': 'none', /* Internet Explorer/Edge */
            'user-select': 'none'
          }
        });
      }

      book.ready
        .then(function () {
          if (initialLocations) {
            return book.locations.load(initialLocations);
          }

          book.locations.generate(1600).then(function () {
            reactNativeWebview.postMessage(JSON.stringify({
              type: "onLocationsReady",
              epubKey: book.key(),
              locations: book.locations.save(),
              totalLocations: book.locations.total,
              currentLocation: rendition.currentLocation(),
              progress: book.locations.percentageFromCfi(rendition.currentLocation().start.cfi),
            }));
          });
        })
        .then(function () {
          var displayed = rendition.display();

          displayed.then(function () {
            var currentLocation = rendition.currentLocation();

            reactNativeWebview.postMessage(JSON.stringify({
              type: "onReady",
              totalLocations: book.locations.total,
              currentLocation: currentLocation,
              progress: book.locations.percentageFromCfi(currentLocation.start.cfi),
            }));
          });

          book
          .coverUrl()
          .then(async (url) => {
            var reader = new FileReader();
            reader.onload = (res) => {
              reactNativeWebview.postMessage(
                JSON.stringify({
                  type: "meta",
                  metadata: {
                    cover: reader.result,
                    author: book.package.metadata.creator,
                    title: book.package.metadata.title,
                    description: book.package.metadata.description,
                    language: book.package.metadata.language,
                    publisher: book.package.metadata.publisher,
                    rights: book.package.metadata.rights,
                  },
                })
              );
            };
            reader.readAsDataURL(await fetch(url).then((res) => res.blob()));
          })
          .catch(() => {
            reactNativeWebview.postMessage(
              JSON.stringify({
                type: "meta",
                metadata: {
                  cover: undefined,
                  author: book.package.metadata.creator,
                  title: book.package.metadata.title,
                  description: book.package.metadata.description,
                  language: book.package.metadata.language,
                  publisher: book.package.metadata.publisher,
                  rights: book.package.metadata.rights,
                },
              })
            );
          });

          book.loaded.navigation.then(function (item) {
            reactNativeWebview.postMessage(JSON.stringify({
              type: 'onNavigationLoaded',
              toc: item.toc,
              landmarks: item.landmarks
            }));
          });
        })
        .catch(function (err) {
          reactNativeWebview.postMessage(JSON.stringify({
          type: "onDisplayError",
          reason: reason
        }));
      });

      rendition.on('started', () => {
        rendition.themes.register({ theme: theme });
        rendition.themes.select('theme');
      });

      rendition.on("relocated", function (location) {
        var percent = book.locations.percentageFromCfi(location.start.cfi);
        var percentage = Math.floor(percent * 100);
        var chapter = getChapter(location);

        reactNativeWebview.postMessage(JSON.stringify({
          type: "onLocationChange",
          totalLocations: book.locations.total,
          currentLocation: location,
          progress: percentage,
          currentSection: chapter,
        }));

        if (location.atStart) {
          reactNativeWebview.postMessage(JSON.stringify({
            type: "onBeginning",
          }));
        }

        if (location.atEnd) {
          reactNativeWebview.postMessage(JSON.stringify({
            type: "onFinish",
          }));
        }
      });

      rendition.on("orientationchange", function (orientation) {
        reactNativeWebview.postMessage(JSON.stringify({
          type: 'onOrientationChange',
          orientation: orientation
        }));
      });

      rendition.on("rendered", function (section) {
        reactNativeWebview.postMessage(JSON.stringify({
          type: 'onRendered',
          section: section,
          currentSection: book.navigation.get(section.href),
        }));
      });

      rendition.on("layout", function (layout) {
        reactNativeWebview.postMessage(JSON.stringify({
          type: 'onLayout',
          layout: layout,
        }));
      });

      rendition.on("selected", function (cfiRange, contents) {
        book.getRange(cfiRange).then(function (range) {
          if (range) {
            reactNativeWebview.postMessage(JSON.stringify({
              type: 'onSelected',
              cfiRange: cfiRange,
              text: range.toString(),
            }));
          }
        });
      });

      rendition.on("markClicked", function (cfiRange, contents) {
        const annotations = Object.values(rendition.annotations._annotations);
        const annotation = annotations.find(item => item.cfiRange === cfiRange);

        if (annotation) {
          reactNativeWebview.postMessage(JSON.stringify({
            type: 'onPressAnnotation',
            annotation: ${webViewJavaScriptFunctions.mapObjectToAnnotation('annotation')}
          }));
        }
      });

      rendition.on("resized", function (layout) {
        reactNativeWebview.postMessage(JSON.stringify({
          type: 'onResized',
          layout: layout,
        }));
      });
    </script>
  </body>
</html>
`;
