"use client"
import React, { useState } from 'react';
import { trpc } from "@/trpc/client"
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SendSmsValidator, XSendSmsValidator } from '@/lib/validators/account-credentials-validator';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
const SendSmsPage = () => {
 const router = useRouter();

  

  const {
    register,
    handleSubmit,
    formState: {errors},
 } = useForm<XSendSmsValidator>({
    resolver: zodResolver(SendSmsValidator),
 })


 const {mutate: SendSms, isLoading} = 
 trpc.auth.sendSms.useMutation({
    onSuccess: async () =>{
    
    toast.success('Message Sent successfully'),
    router.push('/')
},
onError: (err) => {
    if(err.data?.code === "UNAUTHORIZED"){
        toast.error('Problem Messaging')
        }
    },
 })
 const onSubmit = ({
        phoneNumber,
        message,
        } : XSendSmsValidator) => {
            SendSms({
                phoneNumber,
                message,
            })
 }
  return (
    <div>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-2xl font-bold">
          CarManagys{' '}
          <a className="text-blue-600" href="https://nextjs.org">
            SMS-SENDER
          </a>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='phoneNumber'>Tel</Label>
                  <Input
                    {...register('phoneNumber')}
                    
                    placeholder='+21699887766'
                  />
                </div>

                <div className='grid gap-1 py-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Input
                    {...register('message')}
                    
                    
                  />
                  
                </div>

                <Button disabled={isLoading}>
                  {isLoading 
                  &&
                   (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin'
                     />
                  )
                  }
                  Envoyer
                </Button>
              </div>
            </form>
      </main>
    </div>
  );
};

export default SendSmsPage;