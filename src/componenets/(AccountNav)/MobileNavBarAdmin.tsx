"use client"

import { User } from "@/cms-types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger, 
    DropdownMenu, 
    DropdownMenuSeparator, } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/user-auth"
import Link from "next/link"


const AdminAccountNav = ({user}: {user: User}) => {
    
    function capitalizeFirstLetter(str: string): string {
        
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    const {signOut} = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button variant="ghost" size="sm" className="relative">Mon compte</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-60 " align="end">
            <div className="flex items-center justify-center gap-5 p-2">
                <div className="flex flex-col space-y-0.5 leading-none gap-2">
                    <Badge variant="outline" className="flex justify-center">{`${user.nom} ${user.prenom}`}</Badge>
                    <Badge className="flex justify-center">{capitalizeFirstLetter(user.role)}</Badge>
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
            <Link href={`/sell/collections/operations?limit=10&page=1&where%5Bor%5D%5B0%5D%5Band%5D%5B0%5D%5Bagent%5D%5Bequals%5D=${user.id}`}>Mes Operations</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
            <Link href={"/sell"}>Tableau de bord</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
            <Link href={"/sendsms"}>Service SMS</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                Déconnexion
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
export default AdminAccountNav