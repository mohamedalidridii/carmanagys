"use client"

import { useEffect, useState } from 'react'
import { Product } from '../cms-types'
import { Skeleton } from '@/components/ui/skeleton'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'
import AddToCartButton from './AddToCartButton'

interface ProductListingOperationProps {
  product: Product | null
  index: number
}

const ProductListingOperation = ({ product, index }: ProductListingOperationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)
    return () => clearTimeout(timer)
  }, [index])

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.subcategory)?.label
  const validUrls = product.images
    // @ts-expect-error context already passed from express middleware
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]

  if (isVisible && product) {

    return (
      <div className='group'>
        <div className='flex flex-col w-full'>
          <ImageSlider urls={validUrls} />
          <h3 className='mt-4 font-medium text-sm text-gray-700'>{product.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>{label}</p>
          <p className='mt-1 font-medium text-sm text-gray-900'>{product.price} DT</p>
        </div>
        <div className='mt-10'>
          <AddToCartButton product={product} />
        </div>
      </div>


    )
  }
}

const ProductPlaceholder = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mt-4 w-2/3 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-16 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
      <Skeleton className='mt-2 w-12 h-4 rounded-lg' />
    </div>
  )
}

export default ProductListingOperation