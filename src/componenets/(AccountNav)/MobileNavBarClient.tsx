'use client'

import { PRODUCT_CATEGORIES } from '@/config'
import { Menu, X } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from "@/cms-types"
import { useAuth } from "@/hooks/user-auth"
import { DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenu, 
  DropdownMenuSeparator, } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import QrCodeButton from '../QrCodeButton'
const MobileNavClient = ({user}: {user: User}) => {
  function capitalizeFirstLetter(str: string): string {
        
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  // whenever we click an item in the menu and navigate away, we want to close the menu
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // when we click the path we are currently on, we still want the mobile menu to close,
  // however we cant rely on the pathname for it because that won't change (we're already there)
  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }
  const {signOut} = useAuth()
  // remove second scrollbar when mobile menu is open
  useEffect(() => {
    if (isOpen)
      document.body.classList.add('overflow-hidden')
    else document.body.classList.remove('overflow-hidden')
  }, [isOpen])

  if (!isOpen)
    return (
      <button
      type='button'
      onClick={() => setIsOpen(true)}
      className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
      <Menu className='h-6 w-6' aria-hidden='true' />
    </button>
    )
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild className="overflow-visible sm:invisible">
            <Button variant="ghost" size="sm" className="relative">Mon compte</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white w-60" align="end">
            <div className="flex items-center justify-center gap-5 p-2">
                <div className="flex flex-col space-y-0.5 leading-none gap-2">
                    <Badge variant="outline" className="flex justify-center">{`${user.nom} ${user.prenom}`}</Badge>
                    <Badge className="flex justify-center">{`${capitalizeFirstLetter(user.role)} ID:${user.id}`}</Badge>
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                Déconnexion
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileNavClient