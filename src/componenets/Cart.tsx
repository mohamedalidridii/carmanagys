"use client"

import { SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Sheet} from "@/components/ui/sheet"
import { SheetContent } from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { ScrollArea } from "@/components/ui/scroll-area"
import CartItem from "./CartItem"
import { useEffect, useState } from "react"
const Cart = () => {
    const { items } = useCart()
    const itemCount = items.length

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
      }, [])
    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
      )
    return (
    <Sheet>
        <SheetTrigger className="group -m-2 flex items-center p-2">
            <ShoppingCart 
            aria-hidden="true"
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:gray-500"/>
            <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {isMounted ? itemCount : 0}
            </span>
        </SheetTrigger>
        <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
            <SheetHeader className="space-y-2.5 pr-6">
                <SheetTitle>Articles: {isMounted ? itemCount : 0}</SheetTitle>
            </SheetHeader>
            {itemCount > 0 ? (
                <>
                    <div className="flex w-full flex-col pr-6">
                    <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem
                    product={product}
                    key={product.id}
                    
                  />
                ))}
              </ScrollArea>
                    </div>
                    <div className="space-y-4 pr-6">
                        <Separator />
                        <div className="space-y-1.5 pr-6 text-sm">
                            <div className="flex">
                                <span className="flex-1">Total</span>
                                <span>{cartTotal} DT</span>
                            </div>
                        </div>

                        <SheetFooter>
                            <SheetTrigger asChild>
                                <Link href='/cart' className={buttonVariants({
                                  className:"w-full lg:w-full"  
                                })}>Passer à la caisse</Link>
                            </SheetTrigger>
                        </SheetFooter>
                    </div>
                </>
            ): (<div className="flex h-full flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                    <Image src='/Cart-empty.jpg'
                    fill
                    alt='empty shopping cart'/>
                </div>
                <div 
                    className="text-xl font-semibold">
                        Vous n &apos; avez aucun article dans votre panier.
                </div>
                <SheetTrigger asChild>
                    <Link href='/products' className={buttonVariants({
                        variant: "link",
                        size: 'sm',
                        className:
                        "text-sm text-muted-foreground",
                    })}>Cliquez ici pour continuer vos achats.</Link>
                </SheetTrigger>
            </div>)}
        </SheetContent>
    </Sheet>
)}
export default Cart