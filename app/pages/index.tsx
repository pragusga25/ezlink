import { BlitzPage, useMutation } from "blitz"
import { Button, Container, Input, Spacer, Text } from "@nextui-org/react"
import createShortUrl from "app/url/mutations/createShortUrl"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useState } from "react"

const Home: BlitzPage = () => {
  const [createUrlMutation, { isLoading, isSuccess }] = useMutation(createShortUrl)
  const [shortUrl, setShortUrl] = useState("")
  const { register, getValues } = useForm<{
    url: string
    code: string
  }>()

  const shorten = async () => {
    toast
      .promise(createUrlMutation(getValues()), {
        loading: "Creating short url...",
        success: "Short url created!",
        error: (err) => {
          let textMsg = ""
          if (err.message != "Short URL already exists") {
            const errs = JSON.parse(err.message)
            textMsg = Array.isArray(errs) ? errs[0].message : errs
          } else {
            textMsg = "Short URL already exists"
          }
          return textMsg
        },
      })
      .then((d) => {
        setShortUrl(`gwj.pw/${d.code}`)
      })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl)
    toast.success("Copied to clipboard!")
  }
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Text h1 size={48} color="warning" style={{ fontFamily: "'Inter', sans-serif" }}>
        GWJ.pw
      </Text>
      <Spacer y={2} />
      <Input
        underlined
        width="20rem"
        labelPlaceholder="Enter Your Long URL"
        type="url"
        color="warning"
        required
        {...register("url")}
      />
      <Spacer y={1} />
      <Input
        underlined
        width="20rem"
        color="warning"
        labelLeft="gwj.pw/"
        placeholder="Enter Your Short Code"
        required
        {...register("code")}
      />
      <Spacer y={1} />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          color="warning"
          loaderType="points"
          auto
          ghost
          loading={isLoading}
          onClick={shorten}
        >
          Shorten
        </Button>
        {!isLoading && isSuccess && (
          <>
            <Spacer x={1} />
            <Button bordered color="gradient" auto onClick={copyToClipboard}>
              Copy
            </Button>
          </>
        )}
      </Container>
    </Container>
  )
}

export default Home
