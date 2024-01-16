import { LucideProps } from "lucide-react";
import Image from "next/image";

export const Icons = {
    logo: (props: LucideProps) => (
        <Image src="/nav/logo.png" width={100} height={100} alt="this is a logo"/>
    )
}