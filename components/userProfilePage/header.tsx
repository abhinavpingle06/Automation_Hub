"use client";

import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"

export default function Header(){
    const router = useRouter()
    const handelLogout = () => {
        fetch("/api/auth/logout", {method:"POST"})
        router.push("/")
    }
    return (
        <div className="flex justify-between items-center bg-gray-950 px-5 py-3 text-white">

            {/* Left Section */}
            <div className="flex items-center text-2xl font-bold gap-2">
                <Image src='/globe.svg' alt="App Image" width={24} height={24} />
                <p>iBuiltThis</p>
            </div>

            {/* Right Section */}
            <div className="flex gap-6">
                <Button className="text-xl bg-gray-950 hover:bg-gray-900" onClick={() => router.push("explore")}>Explore Automations </Button>
                <Button variant="destructive" onClick={() => handelLogout()}>Logout</Button>
            </div>

        </div>
    )
}