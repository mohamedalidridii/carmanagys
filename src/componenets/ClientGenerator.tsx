"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

const ClientGenerator = () => {
  const router = useRouter();

  const [username, setUsername] = useState<string>('')
  const handleClick = () => {
    const hasLetters = /[a-zA-Z]/.test(username);
    if (username.trim() === "" || hasLetters) {
      alert("Veuillez saisir un ID client numérique valide. (Exemple: 59)");
    } else {
      router.push(`/print/${username}`);
    }

  }

  return (
    <div className="grid gap-6">
      <div>
        <Label>Entrer l&apos;ID client</Label>
        <Input type="text"
          value={username} onChange={(e) =>
            setUsername(e.target.value)}
          placeholder="Id Client" />
      </div>
      <div>
        <Button onClick={handleClick}>Chercher un client</Button>
      </div>
    </div>
  )
}

export default ClientGenerator