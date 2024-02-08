
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"

interface PageProps {
  params: {
    userId: string
  }
}
const Page = async ({ params }: PageProps) => {
  const { userId } = params
  const payload = await getPayloadClient()
  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies)

  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1,
    where: {
      id: {
        equals: userId,
      },
    },
  })
  const [client] = users
  if (!client) return notFound()
  return <>
  {user ? (<section className="bg-white dark:bg-white">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mb-8 lg:mb-16">
            <h2 className="mb-4 text-xl sm:text-2xl tracking-tight font-bold text-gray-900 dark:text-gray-900">Profile: {client?.nom} {client?.prenom}</h2>
        </div> 
        <div className="grid gap-6 mb-6 lg:mb-16 grid-cols-2">
            {/* Information perso */}
            {/* points */}
            <div className="items-center bg-gray-10 rounded-lg shadow dark:bg-gray-50 dark:border-gray-700">
                    <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Mes Points</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.points} points</span>
                    </div>
            </div> 
            {/* Marque Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">
 
                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Marque de la Voiture</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.marque}</span>
                </div>
            </div> 
            {/* type Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Type de la voiture</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.type}</span>
                </div>
            </div> 
            { user.id==client.id ? (<div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">
                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>immatriculation</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.matricule}</span>
                </div>
            </div>): null }
            { user.id==client.id ? (<div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">
                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Carburant</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.carburant}</span>
                </div>
            </div> ): null }
            { user.id==client.id ? (<div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Kilometrage</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.kilometrage} km</span>
                </div>
            </div> ): null }
            { user.id==client.id ? (<div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Mes achats</p>
                    </h3>
                    <span className="text-l font-normal tracking-tight underline text-blue-500 dark:text-gray-800"><Link href={`/sell/collections/operations?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BuserId%5D%5Bequals%5D=${client.id}`}>Voir mes achats</Link></span>
                </div>
                </div>):null}
            {user?.role == "agent" || user?.role == "admin" || user?.role == "topadmin" ? (<Link href={{
                      pathname:"/productsoperations",
                      query: {
                        agentId: `${user.id}`,
                        agentPrenom: `${user.prenom}`,
                        agentName: `${user.nom}`,
                        clientId: `${client.id}`,
                        clientName: `${client.nom}`,
                        clientPrenom: `${client.prenom}`,
                        clientPoints: `${client.points}`
                      }
                    }} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 bg-blue-500 rounded-lg">Passer une operation</Link>) : null }
        </div> 
    </div>
  </section>): <p>you do not have access to this Section or you are not</p>}
  </>
}
export default Page