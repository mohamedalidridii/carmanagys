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
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
        <div className='w-4/5'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            

            <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
              <div className='flex flex-col items-center gap-15 '>
              <Badge className="flex justify-center gap-15">{capitalizeFirstLetter(user.role)}</Badge>
                <Link
                  onClick={() => closeOnCurrent('/sign-in')}
                  href={`/user/${user.id}`}
                  >
                  <Button className='w-fill'>Mes Informations</Button>
                </Link>
                <QrCodeButton user={user}/>
                <Link
                  onClick={signOut} 
                  href='/'
                >
                    <Button className='w-fill'>Déconnexion</Button>
                  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNavClient