
import { getPayloadClient } from "../../../get-payload"
import { getServerSideUser } from "../../../lib/payload-utils"
import Link from "next/link"
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import QrCodeAuto from "@/componenets/QrCodeAuto"
import PrintQrcode from "@/componenets/PrintQrcode"

interface PageProps {
    params: {
        printId: string
    }
}
const Page = async ({ params }: PageProps) => {
    const { printId } = params
    const payload = await getPayloadClient()
    const nextCookies = cookies()
    const { user } = await getServerSideUser(nextCookies)

    const { docs: users } = await payload.find({
        collection: 'users',
        limit: 1,
        where: {
            id: {
                equals: printId,
            },
        },
    })
    const [client] = users
    if (!client) return (<>
        le client n&apos;existe pas
    </>)
    return <>
        {user?.role === "admin" ? (<section className="bg-white dark:bg-white">
            {client ? (
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                    <div className="mb-8 lg:mb-16">

                    </div>
                    <div className="grid gap-6 mb-6 lg:mb-16 grid-cols-1">
                        {/* Information perso */}
                        <h2 className="mb-4 text-xl sm:text-2xl tracking-tight font-bold text-gray-900 dark:text-gray-900">Profile: {client?.nom} {client?.prenom}</h2>



                        <div className="p-2 flex flex-col gap-5">
                            <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                                <p>immatriculation</p>
                            </h3>
                            <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{client?.matricule}</span>
                        </div>
                        <div className="p-2 flex flex-col gap-5">
                            <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                                <p>Mon Qrcode</p>
                            </h3>
                            <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
                                <QrCodeAuto user={client} />
                            </h3>

                        </div>
                        <PrintQrcode />
                    </div>
                </div>) : <p>le client n&apos;existe pas</p>}
        </section>)
            : <p>you do not have access to this Section</p>}
    </>
}
export default Page
