"use client"
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/cms-types'
import { ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0]

  const { removeItem, updateQuantity } = useCart();

  const [quantity, setQuantity] = useState(1); // Start with quantity of 1
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.subcategory
  )?.label

  
  return (
    <div className='space-y-3 py-2'>
      <div className='flex items-start justify-between gap-4'>
        <div className='flex items-center space-x-4'>
          <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>

            
            {
            // @ts-ignore // context already passed from express middleware
            typeof image !== 'string' && image.url ? (
              <Image
              // @ts-ignore // context already passed from express middleware
                src={image.url}
                alt={product.name}
                fill
                className='absolute object-cover'
              />
            ) : (
              <div className='flex h-full items-center justify-center bg-secondary'>
                <ImageIcon
                  aria-hidden='true'
                  className='h-4 w-4 text-muted-foreground'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col self-start'>
            <span className='line-clamp-1 text-sm font-medium mb-1'>
            {quantity} X {product.name}
            </span>

            <span className='line-clamp-1 text-xs capitalize text-muted-foreground'>
              Points: {product.points}
            </span>
            <div className="flex items-center mt-4 text-xs text-muted-foreground"> 
            <button onClick={() => {
                setQuantity(Math.max(quantity - 1, 1));
                updateQuantity(product.id, quantity - 1); 
              }}>-</button> 
            <span className="mx-2">{quantity}</span> 
            <button onClick={() => {
                setQuantity(quantity + 1);
                updateQuantity(product.id, quantity + 1); 
              }}>+</button>
            </div>  
            <div className='mt-4 text-xs text-muted-foreground'>

              <button
                onClick={() => removeItem(product.id)}
                className='flex items-center gap-0.5'>
                <X className='w-3 h-4' />
                Annuler
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1 font-medium'>
          <span className='ml-auto line-clamp-1 text-sm'>
            {product.price} DT
          </span>
          
        </div>
      </div>
    </div>
  )
}

export default CartItem