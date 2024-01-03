"use client"


import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getPayloadClient } from "@/get-payload"
import { getServerSideUser } from "@/lib/payload-utils"
import { OrdersValidator, XOrdersValidator } from "../../lib/validators/ordersValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { trpc } from "@/trpc/client"
import { useUser } from "@/hooks/use-client"
import { toast } from "sonner"

const Page: React.FC<{ searchParams: { id: string } }> = ({ searchParams }: { searchParams: { id: string } }) => {

  const { items, removeItem, clearUser } = useUser()
  const router = useRouter()
  const userId = items.map(({ user }) => user.id)
  const id_client = searchParams.id
  const {
      register,
      handleSubmit,
      formState: {errors},
    } = useForm<XOrdersValidator>({
      resolver: zodResolver(OrdersValidator),
    })


    const {mutate, isLoading} = trpc.auth.createOrder.useMutation({
      onSuccess:() => {
        clearUser()
        toast.success("l'operation a bien été validée.")
        router.push("/");
      }
    }) 
    const onSubmit = ({
      userId,
       agent, produit, lubrifiant, points, total
      }: XOrdersValidator) => {
          mutate({
            userId,
            agent, produit, lubrifiant, points, total
          })
  } 

  return <>
    <div>
       <section className="bg-gray-50 dark:bg-gray-900">

      <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16 pt-10">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Passer une commande</h2>
        <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Seuls les agents sont autorisés à accéder à cette section.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Ajouter une commande
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
                         readOnly/>
                    </div>
                    <div>
                        <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Produit</Label>
                        <Input
                         {...register('produit')} 
                         className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div>
                        <Label htmlFor="lubrifiant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lubrifiant en Dt</Label>
                        <Input 
                        {...register('lubrifiant')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="flex items-start">

                        <div className="ml-3 text-sm">
                          <Label htmlFor="total"
                         className="font-light text-gray-500 dark:text-gray-300">Total</Label>
                          <Input 
                          {...register('total')} 
                          className="font-light text-gray-500 dark:text-gray-300"/>
                          <Label htmlFor="points" className="font-light text-gray-500 dark:text-gray-300">Les Points totaux </Label>
                          <Input
                           {...register('points')} 
                           className="font-light text-gray-500 dark:text-gray-300"/>

                        </div>
                    </div>
                    <Button className="w-full" >Passer la commande</Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">

                    </p>
                </form>
            </div>
        </div>
    </div>
   </section>
   </div>
   </>
   }

export default Page