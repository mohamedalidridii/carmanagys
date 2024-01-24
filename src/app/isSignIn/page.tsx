import Link from "next/link"
import { getPayloadClient } from "@/get-payload"
import { cookies } from "next/headers"
import { getServerSideUser } from "@/lib/payload-utils"
import QrCodeButton from "@/componenets/QrCodeButton"

const isSignIn = async () =>{
    const nextCookies = cookies()

    const {user} = await getServerSideUser(nextCookies)
    return<>
    {user?.role=="client" ? (<section className="bg-white dark:bg-white">
        <div className="py-8 px-4 mx-auto my-12 max-w-screen-xl flex flex-col items-center justify-center text-center lg:py-16 lg:px-12 ">
            <h1 className="mb-9 text-xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-gray-900">Vous êtes connecté avec succès</h1>
            <QrCodeButton user={user}/>
            
        </div>
    </section>): (<section className="bg-white dark:bg-white">
        <div className="py-8 px-4 mx-auto my-12 max-w-screen-xl flex flex-col items-center justify-center text-center lg:py-16 lg:px-12 ">
            <h1 className="mb-9 text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-gray-900">Vous êtes connecté avec succès</h1>
            <p className="text-lg font-normal text-gray-900 sm:px-20 px-20 dark:text-gray-900">Cliquez sur <p className="text-lg font-bold text-gray-900 dark:text-gray-900">mon compte</p> ou</p>
            <div>
                <svg viewBox="0 0 100 80" width="20" height="20">
                    <rect width="100" height="20" rx="8"></rect>
                    <rect y="30" width="100" height="20" rx="8"></rect>
                    <rect y="60" width="100" height="20" rx="8"></rect>
                </svg>
            </div>
            <p>en haut de la page pour poursuivre.</p>
        </div>
    </section>)}
</>
}
export default isSignIn