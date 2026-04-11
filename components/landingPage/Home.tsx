import { ChessRookIcon, EyeIcon, LucideIcon, MoveRightIcon, SparkleIcon, WholeWordIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import Link from "next/link"
import { RocketIcon, UserIcon } from "lucide-react";
import StatsCard from "./stats-card";
import Feature from "./feature";
import About from "./about";
import Header from "./header";
import Footer from "./footer";
import Typinganimation from "./typing-animation";

interface statsprops {
    icon:LucideIcon;
    data:string;
    info:string;
    isMid?:boolean;
}

function HomePage() {

    const stats:statsprops[] = [
        {
            icon: RocketIcon,
            data: "2.5K+",
            info: "Projects Shared"
        },
        {
            icon: UserIcon ,
            data: "8.5K+",
            info: "Strong Community" ,
            isMid: true
        },
        {
            icon: EyeIcon,
            data: "20K+",
            info: "Monthly Visits"
        }
    ]

    return (
        <main>
            <Header/>
            <div className="flex flex-col text-center justify-center items-center sm:pl-10 sm:pr-10 px-6 w-screen space-y-8  bg-[url('/landingpageBG.jpeg')] bg-cover">
                <Badge asChild variant={"outline"} className="py-1 px-8 mt-5 bg-[#f7f7f7] font-sm lg:text-lg">
                    <Link href="/"> 
                        <span className="relative flex size-2 mr-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-red-600"></span>
                        </span>
                        <h1 className="flex text-center items-center gap-1">Join us with the aim towards Growth<ChessRookIcon size={18}/>!!</h1>
                    </Link>
                </Badge>
                <div className=" lg:pt-10 font-medium ">
                    <Typinganimation/>
                    <p className="pt-4 lg:pt-10 lg:text-4xl font-lgstroke-2">GitHub is for developers.
                    <span className="font-extrabold"> iBuiltThis</span> is for showing projects to humans.</p>
                    <p className="pt-2 lg:pt-3 text-[0.6rem] lg:text-[1.125rem] text-gray-500">A community driven platform to upload Projects & explore others ideas</p>
                </div>
                <div className="flex flex-row justify-evenly sm:flex-row gap-3 sm:gap-4 lg:gap-6 w-full max-w-md sm:max-w-none sm:w-auto mt-2 lg:mt-6">
                    <Button className="hover:scale-105 transition-transform w-fit sm:w-auto px-2 py-2 sm:py-4 text-xs sm:text-base">
                        <Link
                            href="/signup"
                            className="flex gap-2 items-center justify-center"
                        >
                            <SparkleIcon className="size-3 lg:size-5 text-[#81fa78] shrink-0" />
                            <span>Share your projects</span>
                        </Link>
                    </Button>

                    <Button className="hover:scale-105 transition-transform w-fit sm:w-auto px-2 py-2 sm:py-4 text-xs sm:text-base">
                        <Link
                            href="/explore"
                            className="flex gap-2 items-center justify-center"
                        >
                            <span>Explore Our Community</span>
                            <MoveRightIcon className="size-3 lg:size-5 text-[#81fa78] shrink-0" />
                        </Link>
                    </Button>
                </div>

                {/* Stats Cards */}
                <section id="statsCard" className="w-full max-w-3xl pt-2 pb-2 lg:pt-8 lg:pb-10 sm:pt-10">
                    <div className="grid grid-cols-3 items-center divide-x-2 divide-gray-300">
                        {stats.map((obj: statsprops) => (
                            <div
                                key={obj.info}
                                className="flex items-center justify-center px-2 sm:px-4"
                            >
                                <StatsCard
                                    icon={obj.icon}
                                    data={obj.data}
                                    info={obj.info}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <Feature />
            <About />
            <Footer/>
        </main>

    )
}

export default HomePage 