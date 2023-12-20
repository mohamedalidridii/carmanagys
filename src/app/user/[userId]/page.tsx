import AddClientOrder from "@/componenets/AddClientOrder"
import UserListing from "@/componenets/UserListing"
import { getPayloadClient } from "@/get-payload"
import { useUser } from "@/hooks/use-client"
import { notFound } from "next/navigation"
import { useRouter } from "next/router"


interface PageProps {
  params: {
    userId: string

  }
}

const Page = async ({ params }: PageProps) => {
  const { userId } = params
  const payload = await getPayloadClient()

  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      id: {
        equals: userId,
      },
    },
  })

  const [user] = users

  if (!user) return notFound()

  return (<>
    <UserListing/>
    <AddClientOrder user={user}/>
  </>
  )
}
export default Page
