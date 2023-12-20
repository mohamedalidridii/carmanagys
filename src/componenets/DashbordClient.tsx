"use client"

import { User } from "@/cms-types"
import { useAuth } from "@/hooks/user-auth"
import Image from "next/image"
import Link from "next/link"


const ClientDashbord = ({user}: {user: User}) => {
    
    function capitalizeFirstLetter(str: string): string {
        
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    const {signOut} = useAuth()
    return 
}
export default ClientDashbord