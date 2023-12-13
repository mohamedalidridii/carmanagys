"use client"

import { useState } from "react"
import Image from "next/image"
import {Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,} from '@/components/ui/dialog'
import { Button, buttonVariants } from "@/components/ui/button"
import { User, Product } from "@/cms-types"

const QrCodeButton = ({user}: {user: User}) => {
  //QRCode functionality
  const [src, setsrc] = useState<string>('')

const generate = () =>{
  const qrurl =`https://api.qrserver.com/v1/create-qr-code/?size=84x84&data=${user.id}`
  setsrc(qrurl)
} 

 return (
  <Dialog >
    <DialogTrigger asChild>
      <Button className="w-full" onClick={generate}>
        Votre QRCode
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] justify-center flex flex-col">
      <DialogHeader>
        <DialogTitle>Scan Qr Code</DialogTitle>
        <Image src={src} alt="this is qrcode" width={100} height={100} />
      </DialogHeader>
    </DialogContent>
  </Dialog>
)}

export default QrCodeButton