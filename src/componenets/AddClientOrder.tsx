'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-client'
import { User } from '@/cms-types'

const AddClientOrder = ({
  user,
}: {
  user: User,
}) => {
  const { addItem, clearUser, } = useUser()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (<div>
    <Button
      onClick={() => {
        addItem(user)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full'>
        {isSuccess ? "annuler" : "Vérifier"}
    </Button>
    <div className='mt-5'> 
    <Button
    onClick={() => {
      clearUser()
      setIsSuccess(true)
    }}
    size='lg'
    className='w-full'>
    {isSuccess ? "annuler" : "Vérifier"}
  </Button>
  </div>
  </div>
  )
}

export default AddClientOrder