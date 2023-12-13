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


const AgentAccountNav = ({user}: {user: User}) => {
    
    const {signOut} = useAuth()
    return <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible">
            <Button variant="ghost" size="sm" className="relative">Mon compte</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-60 " align="end">
            <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-0.5 leading-none gap-2">
                <Badge variant="outline" className="flex justify-center">{user.email}</Badge>
                <Badge className="flex justify-center">{user.role}</Badge>
                </div>
            </div>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/sell">Client Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                Déconnexion
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
}
export default AgentAccountNav