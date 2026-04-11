import { BotIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header(){
    return (
        <div className="flex justify-between w-full bg-black pt-2 pb-3 text-white items-center text-center text-sm lg:text-xl">
            <div className="flex font-bold px-3 items-center text-center">
                {/* <Image src='/globe.svg' alt="App Image" width={30} height={30} className="-translate-y-[-2px]"/> */}
                <p className="pl-0.5 pt-0.5 lg:pl-1.5 lg:pt-1.5 font-bold text-center items-center flex gap-2 "> <BotIcon size={25} className="text-center pb-1"/>Automation Hub</p>
            </div>
            <div className="flex gap-5 pr-4 pt-1 font-medium mr-2">
                <Link href={"/signup"} className="hover:underline">Sign up</Link>
                <Link href={"/login"} className="hover:underline">Login</Link>
            </div>
        </div>
    )
}