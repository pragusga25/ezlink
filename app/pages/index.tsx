import { BlitzPage, useMutation } from "blitz"
import { Button, Container, Input, Spacer, Text, Tooltip } from "@nextui-org/react"
import createShortUrl from "app/url/mutations/createShortUrl"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CreateShortUrl } from "app/url/validations"
import { FormElement } from "@nextui-org/react/esm/input/input-props"

const Home: BlitzPage = () => {
  const [createUrlMutation, { isLoading, isSuccess }] = useMutation(createShortUrl)
  const [shortUrl, setShortUrl] = useState("")
  const {
    register,
    getValues,
    trigger,
    setValue,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof CreateShortUrl>>({
    resolver: zodResolver(CreateShortUrl),
    mode: "onChange",
  })

  const shorten = async () => {
    const errKeys = Object.keys(errors)[0]

    if (!(await trigger())) return toast.error(errors[errKeys as string]?.message)

    toast
      .promise(createUrlMutation(getValues()), {
        loading: "Creating short url...",
        success: "Short url created!",
        error: (err) => {
          let textMsg = ""
          if (err.message != "Short code already exists") {
            const errs = JSON.parse(err.message)
            textMsg = Array.isArray(errs) ? errs[0].message : errs
          } else {
            textMsg = "Short code already exists"
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
        {...register("url")}
      />
      <Spacer y={1} />
      <Input
        underlined
        width="20rem"
        color="warning"
        labelLeft="gwj.pw/"
        placeholder="Enter Your Short Code"
        {...register("code", {
          onChange: (e: ChangeEvent<FormElement>) => {
            const noSpaces = e.target.value.replace(/\s/g, "-")
            setValue("code", noSpaces)
          },
        })}
      />
      {!isValid && (
        <>
          <Spacer y={0.5} />
          <Text color="warning">{errors?.url?.message ?? errors?.code?.message}</Text>
        </>
      )}
      <Spacer y={1} />
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          bordered
          color="warning"
          loaderType="points"
          auto
          ghost
          loading={isLoading}
          onClick={shorten}
          disabled={!isValid}
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
