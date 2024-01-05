import MaxWidthWrapper from "@/componenets/MaxWidthWrapper";

import Link from "next/link";
import { CheckCircle,} from 'lucide-react'
// import ProductReel from '@/componenets/ProductReel'
import Image from "next/image";
const perks =[
  {
    name: 'Distribution de carburant',
    Icon: CheckCircle,
    Description: "Car Managys propose une sélection complète de carburants, comprenant l'essence sans plomb, le diesel, le GPL, et d'autres options selon les besoins des conducteurs."
    
  },
  {
    name: 'Lavage de voitures',
    Icon: CheckCircle,
    Description: 'Des installations de lavage modernes permettent aux conducteurs de choisir parmi différents niveaux de nettoyage, du lavage extérieur express au lavage complet intérieur et extérieur.'
  },
  {
    name: 'Boutique de commodités',
    Icon: CheckCircle,
    Description: 'Every asset on the platform is verified by our team to ensure our highest quality standards.'
  },
  {
    name: 'For the Planet',
    Icon: CheckCircle,
    Description: "Une sélection soigneusement choisie de produits de première nécessité incluant de la nourriture, des boissons, des snacks, des journaux, ainsi qu'une gamme d'articles automobiles et d'accessoires pratiques."
  }
]

export default function Home() {
  return <>
  <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto mt-20 max-w-screen-xl text-center lg:py-10 lg:px-20">
        
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">CAR-MANAGYS</h1>
        <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Notre station Car Managys est synonyme de fiabilité et d&apos;engagement envers les conducteurs. Nous offrons une gamme complète de carburants, des installations de lavage modernes pour vos véhicules, ainsi qu&apos;une boutique proposant des produits de première nécessité et une sélection d&apos;articles automobiles pratiques.</p>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Nos services d&apos;entretien et de réparation sont assurés par des professionnels compétents, garantissant que votre véhicule reste en parfait état de fonctionnement. Nous comprenons l&apos;évolution des besoins des conducteurs, c&apos;est pourquoi nous avons intégré des points de recharge électrique pour les véhicules respectueux de l&apos;environnement.</p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
           
        </div>
        
    </div>
</section>
  <section className="bg-gray-50 dark:bg-gray-900 ">
    <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 my-auto">
        <div className="font-light text-gray-800 sm:text-lg dark:text-gray-400">
            <h2 className="mb-10 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Pourquoi Nous?</h2>
            <p className="mb-4"><span className="font-extrabold">Engagement total envers la sécurité :</span>Chez Car Managys, la sécurité est notre priorité absolue. Nous offrons bien plus qu&apos;une simple assistance en cas de panne. Notre équipe est prête à intervenir 24/7 pour garantir votre sécurité sur la route. Des services d&apos;urgence complets, un soutien routier inégalé et une assistance immédiate en cas de besoin font partie intégrante de notre engagement envers vous.</p>
            <p className="mb-4"><span className="font-extrabold">Confort et commodité à chaque arrêt :</span> Nous redéfinissons l&pos;expérience des stations-service en offrant bien plus que de simples services de ravitaillement. Des installations sanitaires impeccables, des aires de repos confortables et une gamme variée d&pos;options de restauration rapide font de chaque pause chez Car Managys un moment de confort et de détente pour les conducteurs et leurs passagers.</p>
            <p className="mb-4"><span className="font-extrabold">Innovation et durabilité :</span> Chez Car Managys, nous embrassons l&apos;avenir de la mobilité. Nous avons intégré des points de recharge électrique pour les véhicules respectueux de l&apos;environnement, témoignant de notre engagement envers la durabilité et l&apos;innovation. Nous nous efforçons constamment d&apos;intégrer les dernières avancées technologiques pour répondre aux besoins changeants des conducteurs soucieux de l&pos;environnement.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <Image width={500} height={500} className="w-full rounded-lg" src="/car1.jpg" alt="office content 1"/>
            <Image width={500} height={500} className="mt-4 w-full lg:mt-10 rounded-lg" src="/car.jpg" alt="office content 2"/>
        </div>
    </div>
  </section>
  
  <section className="bg-white dark:bg-gray-900">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 my-15">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">Gagner des points en achetant un produit</h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Inscrivez-vous dès aujourd&apos;hui et commencez à profiter de tous les avantages de notre programme de fidélité !

</p>
            <Link href="/sign-up" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white border border-gray-300 bg-blue-500 rounded-lg">
                Commencer maintenant
                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            <Link href="/sign-in" className=" mx-5 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Connexion
            </Link> 
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <Image width={500} height={500} className='rounded-lg' src="/qrcode.jpg" alt="mockup"/>
        </div>                
    </div>
</section>
<section className="bg-gray-50">
  <MaxWidthWrapper >
    <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl '>

    </div>
    {/* <ProductReel query={{sort: 'asc', limit:10}} href='/products?sort=recent'
           title="Nos Service"/> */}
  </MaxWidthWrapper>
  </section>
  <section className='border-t border-gray-200 bg-gray-50'>
    <MaxWidthWrapper className='py-20'>
      <div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
        {perks.map((perk) => (
          <div key={perk.name} className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
            <div className='md:flex-shrink-0 flex justify-center'>
              <div className='h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'>
                {<perk.Icon className='w-1/3 h1/3'/>}
              </div>
            </div>
            <div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
              <h3 className="'text-base font-medium text-gray-900">
                {perk.name}
              </h3>
              <p className='mt-3 text-sm text-muted-foreground'>
                {perk.Description}
              </p>
            </div>
          </div>
          ))}
      </div>
    </MaxWidthWrapper>
  </section>
  </>
}
