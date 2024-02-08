"use client"

import { useEffect, useState } from 'react'
import { Product } from '../cms-types'
import { Skeleton } from '@/components/ui/skeleton'
import { PRODUCT_CATEGORIES } from '@/config'
import ImageSlider from './ImageSlider'

interface ProductListingOperationProps {
  product: Product | null
  index: number
  onProductClick: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
}

const ProductListingOperation = ({ product, index, onProductClick }: ProductListingOperationProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);
  const [updatedPrice, setUpdatedPrice] = useState<number>(product?.price || 0); // State to hold updated price

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, index * 75)
    return () => clearTimeout(timer)
  }, [index])

  const handleButtonClick = () => {
    if (product) {
      const { id, name, price, points } = product;
      // Update the selection state based on the previous state
      setIsSelected((prevIsSelected) => !prevIsSelected);
      // Call the provided onProductClick function
      onProductClick(product);
      setClickCount((prevCount) => (prevCount + 1) % 6);
      // Pass the updatedPrice to the parent
    }
  };

  if (!product || !isVisible) return <ProductPlaceholder />

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
  const validUrls = product.images
    // @ts-expect-error context already passed from express middleware
    .map(({ image }) => (typeof image === 'string' ? image : image.url))
    .filter(Boolean) as string[]
    
  if (isVisible && product) {

    return (<button
      className={`rounded-md cursor-pointer ${isSelected ? 'border-green-500 text-black' : 'border-gray-500 text-black'}`}
      onClick={handleButtonClick}
    >
      <div className='group'>
        <div className='flex flex-col w-full'>
          {product.category === 'carburant' ? (null) :
            <p className='mt-1 font-medium text-sm text-gray-900'>Qt: {clickCount}</p>}
          <ImageSlider urls={validUrls} />
          <h3 className='mt-4 font-medium text-sm text-gray-700'>{product.name}</h3>
          <p className='mt-1 text-sm text-gray-500'>{label}</p>

          <p className='mt-1 font-medium text-sm text-gray-900'>{product.price} DT</p>
        </div>
      </div>
    </button>

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