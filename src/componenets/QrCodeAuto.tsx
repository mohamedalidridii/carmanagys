"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { User, Product } from "@/cms-types"

const QrCodeAuto = ({user}: {user: User}) => {
  //QRCode functionality
  const [src, setsrc] = useState<string>('');

  useEffect(() => {
    const generateQRCode = () => {
      const qrurl = `https://api.qrserver.com/v1/create-qr-code/?size=84x84&data=${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user.id}`;
      setsrc(qrurl);
    };

    generateQRCode();
  }, [user.id]);

  return (
    <div>
      <Image src={src} alt="this is qrcode" width={200} height={200} />
    </div>
  );
};

export default QrCodeAuto;