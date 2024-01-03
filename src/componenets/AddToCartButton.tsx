'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/cms-types'

const AddToCartButton = ({
  product,
}: {
  product: Product
}) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <Button disabled
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      size='lg'
      className='w-full'>
      {isSuccess ? "Cette article a été ajouté avec succès" : "Ajouter au panier"}
    </Button>
  )
}

export default AddToCartButton