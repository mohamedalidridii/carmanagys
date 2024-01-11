"use client"
import React, { useState } from 'react';
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import ProductReel from '@/componenets/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(value)) {
        return prevCategories.filter((category) => category !== value);
      } else {
        return [...prevCategories, value];
      }
    });
  };

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

  const isAnyCheckboxChecked = selectedCategories.length > 0;

  return (
    <MaxWidthWrapper>
        <div className="py-8 px-4 mx-auto mt-20 max-w-screen-xl text-center lg:py-10 lg:px-20 flex flex-col items-center ">
        
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900">Selectionner une catégorie</h1>
          {PRODUCT_CATEGORIES.map(({ value, label }) => (
            <label key={value} className='relative flex content-center mb-7 text-2xl' >
              <input
                type="checkbox"
                value={value}
                checked={selectedCategories.includes(value)}
                onChange={() => handleCategoryChange(value)}
              />
              {label}
            </label>
          ))}
        </div>
        
      {isAnyCheckboxChecked ? (
        <ProductReel
          title={label ?? "Selectionner un ou plusieur produit:"}
          query={{
            category: selectedCategories,
            limit: 40,
            sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
          }}
        />
      ) : null }
    </MaxWidthWrapper>
  );
};

export default ProductsPage;