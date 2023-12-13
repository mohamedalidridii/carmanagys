import { LucideProps } from "lucide-react";
import Image from "next/image";

export const Icons = {
    logo: (props: LucideProps) => (
        <Image src="/nav/logo.png" width={70} height={70} alt="this is a logo"/>
    )
}