"use client"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { TQueryValidator } from "@/lib/validators/query-validator"
import { Product } from "@/cms-types"
import ProductListingOperation from './ProductListingOperation'
import { useState } from "react"

import { Button } from "@/components/ui/button"



interface ProductReelOperationProps {
  title: string
  subtitle?: string
  href?: string
  query: TQueryValidator
  onCheckoutClick: (selectedProducts: Product[], isCarburantCategory: boolean) => void;

}
const FALLBACK_LIMT = 10

const ProductReelOperation = (props: ProductReelOperationProps) => {

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
  const [isCarburantCheckout, setIsCarburantCheckout] = useState<boolean>(false);
  const { title, subtitle, href, query, } = props

  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMT,
      query
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    })

  const products = queryResults?.pages.flatMap(
    (page) => page.items
  )

  const handleProductSelect = (product: Product | null) => {
    console.log('Product selected:', product);

    if (product) {
      // Check if the product is already selected
      const isSelected = selectedProducts.some((selectedProduct) => selectedProduct.id === product.id);
      console.log('Is selected:', isSelected);
      // Toggle the selection state
      setSelectedProducts((prevSelectedProducts) => {
        const newSelectedProducts = isSelected
          ? prevSelectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id)
          : [...prevSelectedProducts, product];

        console.log('Selected products:', newSelectedProducts);

        return newSelectedProducts; // Return the new state
      });
    };
  }



  const handleRemoveFromCart = (productId: number) => {
    // Remove the product from the cart
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((selectedProduct) => selectedProduct.id !== productId)
    );
  };



  const handleCheckout = () => {
    // Add logic here to handle the checkout action
    console.log('Checkout button clicked. Selected products:', selectedProducts);

    const hasCarburantCategory = selectedProducts.some(
      (product) => product.category?.toLowerCase() === 'carburant'
    );

    setIsCarburantCheckout(hasCarburantCategory)
    props.onCheckoutClick(selectedProducts, hasCarburantCategory);
  }
  let map: (Product | null)[] = []
  if (products && products.length) {
    map = products
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMT).fill(null)
  }
  return <section className="py-12">

    <div className="md:flex md:items-center md:justify-between mb-4">
      <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
        {title ?
          (<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>) : null}
        {/* {subtitle ? 
                (<p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>) : null} */}
      </div>
      <Button className="w-full mt-5 p-2 bg-blue-500 text-white rounded-md cursor-pointer" 
      onClick={handleCheckout}
      disabled={selectedProducts.length == 0}>
        Passer a l&apos;étape suivante
      </Button>
    </div>
    <div className="relative">
      <div className="mt-6 flex items-center w-full sm:flex-wrap">
        <div className="w-full grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-2 md:gap-y-10 lg:gap-x-8">
          {map.map((product, i) => (
            <ProductListingOperation
              key={`product-${i}`}
              product={product}
              index={i}
              onProductClick={() => handleProductSelect(product)}
              onRemoveFromCart={(productId) => handleRemoveFromCart(productId)}

            />
          ))}
        </div>
      </div>
      <section className="py-12">


      </section>
    </div>
  </section>
}
export default ProductReelOperation