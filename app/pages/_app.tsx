import { AppProps, Script } from "blitz"
import { CssBaseline, Container, ThemeProvider } from "@nextui-org/react"
import { Toaster } from "react-hot-toast"

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider
      theme={{
        type: "dark",
      }}
    >
      <Container fluid style={{ minHeight: "100vh" }}>
        <CssBaseline />
        <Toaster position="top-center" reverseOrder={true} />
        {getLayout(<Component {...pageProps} />)}
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </Container>
    </ThemeProvider>
  )
}
