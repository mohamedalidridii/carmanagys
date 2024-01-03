
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
  {user ? (<section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Tableau de bord</h2>
            {/* <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400"></p> */}
        </div> 
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {/* Information perso */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
                    <div className='p-2'>    
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="9" r="3" stroke="gray" stroke-width="1.5"/>
                                <circle cx="12" cy="12" r="10" stroke="gray" stroke-width="1.5"/>
                                <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="gray" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                    </div>
                    <div className="p-2 flex flex-col gap-5">
                        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <p>Nom & Prenom</p>
                        </h3>
                        <span className="text-l font-bold text-gray-500 dark:text-gray-800">{client?.nom} {client?.prenom}</span>
                        

                    </div>
            </div> 
            {/* points */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <div className='p-2 '>    
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6187 3.77783C14.7918 2.39036 15.8784 1.69663 16.7137 2.12656C17.5491 2.5565 17.58 3.82537 17.6418 6.36312L17.6578 7.01967C17.6753 7.74082 17.6841 8.10139 17.8327 8.4128C17.9813 8.7242 18.2529 8.95119 18.7961 9.40516L19.2906 9.81846C21.202 11.416 22.1577 12.2148 21.9787 13.1603C21.7997 14.1059 20.6046 14.572 18.2142 15.5043L17.5958 15.7454C16.9165 16.0104 16.5769 16.1428 16.3222 16.3918C16.0675 16.6409 15.9266 16.9783 15.6448 17.6531L15.3882 18.2675C14.3964 20.6423 13.9005 21.8297 12.9545 21.9842C12.0085 22.1386 11.2389 21.1578 9.69982 19.1963L9.30163 18.6888C8.86425 18.1314 8.64557 17.8526 8.33956 17.6952C8.03356 17.5377 7.67488 17.5192 6.95753 17.4823L6.30443 17.4487C3.78002 17.3189 2.51782 17.254 2.11218 16.4039C1.70653 15.5538 2.42609 14.4815 3.86521 12.3369L4.23753 11.7821C4.64648 11.1727 4.85096 10.868 4.91653 10.5216C4.9821 10.1752 4.90135 9.82639 4.73983 9.12875L4.59279 8.4936C4.02442 6.03855 3.74024 4.81103 4.43551 4.1312C5.13079 3.45136 6.34506 3.76944 8.77361 4.4056L9.40191 4.57019C10.092 4.75097 10.4371 4.84135 10.7836 4.78478C11.1301 4.7282 11.4389 4.53106 12.0565 4.13679L12.6187 3.77783Z" stroke="gray" stroke-width="1.5"/>
                            <path d="M19.5303 18.4697C19.2374 18.1768 18.7626 18.1768 18.4697 18.4697C18.1768 18.7626 18.1768 19.2374 18.4697 19.5303L19.5303 18.4697ZM20.4697 21.5303C20.7626 21.8232 21.2374 21.8232 21.5303 21.5303C21.8232 21.2374 21.8232 20.7626 21.5303 20.4697L20.4697 21.5303ZM18.4697 19.5303L20.4697 21.5303L21.5303 20.4697L19.5303 18.4697L18.4697 19.5303Z" fill="gray"/>
                        </svg>
                    </div>
                    <div className="p-2 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Mes Points</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.points} points</span>

                    </div>
                    

            </div> 
            {/* Marque Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
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
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Marque de la Voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.marque}</span>

                </div>
            </div> 
            {/* type Voiture */}
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
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
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Type de la voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.type}</span>

                </div>
                
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Matricule de la Voiture</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.matricule}</span>

                </div>
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Carburant</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.carburant}</span>
                </div>
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Kilometrage</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800">{client?.kilometrage} km</span>

                </div>
                
            </div> 
            <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">

                <div className="p-5 flex flex-col gap-5">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>Mes Operation</p>
                    </h3>
                    <span className="text-l font-bold tracking-tight text-gray-500 dark:text-gray-800"><Link href={`/sell/collections/operations?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5BuserId%5D%5Bequals%5D=${client.id}`}>Mes Operations</Link></span>

                </div>
                
            </div> 
            <Link href={{
                      pathname:"/productsoperations",
                      query: {
                        agentId: `${user.id}`,
                        clientId: `${client.id}`
                      }
                    }} >Pass</Link>

        </div> 
    </div>
  </section>): <p>you are noit allowed to open this page</p>}
  </>
}
export default Page
