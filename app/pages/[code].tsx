import { BlitzPage, GetServerSideProps } from "blitz"
import db from "db"

const RedirectPage: BlitzPage = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string
  const data = await db.url.findUnique({ where: { code } })
  let redirectUrl = "/"
  if (data) {
    if (!data.url.startsWith("http://") && !data.url.startsWith("https://")) {
      redirectUrl = "https://" + data.url
    } else {
      redirectUrl = data.url
    }
  }

  return {
    redirect: {
      destination: redirectUrl,
      permanent: false,
    },
  }
}

export default RedirectPage
