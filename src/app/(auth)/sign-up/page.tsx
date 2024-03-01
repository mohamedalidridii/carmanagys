"use client"

import { Icons } from "@/componenets/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { AuthSignupValidator, TAuthCredentialsValidator, mappedCarList, mappedCarburant } from "@/lib/validators/account-credentials-validator"
import { trpc } from "@/trpc/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from "zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CARS_LIST } from "@/config"
import Image from "next/image"
import React, { useState } from 'react';

interface Car {
    brand: string;
}




const Page = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthSignupValidator),
    })

    const router = useRouter()

    const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if (err.data?.code === "CONFLICT") {
                toast.error("this email is already in use. sign in instead?")
            }
            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)

                return
            }

            toast.error('something went wrong. Please Try again.')
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(`Verification email sent to ${sentToEmail}.`)
            router.push('/verify-client?to=' + sentToEmail)
        }
    })
    const onSubmit = ({
        email,
        password, nom, prenom, tel, matricule, marque, type, carburant, kilometrage, lubrifiantMoteur, DateDeMiseEnCirculation, DateVisiteTechnique, DateValiditeAssurance,
    }: TAuthCredentialsValidator) => {
        mutate({
            email,
            password, nom, prenom, tel, matricule, marque, type, carburant, kilometrage, lubrifiantMoteur, DateDeMiseEnCirculation, DateVisiteTechnique, DateValiditeAssurance,
        })
    }
    const optionsCarList = Object.entries(mappedCarList).map(
        ([value, label]) => {
            <option value={value} key={value}>{label}</option>
        }
    )

    return <>
        <div className="container relative flex pt-5 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Image src="/nav/logo.png" width={200} height={200} alt="this is an image" />
                    <h1 className="text-2xl font-bold">Créer un compte</h1>
                    <Link className={buttonVariants({
                        variant: 'link',
                        className: 'gap-1.5'
                    })} href='/sign-in'>Avez-vous déjà un compte ? Connectez-vous. <ArrowRight className="h-4 w-4" /></Link>
                </div>

                <div className="grid gap-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="email">Email</Label>
                                    <Label htmlFor="email">/البريد الإلكتروني</Label>
                                </div>
                                <Input
                                    {...register('email')}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.email,
                                    })}
                                    placeholder="vous@example.com"
                                />
                                {errors?.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="nom">Nom</Label>
                                        <Label htmlFor="nom">/اللقب</Label>
                                    </div>
                                    <Input {...register("nom")}
                                        className={cn({
                                            "focus-visible:ring-red-500": true
                                        })}
                                        placeholder="Nom"
                                    /></div>
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="prenom">Prenom</Label>
                                        <Label htmlFor="prenom">/الاسم</Label>
                                    </div>
                                    <Input {...register("prenom")}
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.prenom,
                                        })}
                                        placeholder="Prenom"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="tel">Numero de telephone</Label>
                                    <Label htmlFor="tel">/رقم الهاتف</Label>
                                </div>
                                <Input {...register("tel")} className={cn({
                                    "focus-visible:ring-red-500": errors.tel
                                })}
                                    placeholder="Numero Tel"
                                />
                            </div>
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="matricule">Immatriculation</Label>
                                    <Label htmlFor="matricule">/التسجيل</Label>
                                </div>
                                <Input {...register("matricule")}
                                    className={cn({
                                        "focus-visible:ring-red-500": errors.matricule
                                    })}
                                    placeholder="Immatriculation"
                                />
                            </div>
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="marque">Marque</Label>
                                    <Label htmlFor="marque">/العلامة التجارية</Label>
                                </div>
                                <select {...register('marque')}>
                                    {Object.entries(mappedCarList).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>

                                <div className="py-2 hidden">
                                    <Label htmlFor="points">Points</Label>
                                    <Input
                                        className={cn({
                                            "focus-visible:ring-red-500": false
                                        })}
                                        placeholder="points"
                                    />
                                </div>
                            </div>
                            <div className="grid gap-1 py-2">
                                <div className="flex ">
                                    <Label htmlFor="type">Type</Label>
                                    <Label htmlFor="type">/النوع</Label>
                                </div>
                                <div className="flex ">
                                    <Input {...register("type")}
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.type
                                        })}
                                        placeholder="type"
                                    />
                                </div>
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="carburant">Carburant</Label>
                                        <Label htmlFor="carburant">/نوع الوقود</Label>
                                    </div>
                                    <select {...register('carburant')}>
                                        {Object.entries(mappedCarburant).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>

                                </div>
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="kilometrage">Kilometrage</Label>
                                        <Label htmlFor="kilometrage">/الكيلومترات</Label>
                                    </div>
                                    <Input {...register("kilometrage")}
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.kilometrage
                                        })}
                                        placeholder="kilometrage"
                                    />
                                    <div className="grid gap-1 py-2">
                                        <div className="flex ">
                                            <Label htmlFor="lubrifiantMoteur">lubrifiant moteur préconisé</Label>
                                            <Label htmlFor="lubrifiantMoteur">/الزيت الموصى به للمحرك</Label>
                                        </div>
                                        <Input {...register("lubrifiantMoteur")}
                                            className={cn({
                                                "focus-visible:ring-red-500": errors.lubrifiantMoteur
                                            })}
                                            placeholder="Lubrifiant Moteur"
                                        />
                                    </div>
                                    <div className="grid gap-1 py-2">
                                        <div className="flex ">
                                            <Label htmlFor="DateDeMiseEnCirculation">Date de mise en circulation</Label>
                                            <Label htmlFor="DateDeMiseEnCirculation">/تاريخ التداول</Label>
                                        </div>
                                        <input {...register("DateDeMiseEnCirculation")} type="date" id="DateDeMiseEnCirculation"
                                            className={cn({
                                                "focus-visible:ring-red-500": errors.DateDeMiseEnCirculation
                                            })}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-2">
                                        <div className="flex ">
                                            <Label htmlFor="DateVisiteTechnique">Date visite technique</Label>
                                            <Label htmlFor="DateVisiteTechnique">/تاريخ الزيارة الفنية</Label>
                                        </div>
                                        <input {...register("DateVisiteTechnique")} type="date" id='DateVisiteTechnique'
                                            className={cn({
                                                "focus-visible:ring-red-500": errors.DateVisiteTechnique
                                            })}
                                        />
                                    </div>
                                    <div className="grid gap-1 py-2">
                                        <div className="flex">
                                            <Label htmlFor="DateValiditeAssurance">Date validité assurance</Label>
                                            <Label htmlFor="DateValiditeAssurance">/تاريخ صلاحية التأمين</Label>
                                        </div>
                                        <input {...register("DateValiditeAssurance")} type="date" id='DateValiditeAssurance'
                                            className={cn({
                                                "focus-visible:ring-red-500": errors.DateValiditeAssurance
                                            })}
                                        />
                                    </div>
                                </div>
                                {/* <div className="grid gap-1 py-2">
                                <Label htmlFor="Image">
                                    Choisir 3 images de votre véhicule
                                    <Input

                                        type="file"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.selectedImages
                                        })}
                                        accept="image/*" multiple id="carImage"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const filesIterator = e.target?.files?.[Symbol.iterator]();
                                          
                                            if (filesIterator) {
                                              const newImages = [...selectedImages, ...filesIterator];
                                              if (newImages.length > 3) {
                                                alert('You can upload a maximum of 3 images.');
                                                return;
                                              }
                                              setSelectedImages(newImages);
                                            }
                                          }} />
                                </Label>
                            </div>
                            {selectedImages.map((image: File, index: number) => (
                                <div key={index} className="preview">
                                    <img src={URL.createObjectURL(image)} alt={`Selected Image ${index + 1}`} />
                                </div>
                            ))} */}
                                <div className="grid gap-1 py-2">
                                    <div className="flex ">
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <Label htmlFor="password">/كلمة السر</Label>
                                    </div>
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        className={cn({
                                            "focus-visible:ring-red-500": errors.password
                                        })}
                                        placeholder="Mot de passe"
                                    />


                                    {errors?.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>)}
                                </div>
                                <Button>Créer</Button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    </>
}
export default Page