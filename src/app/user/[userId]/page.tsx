
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
        <div className="mx-auto max-w-screen-sm  mb-8 lg:mb-16">
            <h2 className="mb-4 text-3xl tracking-tight font-bold text-gray-900 dark:text-gray-900">Mon Profile</h2>
            {/* <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400"></p> */}
        </div> 
        <div className="grid gap-6 mb-6 lg:mb-16 grid-cols-2">
            {/* Information perso */}
            <div className="items-center bg-gray-10 rounded-lg shadow dark:bg-gray-50 dark:border-gray-700">
                    <div className='p-2'>    
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="9" r="3" stroke="gray" stroke-width="1.5"/>
                                <circle cx="12" cy="12" r="10" stroke="gray" stroke-width="1.5"/>
                                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                    </div>
                    <div className="p-2 flex flex-col gap-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                            <p>Nom & Prenom</p>
                        </h3>
                        <span className="text-l font-bold text-gray-500 dark:text-gray-800">{client?.nom} {client?.prenom}</span>
                    </div>

            {/* points */}

            <div className='px-2 pt-8'>    
                        
                    </div>
                    <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Mes Points</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.points} points</span>

                    </div>
                    

            </div> 
            {/* Marque Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">
                <div className='p-2'>    
                <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.776855 15.643C0.776855 13.9861 2.12 12.643 3.77686 12.643H20.2229C21.8798 12.643 23.2229 13.9862 23.2229 15.643V18.2828C23.2229 18.8351 22.7752 19.2828 22.2229 19.2828H1.77685C1.22457 19.2828 0.776855 18.8351 0.776855 18.2828V15.643Z" stroke="gray" stroke-width="1.5"/>
                    <path d="M4 16H6" stroke="gray" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 16H18" stroke="gray" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.5249 19.2828V20.7375C1.5249 21.5639 2.19486 22.2339 3.02131 22.2339V22.2339C3.84775 22.2339 4.51771 21.5639 4.51771 20.7375V19.2828" stroke="gray" stroke-width="1.5"/>
                    <path d="M19.4819 19.2828V20.7375C19.4819 21.5639 20.1519 22.2339 20.9783 22.2339V22.2339C21.8048 22.2339 22.4747 21.5639 22.4747 20.7375V19.2828" stroke="gray" stroke-width="1.5"/>
                    <path d="M3.02148 12.643L4.89199 7.84756" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M20.9785 12.643L19.108 7.84756" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M11.1179 1.75066C11.4946 1.04595 12.5049 1.04595 12.8817 1.75066L13.4377 2.79074C13.5945 3.08408 13.8869 3.28024 14.2178 3.31409L15.2563 3.42033C16.1474 3.51148 16.4784 4.63815 15.7783 5.19681L15.2243 5.63878C14.9236 5.87874 14.7872 6.26995 14.8735 6.64488L15.0502 7.41189C15.2385 8.2297 14.3965 8.90177 13.6408 8.5368L12.4347 7.9543C12.1599 7.82161 11.8396 7.82161 11.5649 7.9543L10.3588 8.5368C9.60306 8.90177 8.76103 8.2297 8.94937 7.41189L9.12602 6.64488C9.21236 6.26995 9.07595 5.87874 8.77521 5.63878L8.22128 5.19681C7.52111 4.63815 7.85211 3.51148 8.7432 3.42033L9.78173 3.31409C10.1126 3.28024 10.405 3.08408 10.5618 2.79074L11.1179 1.75066Z" stroke="gray" stroke-width="1.5"/>
                </svg>
                </div>       
                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Marque de la Voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.marque}</span>

                </div>
            </div> 
            {/* type Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">
                <div className='p-2'>    
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="gray" stroke-width="1.5"/>
                        <path d="M10 16H6" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M14 13H18" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M14 16H12.5" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M9.5 13H11.5" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M18 16H16.5" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                        <path d="M6 13H7" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Type de la voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.type}</span>

                </div>
                
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Matricule de la Voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.matricule}</span>

                </div>
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Carburant</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.carburant}</span>
                </div>
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Kilometrage</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.kilometrage} km</span>

                </div>
                
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-white dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-800">
                        <p>Mes Operation</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800"><Link href={`/sell/collections/operations?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BuserId%5D%5Bequals%5D=${client.id}`}>Mes Operations</Link></span>

                </div>
                
            </div> 
            <Link href={{
                      pathname:"/productsoperations",
                      query: {
                        agentId: `${user.id}`,
                        clientId: `${client.id}`,
                        clientName: `${client.nom}`,
                        clientPrenom: `${client.prenom}`,
                        clientPoints: `${client.points}`

                      }
                    }} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 bg-blue-500 rounded-lg">Pass</Link>

        </div> 
    </div>
  </section>): <p>you do not have access to this Section <Link href="/signIn" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 bg-blue-500 rounded-lg">Sign In first</Link></p>}
  </>
}
export default Page
