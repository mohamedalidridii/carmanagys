  "use client"

  import { useEffect, useState } from 'react'
  import { Product } from '../cms-types'
  import { Skeleton } from '@/components/ui/skeleton'
  import Link from 'next/link'
  import { cn, formatPrice } from '@/lib/utils'
  import { PRODUCT_CATEGORIES } from '@/config'
  import ImageSlider from './ImageSlider'

  interface ProductListingOperationProps {
    product: Product | null
    index: number
    onProductClick: (product: Product) => void;
    onRemoveFromCart: (productId: number) => void;
  }

  const ProductListingOperation = ({ product, index, onProductClick, onRemoveFromCart}: ProductListingOperationProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isSelected, setIsSelected] = useState<boolean>(false);

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
  
        // Only remove the product from the cart if it was selected
        if (isSelected) {
          onRemoveFromCart(product.id);
        }
      }
    };
  

    if (!product || !isVisible) return <ProductPlaceholder />

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label
    const validUrls = product.images
  // @ts-expect-error context already passed from express middleware
      .map(({ image }) => (typeof image === 'string' ? image : image.url))
      .filter(Boolean) as string[]

    if (isVisible && product) {
      return (
        <div className='group'>
          <Link className={cn('invisible h-full w-full cursor-pointer', {
            'visible animate-in fade-in-5': isVisible,
          })} href={`/product/${product.id}`}>
            <div className='flex flex-col w-full'>
              <ImageSlider urls={validUrls} />
              <h3 className='mt-4 font-medium text-sm text-gray-700'>{product.name}</h3>
              <p className='mt-1 text-sm text-gray-500'>{label}</p>
              <p className='mt-1 font-medium text-sm text-gray-900'>{formatPrice(product.price)}</p>
            </div>
          </Link>
          <button
        className='mt-2 p-2 bg-blue-500 text-white rounded-md cursor-pointer'
        onClick={handleButtonClick}
      >
        {isSelected ? 'Annuler' : 'Ajouter'}
      </button>
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