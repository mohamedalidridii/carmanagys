"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button, buttonVariants } from "@/components/ui/button"
import { User, Product } from "@/cms-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const QrCodeGenerator = () => {
  //QRCode functionality
  const [src, setsrc] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const qrCodeRef = useRef<HTMLImageElement>(null);

  const generate = () => {
    const qrurl = `https://api.qrserver.com/v1/create-qr-code/?size=84x84&data=${process.env.NEXT_PUBLIC_SERVER_URL}/user/${username}`
    setsrc(qrurl)
    return 
  }
  const printQrCode = () => {
    if (qrCodeRef.current) {
      const qrCodeWindow = window.open("", "_blank");
      qrCodeWindow?.document.write(`<img src="${qrCodeRef.current.src}" />`);
      qrCodeWindow?.document.close();
      qrCodeWindow?.print();
    }
  };
  return (
    <div className="grid gap-6">
      <div>
      <Label>Chercher un client:</Label>
      <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Id Client" /></div>
      <Button  onClick={generate} variant="ghost">
        Générer QRCode
      </Button>
      <Image src={src} alt="this is a qrcode" width={200} height={200} />
    </div>
  )
}

export default QrCodeGenerator