export default `
<!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EPUB.js</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>

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
    </style>
  </head>

  <body oncopy='return false' oncut='return false'>
    <div id="viewer"></div>

    <script>
      var book;

      if (window.BOOK_BASE64) {
        book = ePub(window.BOOK_BASE64, { encoding: "base64" });
      }

      if (window.BOOK_URI) {
        book = ePub(window.BOOK_URI);
      }

      var rendition = book.renderTo("viewer", {
        width: "100%",
        height: "100%",
      });

      var displayed = rendition.display();

      displayed.then(function (renderer) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "displayed",
        }));
        rendition.themes.register({ theme: window.THEME });
        rendition.themes.select('theme');
      })
      .catch(function (reason) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "displayError",
          reason: reason
        }));
      });

      book.loaded.navigation.then(function (toc) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: "navigationLoaded",
          toc: toc,
        }));
      });
      if (window.LOCATIONS) {
        window.book.locations.load(window.LOCATIONS);
      } else {
        window.book.ready.then(() => {
          window.book.locations.generate(1650).then(() => {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: 'locations',
                current: window.book.locations.currentLocation(),
                locations: window.book.locations.save(),
              })
            );
          });
        });
      }
      rendition.on('started', () => {
        window.rendition.display(window.BOOK_LOCATION)

        rendition.themes.register({ theme: window.THEME });
        rendition.themes.select('theme');
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'started' })
        );
      });
      rendition.on('attached', () => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'attached' })
        );
      });
      rendition.on('rendered', (section, view) => {
        window.ReactNativeWebView.postMessage(
          JSON.stringify({ type: 'rendered', section: section, view: view })
        );
      });

      rendition.on('relocated', function (e) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'relocated',
          cfi: e.start.cfi,
          currentPage: e.start.location + 1,
          totalPages: window.book.locations.length(),
          progress: Math.round(e.start.percentage * 100),
        }));
      });
      rendition.on('orientationchange', function (orientation) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'orientation',
          orientation: orientation
        }));
      });
    </script>
  </body>
</html>
`;
