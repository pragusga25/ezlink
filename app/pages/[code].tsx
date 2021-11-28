import { BlitzPage, GetServerSideProps } from "blitz"
import db from "db"

const RedirectPage: BlitzPage = () => {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const code = context.query.code as string
  const data = await db.url.findUnique({ where: { code } })
  return {
    redirect: {
      destination: data?.url ?? "/",
      permanent: false,
    },
  }
}

export default RedirectPage
