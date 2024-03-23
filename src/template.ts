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
        allowPopups: allowPopups,
        allowScriptedContent: allowScriptedContent
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: "onStarted" }));

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
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: "onLocationsReady",
              epubKey: book.key(),
              locations: book.locations.save(),
            }));
          });
        })
        .then(function () {
          var displayed = rendition.display();

          displayed.then(function () {
            var currentLocation = rendition.currentLocation();

            window.ReactNativeWebView.postMessage(JSON.stringify({
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
              window.ReactNativeWebView.postMessage(
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
            window.ReactNativeWebView.postMessage(
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

          book.loaded.navigation.then(function (toc) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'onNavigationLoaded',
              toc: toc,
            }));
          });
        })
        .catch(function (err) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
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

        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "onLocationChange",
          totalLocations: book.locations.total,
          currentLocation: location,
          progress: percentage,
        }));

        if (location.atStart) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onBeginning",
          }));
        }

        if (location.atEnd) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: "onFinish",
          }));
        }
      });

      rendition.on("orientationchange", function (orientation) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onOrientationChange',
          orientation: orientation
        }));
      });

      rendition.on("rendered", function (section) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onRendered',
          section: section,
          currentSection: book.navigation.get(section.href),
        }));
      });

      rendition.on("layout", function (layout) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onLayout',
          layout: layout,
        }));
      });

      rendition.on("selected", function (cfiRange, contents) {
        book.getRange(cfiRange).then(function (range) {
          if (range) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
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
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'onPressAnnotation',
            annotation: {
              type: annotation.type,
              data: annotation.data,
              cfiRange: annotation.cfiRange,
              sectionIndex: annotation.sectionIndex,
              text: annotation.mark.range.toString(),
              iconClass: annotation.data?.iconClass,
              styles: {
                color: annotation.mark.attributes?.fill || annotation.mark.attributes?.stroke,
                opacity: Number(annotation.mark.attributes?.['fill-opacity'] || annotation.mark.attributes?.['stroke-opacity']),
                thickness: Number(annotation.mark.attributes?.['stroke-width']),
              }
            }
          }));
        }
      });

      rendition.on("resized", function (layout) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'onResized',
          layout: layout,
        }));
      });
    </script>
  </body>
</html>
`;
