"use client"
import React, { useState, useEffect } from 'react';
import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
import ProductReelOperation from '@/componenets/ProductOperation';
import { PRODUCT_CATEGORIES } from '@/config';
import { useForm } from "react-hook-form"
import { OperationValidator, XOperationValidator, mappedDistributeurs } from "../../lib/validators/ordersValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart } from '@/hooks/use-cart';
import { Product, User } from '@/cms-types';

type Param = string | string[] | undefined;
interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}
const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined;
};

const ProductsOperationPage: React.FC<{ searchParams: { agentId: string, clientId: string, clientName: string, clientPoints: string, clientPrenom: string, agentName: string, agentPrenom: string; } }> = ({ searchParams }: ProductsPageProps) => {
  
  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isCarburantCategory, setIsCarburantCategory] = useState(true);
  const [number, setNumber] = useState<number>(0);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const handleCheckoutClick = (selectedProducts: Product[],

    isCarburantCheckout: boolean, quantity : number) => {
    setCheckoutClicked(true);
    setSelectedProducts(selectedProducts);
    setIsCarburantCategory(isCarburantCheckout);
    setNumber(isCarburantCheckout ? 0 : 1);
  };

  const sort = parse(searchParams.sort) || '';
  let category = parse(searchParams.category);
  const id_client = searchParams.clientId
  const id_agent = searchParams.agentId
  const agentName = searchParams.agentName
  const agentPrenom = searchParams.agentPrenom
  const clientName = searchParams.clientName
  const clientPrenom = searchParams.clientPrenom
  const clientPoints = searchParams.clientPoints

  // Access setUserDetails action inside useCart.
  
  const { setUserDetails } = useCart();
  useEffect(() => {

    const { clientId, agentId, agentName, agentPrenom, clientName, clientPrenom, clientPoints } = searchParams; 

    // Call the action to update cart state with values
    setUserDetails(clientId as string, agentId as string, agentName as string, agentPrenom as string, clientName as string, clientPrenom as string, clientPoints as string); 

  }, [searchParams, setUserDetails]); // Add useCart in dependency array.

  const handleCategoryChange = (value: string) => {

    setSelectedCategories([value]);
  };

  const {
    register,
    handleSubmit,
    trigger, clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<XOperationValidator>({
    resolver: zodResolver(OperationValidator),
  })

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

  const isAnyCheckboxChecked = selectedCategories.length > 0;

  return (
    <MaxWidthWrapper>
      <div className="grid gap-6 mb-6 lg:mb-16 grid-cols-2 p-2">
      <div className="items-center bg-gray-10 rounded-lg shadow dark:bg-gray-50 dark:border-gray-700">
        <div className="p-2 flex flex-col gap-5">
          <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
            <p>Nom du client:</p>
          </h3>
          <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{clientName} {clientPrenom}</span>
        </div>
      </div>
      <div className="items-center bg-gray-10 rounded-lg shadow dark:bg-gray-50 dark:border-gray-700">
        <div className="p-2 flex flex-col gap-5">
          <h3 className="text-l font-bold tracking-tight text-gray-900 dark:text-gray-800">
            <p>Points:</p>
          </h3>
          <span className="text-l font-normal tracking-tight text-gray-500 dark:text-gray-800">{clientPoints}</span>
        </div>
      </div>
    </div>
      <h1 className="px-4 mb-4 text-l mt-5 font-bold tracking-tight leading-none text-gray-900 ">Selectionner une catégorie</h1>
      <div className="px-4 mx-auto  max-w-screen-xl flex flex-col items-stretch ">
        {PRODUCT_CATEGORIES.map(({ value, label }) => (
          <div key={category} className="flex items-center ps-4 border border-gray-200 rounded">
            <input className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              type="radio"
              value={value}
              name="category"
              checked={selectedCategories.includes(value)}
              onChange={() => handleCategoryChange(value)}
            />
            <label key={value} className="w-full py-4 ms-2 text-sm font-medium text-gray-900" >
              {label}
            </label>
          </div>
        ))}
      </div>

      {isAnyCheckboxChecked ? (
        <ProductReelOperation
          title={label ?? "Selectionner un ou plusieurs produits:"}
          query={{
            category: selectedCategories,
            limit: 40,
            sort: sort === 'desc' || sort === 'asc' ? sort : undefined,

            // Pass the callback to handle checkout click
          }}
          onCheckoutClick={(selectedProducts, quantity) => handleCheckoutClick(selectedProducts,  isCarburantCategory , quantity)}
        />
      ) : null}
      
    </MaxWidthWrapper>
  );
};

export default ProductsOperationPage;