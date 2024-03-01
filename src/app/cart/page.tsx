"use client"
import { Button } from '@/components/ui/button'
import { PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import QrCodeButton from '@/componenets/QrCodeButton'
import { User } from "@/cms-types"
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OperationValidator, XOperationValidator, mappedDistributeurs } from "../../lib/validators/ordersValidator"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
const Page = () => {


  const { items, removeItem, clientName, id_client, clientPrenom, clientPoints, agentName, agentPrenom, id_agent } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)




  const productIds = items.map(({ product }) => product.id)

  const [isMounted, setIsMounted] = useState<boolean>(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce(
    (total, { product }) => {
      const quantity = items.find(item => item.product.id === product.id)?.quantity
      // @ts-expect-error context already passed from express middleware
      const totalArticle = (quantity * product.price).toFixed(3);

      return total + parseFloat(totalArticle);
    },
    0 // Start with an initial total of 0
  );
  const cartTotalpoints = items.reduce(
    (totalpoints, { product }) => {
      const quantity = items.find(item => item.product.id === product.id)?.quantity
      // @ts-expect-error context already passed from express middleware
      const totalpointsArticle = (quantity * product.points).toFixed(3);

      return totalpoints + parseFloat(totalpointsArticle);
    },
    0 // Start with an initial total of 0
  );
  const {
    register,
    handleSubmit,
    trigger, clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<XOperationValidator>({
    resolver: zodResolver(OperationValidator),
  })


  const { mutate, isLoading } = trpc.auth.createOperation.useMutation({
    onSuccess: () => {
      toast.success("l'operation a bien été validée.")
      router.push("/isSignIn");
    }
  })

  const onSubmit = async ({
    userId,
    userName,
    agent,
    agentName,
    produit,
    lubrifiant,
    distributeur,
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
        userName,
        agent,
        agentName,
        produit,
        distributeur,
        lubrifiant,
        pointsadded,
        total,
      });

    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };





  return (<div className='bg-white'>
    <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
      <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        Vérification des informations
      </h1>
      <div className='grid gap-6 mb-6 lg:mb-16 grid-cols-2 p-2'>
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

      <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
        <div
          className={cn('lg:col-span-7', {
            'rounded-lg border-2 border-dashed border-zinc-200 p-12':
              isMounted && items.length === 0,
          })}>
          <h2 className='sr-only'>
            Items in your shopping cart
          </h2>

          {isMounted && items.length === 0 ? (
            <div className='flex h-full flex-col items-center justify-center space-y-1'>
              <div
                aria-hidden='true'
                className='relative mb-4 h-40 w-40 text-muted-foreground'>
                <Image
                  src='/Cart-empty.jpg'
                  fill
                  loading='eager'
                  alt='empty shopping cart hippo'
                />
              </div>
              <h3 className='font-semibold text-2xl uppercase'>
                La Panier est vide.
              </h3>
              <p className='text-muted-foreground text-center'>
                Whoops! Il n&apos;y a rien à afficher ici...
              </p>
            </div>
          ) : null}

          <ul
            className={cn({
              'divide-y divide-gray-200 border-b border-t border-gray-200':
                isMounted && items.length > 0,
            })}>
            {isMounted &&
              items.map(({ product }) => {
                const quantity = items.find(item => item.product.id === product.id)?.quantity
                // @ts-expect-error context already passed from express middleware
                const totalArticle = (quantity * product.price).toFixed(3)
                // @ts-expect-error context already passed from express middleware
                const totalPointsArticle = quantity * product.points

                const label = PRODUCT_CATEGORIES.find(

                  (c) => c.value === product.subcategory
                )?.label
                // @ts-expect-error context already passed from express middleware
                const { image } = product.images[0].image

                return (
                  <li
                    key={product.id}
                    className='flex py-6 sm:py-10'>
                    <div className='flex-shrink-0'>
                      <div className='relative h-24 w-24'>
                        {typeof image !== 'string' &&
                          image ? (
                          <Image
                            fill
                            src={image.url}
                            alt='product image'
                            className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                      <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                        <div>
                          <div className='flex justify-between'>
                            <h3 className='text-sm font-medium text-gray-700 hover:text-gray-800'>
                              {product.name}
                            </h3>
                          </div>

                          <div className='mt-1 flex text-sm flex-col'>
                            <p className='text-muted-foreground'>
                              Qt: {quantity}
                            </p>
                            <p className='text-muted-foreground'>
                              Pu: {product.price} DT
                            </p>
                          </div>


                          <p className='mt-1 text-sm font-medium text-gray-900'>
                            total: {totalArticle} DT
                          </p>
                          <p className='mt-1 text-sm font-medium text-gray-900'>
                            total des points: {totalPointsArticle}
                          </p>
                        </div>

                        <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                          <div className='absolute right-0 top-0'>
                            <Button
                              aria-label='remove product'
                              onClick={() =>
                                removeItem(product.id)
                              }
                              variant='ghost'>
                              <X
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                        <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                        <span>
                          Disponible
                        </span>
                      </p>
                    </div>
                  </li>
                )
              })}
          </ul>
        </div>

        <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>

          <h2 className='text-lg font-medium text-gray-900'>
            Récapitulatif de l&apos;operation
          </h2>

          <div className='mt-6 space-y-4'>
            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='text-base font-medium text-gray-900'>
                Total
              </div>
              <div className='text-base font-medium text-gray-900'>
                {isMounted ? (
                  cartTotal.toFixed(3)
                ) : (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                )} DT
              </div>
            </div>
          </div>
          <div className='mt-6 space-y-4'>

            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='text-base font-medium text-gray-900'>
                Total des points
              </div>
              <div className='text-base font-medium text-gray-900'>
                {isMounted ? (
                  cartTotalpoints
                ) : (
                  <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                )}
              </div>
            </div>
          </div>
          <div>

            <form onSubmit={handleSubmit(onSubmit)}
              className="space-y-4">
              <Input
                {...register('userId')}
                className="z-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute"
                readOnly value={id_client} />

              <Input
                {...register('userName')}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute"
                readOnly value={`${clientName} ${clientPrenom}`} />
              <select className='opacity-0 z-0 relative' {...register('distributeur')} >
                {Object.entries(mappedDistributeurs).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <Input
                {...register('agent')}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute z-0"
                readOnly value={id_agent} />
              <Input
                {...register('agentName')}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute z-0"
                readOnly value={`${agentName} ${agentPrenom}`} />
              <Input
                {...register('produit')}
                className="z-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute"
                readOnly
                value={items.map((product) => product.product.name).join(', ')} />
              <Input
                {...register('lubrifiant')}
                className="z-0 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500 opacity-0 absolute"
                value="0"
                readOnly // Use disabled attribute instead of readOnly
              />
              <Input
                {...register('total')}
                className="font-light text-gray-500 dark:text-gray-900 opacity-0 absolute"
                value={cartTotal} // Use 'totalValue' for the total value
                readOnly
              />
              <Input
                {...register('pointsadded')}
                className="font-light text-gray-500 dark:text-gray-900 opacity-0"
                value={cartTotalpoints} // Display the calculated total points in the input field
                readOnly
              />
              <Button className="w-full z-50" type='submit'>Enregistrer l&apos;operation</Button>
            </form>

          </div>
        </section>
      </div>
    </div>
  </div>
  )
}

export default Page