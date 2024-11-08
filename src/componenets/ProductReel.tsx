"use client"
import Link from "next/link"
import { trpc } from "@/trpc/client"
import { TQueryValidator } from "@/lib/validators/query-validator"
import { Product } from "@/cms-types"
import   ProductListing   from '../componenets/ProductListing'
interface ProductReelProps {
    title: string
    subtitle?: string
    href?: string
    query: TQueryValidator
}
const FALLBACK_LIMT = 4

const ProductReel = (props: ProductReelProps) => {


    const {title, subtitle, href, query} = props

    const {data: queryResults, isLoading} = trpc.getInfiniteProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMT, query
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage
    })

    const products = queryResults?.pages.flatMap(
        (page) => page.items
    )

    let map: (Product | null) [] = []
    if(products && products.length) {
        map = products
    } else if (isLoading){
        map = new Array<null>(query.limit ?? FALLBACK_LIMT).fill(null)
    }
    return <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
            <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                {title ? 
                (<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>) : null}
                {subtitle ? 
                (<p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>) : null}
            </div>

        </div>
        <div className="relative">
            <div className="mt-6 flex items-center w-full sm:flex-wrap">
                <div className="w-full grid grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                    {map.map((product, i) => (
                        <ProductListing key={`product-${i}`} product={product} index={i}/>
                    ))}
                </div>
            </div>
        </div>
    </section>
}
export default ProductReel