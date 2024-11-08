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
import MobileNav from "./(AccountNav)/MobileNavBar"
import AgentAccountNav from "./(AccountNav)/AgentAccountNav"
import AdminAccountNav from "./(AccountNav)/AdminAccountNav"
import MobileNavClient from "./(AccountNav)/MobileNavBarClient"
import MobileNavAgent from "./(AccountNav)/AgentAccountNav"
import MobileNavAdmin from "./(AccountNav)/AdminAccountNav"


const NavBar = async () => {

    const nextCookies = cookies()

    const { user } = await getServerSideUser(nextCookies)

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-30">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">

                        <div className="flex h-16 items-center justify-between">

                            <div className="ml-4 flex lg:ml-0">
                                {user ? (<Link href='/isSignIn'>
                                    <Icons.logo className="h-15 w-15" />
                                </Link>) : (<Link href='/'>
                                    <Icons.logo className="h-15 w-15" />
                                </Link>)}
                            </div>
                            <div className=" hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>
                            {/* <div className="ml-auto flex item-center">
                                <div className=" flex flex-1 items-center justify-end space-x-7">
                                    {user?.role === 'client' ? (
                                        <div className="lg:invisible">
                                        <MobileNavClient user={user} /></div>
                                    ) : null}
                                    {user?.role === 'agent' ? (
                                        <div className="lg:invisible">
                                            <MobileNavAgent user={user} /></div>
                                    ) : null}
                                    {user?.role === 'admin' ? (
                                        <div className="lg:invisible">
                                            <MobileNavAdmin user={user}/></div>
                                    ) : null}
                                </div>
                            </div> */}
                            <div className="lg:ml-auto lg:flex lg:item-center">
                                <div className="flex flex-1 items-center justify-end space-x-7">
                                    {user?.role === 'client' ? (<div className="flex justify-center items-center">
                                        <ClientAccountNav user={user} />
                                    </div>) : null}
                                    {user?.role === 'agent' ? (<div className="flex">
                                        <AgentAccountNav user={user} />
                                    </div>) : null}
                                    {user?.role === 'admin' ? (<div className="flex">
                                        <AdminAccountNav user={user} />
                                    </div>) : null}
                                    {user ? (<span
                                        className="h-6 w-pw bg-gray-200"
                                        aria-hidden='true'

                                    />) : null}
                                    <div className="ml-4 flow-root lg:ml-6">
                                    {user?.role === 'admin' || user?.role === 'agent' || user?.role === 'topadmin' ? (<Cart />): null}
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