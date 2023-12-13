import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { Icons } from "./Icons"
import NavItems from "./NavItems"
import { buttonVariants } from "@/components/ui/button"
import Cart from "./Cart"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import ClientAccountNav from "./(AccountNav)/ClientAccountNav"
import QrCodeButton from "./QrCodeButton"


const NavBar = async () => {

    const nextCookies = cookies()

    const {user} = await getServerSideUser(nextCookies)

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/*TODO:Mobile Navigation */}

                            <div className="ml-4 flex lg:ml-0">
                                <Link href='/'>
                                    <Icons.logo className="h-10 w-10" />
                                </Link>
                            </div>
                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>

                            <div className="ml-auto flex item-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (
                                    <Link href='/sign-in' className={buttonVariants({
                                        // variant: 'ghost',
                                    })}>Espace Client
                                    </Link>
                                    )}
                                    {user ? null : (
                                        <span 
                                            className="h-6 w-pw bg-gray-200"
                                            aria-hidden='true'/>
                                            )}
                                    {user ? null : (
                                        <span 
                                            className="h-6 w-pw bg-gray-200"
                                            aria-hidden='true'/>
                                            )}

                                    { user && user?.role === 'client'? (<div className="flex">
                                        <QrCodeButton user={user} />
                                        <ClientAccountNav user={user}/>
                                        </div>): null }
                                        
                                        { user ? null : (<Link href='/sign-up'
                                            className={buttonVariants({
                                            variant: 'ghost',
                                        })}>
                                        Créer un compte
                                        </Link>)}

                                    {user ? (<span 
                                            className="h-6 w-pw bg-gray-200"
                                            aria-hidden='true'

                                            />) : null}
                                    {user ? null : (<div className="flex lg:ml-6">
                                            <span 
                                            className="h-6 w-pw bg-gray-200"
                                            aria-hidden='true'/>
                                                    </div>
                                                    )}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        {/* <Cart /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}
export default NavBar