import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from "blitz"
import { CssBaseline } from "@nextui-org/react"
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = CssBaseline.flush()

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styles}
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <meta name="description" content="A simple and free url shortener" />
          <meta
            name="keywords"
            content="shortener, short, url, short url, free url shortener, simple url shortener, url shortener"
          />
          <meta name="author" content="Pragusga" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta property="og:title" content="GWJ.PW | URL Shortener" />
          <meta property="og:description" content="A simple and free url shortener" />
          <meta property="og:url" content="https://www.gwj.pw" />
          <meta property="og:site_name" content="GWJ.PW" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/73622464/143823272-1d5fa413-511a-4c96-89ab-f315ced37ff0.jpg"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://www.gwj.pw" />
          <meta name="twitter:creator" content="@pragusga" />
          <meta name="twitter:title" content="GWJ.PW | URL Shortener" />
          <meta name="twitter:description" content="A simple and free url shortener" />
          <meta
            name="twitter:image"
            content="https://user-images.githubusercontent.com/73622464/143823272-1d5fa413-511a-4c96-89ab-f315ced37ff0.jpg"
          />

          <link rel="canonical" href="https://www.gwj.pw" />
          <link href="https://fonts.googleapis.com/css2?family=Inter" rel="stylesheet" />
          <title>GWJ.PW | URL Shortener</title>
        </DocumentHead>
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
