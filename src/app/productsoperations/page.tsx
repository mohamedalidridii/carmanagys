  "use client"
  import React, { useState, useEffect } from 'react';
  import MaxWidthWrapper from '@/componenets/MaxWidthWrapper';
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
  import ProductReelOperation from '@/componenets/ProductOperation';
  import { PRODUCT_CATEGORIES } from '@/config';
  import { useRouter } from 'next/navigation'
  import { useForm } from "react-hook-form"
  import { OperationValidator, XOperationValidator } from "../../lib/validators/ordersValidator"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { trpc } from "@/trpc/client"
  import { toast } from "sonner"
  import { Product, User } from '@/cms-types';



  type Param = string | string[] | undefined;


  interface ProductsPageProps {
    searchParams: { [key: string]: Param };
  }


  const parse = (param: Param) => {
    return typeof param === 'string' ? param : undefined;
  };


  const ProductsOperationPage: React.FC<{ searchParams: { agentId: string, clientId:string } }> = ({ searchParams }: ProductsPageProps) => {
    
    
    const [checkoutClicked, setCheckoutClicked] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [isCarburantCategory, setIsCarburantCategory] = useState(true);
    const [number, setNumber] = useState<number>(0);
    const [num, setNum] = useState<number>(0);

    // Add state for 'lubrifiantValue'
    const [lubrifiantValue, setLubrifiantValue] = useState<string>('0');
    // Add state for 'totalValue'
    const [totalValue, setTotalValue] = useState<number>(0);
    const [totalPoints, setTotalPoints] = useState<number>(0);
    
    const handleCheckoutClick = (selectedProducts: Product[],
      isCarburantCheckout: boolean) => { 
          console.log('Handling checkout click. Selected products:', selectedProducts);
          setCheckoutClicked(true);
          setSelectedProducts(selectedProducts);
          setIsCarburantCategory(isCarburantCheckout);
          setNumber(isCarburantCheckout ? 0 : 1);
    };
    const sort = parse(searchParams.sort);
    const category = parse(searchParams.category);


    
    const id_client = searchParams.clientId
    const id_agent = searchParams.agentId
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    const handleCategoryChange = (value: string) => {
      
      setSelectedCategories([value]);
    };


      let calculateTotal = (products: Product[], isCarburantCategory: boolean) => {
        let lubrifiantValueFloat= 0
        let carburantProductTotal= 0
        let otherProductsTotal = 0
        console.log('Calculating total...');
        console.log('Selected Products:', products);
        console.log('Is Carburant Category:', isCarburantCategory);

        lubrifiantValueFloat = parseFloat(lubrifiantValue);
        carburantProductTotal = isCarburantCategory
          ? products
              .filter((product) => product.category === 'carburant') // Adjust 'carburant' to your actual carburant category value
              .reduce((acc, product) => acc + product.price, 0) * lubrifiantValueFloat
          : 0;
        otherProductsTotal = products
          .filter((product) => product.category !== 'carburant') // Adjust 'carburant' to your actual carburant category value
          .reduce((acc, product) => acc + product.price, 0);
        
        let total = (carburantProductTotal + otherProductsTotal).toFixed(3);
        console.log('Total Value:', total);
        setTotalValue(parseFloat(total));
      };
      
      
      let calculateTotalPoints = () => {
        let otherProductsTotalPoints = 0
        let carburantProductTotalPoints =0
        // let totalpoints = 0
        let lubrifiantValueFloat = 0;
        lubrifiantValueFloat = parseFloat(lubrifiantValue);
        let lubrifiantMultiplier = 0;
    
        if (lubrifiantValueFloat >= 0 && lubrifiantValueFloat < 20) {
          lubrifiantMultiplier = 0;
        } else if (lubrifiantValueFloat < 40) {
          lubrifiantMultiplier = 1;
        } else if (lubrifiantValueFloat < 60) {
          lubrifiantMultiplier = 2;
        } else if (lubrifiantValueFloat < 80) {
          lubrifiantMultiplier = 3;
        } else if (lubrifiantValueFloat < 100) {
          lubrifiantMultiplier = 4;
        } else if(lubrifiantValueFloat >= 100) {
          lubrifiantMultiplier = 5;
        }
        else{
          lubrifiantMultiplier = 0;
        }
        
        // Calculate total points by multiplying points with lubrifiant multiplier
        carburantProductTotalPoints =
          isCarburantCategory
            ? selectedProducts
                .filter((product) => product.category === 'carburant')
                .reduce((acc, product) => acc + product.points * lubrifiantMultiplier, 0) : 0;
    
        otherProductsTotalPoints =
          selectedProducts
            .filter((product) => product.category !== 'carburant')
            .reduce((acc, product) => acc + product.points, 0);
    
        let totalpoints = carburantProductTotalPoints + otherProductsTotalPoints;
    
        // Update total points state
        
        setTotalPoints(totalpoints);
      };


      const [buttonText, setButtonText] = useState<string>('Calculer le total');

      const handleCalculateClick = async () => {
        // Call the calculateTotal and calculateTotalPoints functions to update state
        calculateTotal(selectedProducts, isCarburantCategory);
        calculateTotalPoints();
        if (num === 0) {
          setButtonText('Valider le total');
        } else if (num === 1) {
          setButtonText('Valider les points');
        } else if (num === 2) {
          setButtonText("Valider l'operation"); // Add your fourth button text here
        }
    
        // Increment the number for the next click
        setNum(num + 1);
      
      };

    const {
      register,
      handleSubmit,
      trigger, clearErrors,
      formState: {errors, dirtyFields},
    } = useForm<XOperationValidator>({
      resolver: zodResolver(OperationValidator),
    })

    const router = useRouter()
    const {mutate, isLoading} = trpc.auth.createOperation.useMutation({
      onSuccess:() => {
        toast.success("l'operation a bien été validée.")
        router.push("/");
      }
    }) 
    
    const onSubmit = async ({
      userId,
      agent,
      produit,
      lubrifiant,
      pointsadded,
      total,
    }: XOperationValidator) => {
      try {
        clearErrors();
        // Use await to handle asynchronous validation
    
        if (Object.keys(errors).length > 0) {
          console.log('Validation Errors:', errors);
          return; // Do not proceed if there are validation errors
        }
    
        // Your mutation or submission logic here
        mutate({
          userId,
          agent,
          produit,
          lubrifiant,
          pointsadded,
          total,
        });
    
      } catch (error) {
        console.error('Error during form submission:', error);
      }
    };

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

    const isAnyCheckboxChecked = selectedCategories.length > 0;

    return (
      <MaxWidthWrapper>
          <div className="py-8 px-4 mx-auto mt-20 max-w-screen-xl text-center lg:py-10 lg:px-20 flex flex-col items-center ">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Selectionner une catégorie</h1>
            {PRODUCT_CATEGORIES.map(({ value, label }) => (
              <label key={value} className='relative flex content-center mb-7 text-2xl' >
              <input
                type="radio"
                value={value}
                name="category"
                checked={selectedCategories.includes(value)}
                onChange={() => handleCategoryChange(value)}
              />
              {label}
            </label>
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
              onCheckoutClick={handleCheckoutClick} // Pass the callback to handle checkout click
            />
        ) : null}

  {checkoutClicked && (
      <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16 pt-10">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Passer une Operation</h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
          Seuls les agents sont autorisés à accéder à cette section.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Ajouter une operation
                  </h1>
                  <form 
                  onSubmit={handleSubmit(onSubmit)} 
                  className="space-y-4 md:space-y-6">
                      <div>
                        <Label htmlFor="idUser" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Id client</Label>
                          <Input 
                          {...register('userId')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          readOnly value={id_client}/>
                      </div>
                      <div>
                          <Label htmlFor="agent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">id Agent</Label>
                          <Input
                          {...register('agent')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                          readOnly value={id_agent}/>
                      </div>
                      <div>
                          <Label htmlFor="produit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Produit</Label>
                          <Input
                          {...register('produit')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    readOnly
                    value={selectedProducts.map((product) => product.name).join(', ')}/>
                      </div>
                      <div>
                          <Label htmlFor="lubrifiant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lubrifiant en Dt</Label>
                          {!isCarburantCategory ? (
                          <Input
                            {...register('lubrifiant')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value="0"
                            readOnly // Use disabled attribute instead of readOnly
                          />
                        ) : (
                          <Input
                          {...register('lubrifiant')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={lubrifiantValue} // Use 'lubrifiantValue' for the value when in the carburant category
                          onChange={(e) => setLubrifiantValue(e.target.value)} // Update the 'lubrifiantValue' state
                        />
                        )}
                      </div>
                      <div className="flex items-start">

                          <div className="ml-3 text-sm">
                            <Label htmlFor="total"
                          className="font-light text-gray-500 dark:text-gray-300">Total</Label>
                            <Input
                              {...register('total')}
                              className="font-light text-gray-500 dark:text-gray-300"
                              value={totalValue} // Use 'totalValue' for the total value
                              readOnly
                            />
                            <Label htmlFor="points" className="font-light text-gray-500 dark:text-gray-300">Les Points totaux </Label>
                            <Input
                              {...register('pointsadded')}
                              className="font-light text-gray-500 dark:text-gray-300"
                              value={totalPoints} // Display the calculated total points in the input field
                              readOnly
                            />
                          </div>
                      </div>
                      <Button className="w-full" onClick={handleCalculateClick}>
                        {buttonText}
                      </Button>
                      {/* <Button className="w-full" type='submit'>Enregistrer l&apos;operation</Button> */}
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      </p>
                  </form>
              </div>
          </div>
      </div>
      </section>
      )}
      </MaxWidthWrapper>
    );
  };

  export default ProductsOperationPage;