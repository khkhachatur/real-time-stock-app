import Link from "next/link"
import Image from "next/image"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/better-auth/auth"


const layout = async ({children}: {children: React.ReactNode}) => {

        const session = await auth.api.getSession({headers: await headers()})

        if(session?.user) redirect('/')


  return (
    <main className="auth-layout">
        <section className="auth-left-section scrollbar-hide-default">
            <Link href='/' className='auth-logo'>
            <Image src='assets/images/logo.png' alt='logo' width={140} height={32} className="h-8 w-auto"/>
            </Link>

            <div className="pb-6 lg;pb-8 flex-1"> {children}</div>
        </section>
        <section className="auth-right-section">
            <div className="z-10 relative lg:mt-4 lg:mt-16">
                <blockquote className="auth-blockquote">
                Growie turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market
                </blockquote>
                <div className="flex items-center justify-between">
                <div>
                <cite className="auth-testimonial-author">-Ethan R.</cite>
                <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                </div>
                    <div className="flex items-center gap-0.5">
                        {[1,2,3,4,5].map((star)=>(
                            <Image src='assets/icons/star.svg'  alt='star' key={star} width={20} height={20} className="h-5 w-5 hover:fill-yellow-500 transition-400"/>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1 relative">
                <Image src='/assets/images/dashboard.png' alt='dashboard' width={1440} height={1115} className="auth-dashboard-preview absolute top-0"/>
            </div>
        </section>
    </main>
  )
}

export default layout