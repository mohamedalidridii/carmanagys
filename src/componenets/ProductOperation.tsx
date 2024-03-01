"use client"

import Link from "next/link";
import { trpc } from "@/trpc/client";
import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "@/cms-types";
import ProductListingOperation from './ProductListingOperation';
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ProductReelOperationProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
  onCheckoutClick: (selectedProducts: Product[], quantity: number) => void;
}

const FALLBACK_LIMT = 10;

const ProductReelOperation = (props: ProductReelOperationProps) => {
  const { title, subtitle, href, query } = props;
  const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery(
    {
      limit: query.limit ?? FALLBACK_LIMT,
      query
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage
    }
  );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];
  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMT).fill(null);
  }
  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (<h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{title}</h1>) : null}
        </div>
      </div>
      <div className="relative">
        <div className="mt-6 flex items-center w-full sm:flex-wrap">
          <div className="w-full grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 md:grid-cols-2 md:gap-y-10 lg:gap-x-8">
            {map.map((product, i) => (
              <ProductListingOperation
                key={`product-${i}`}
                product={product}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReelOperation;
