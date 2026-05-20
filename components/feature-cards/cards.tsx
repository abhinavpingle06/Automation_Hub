import Image from "next/image"
// import NextNodeServer from "next/dist/server/next-server"
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    ItemHeader,
    ItemTitle,
} from "@/components/ui/item"
import { Badge } from "../ui/badge"
import { ArrowBigDownDashIcon, ArrowBigUpDashIcon, ArrowUp, ArrowUp01Icon, ArrowUpCircle, ArrowUpToLine, CarrotIcon, TrendingUpIcon } from "lucide-react"
import Fadein from "../ui/fadein"



export async function ItemHeaderDemo() {
    const imgObj = await fetch(`${process.env.PUBLIC_URL}/api/test`,{ next:{revalidate:0}}).then((res)=>res.json())
    return (
        <div className="flex mx-auto flex-col gap-6 pt-2 pb-2 ">
            <Fadein>
            <ItemGroup className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-content-center px-2 lg:px-25 sm:gap-10 gap-5 ">
                {imgObj.map((obj:any,index:any) => (
                    <Item key={obj.title} variant="default" className="hover:scale-105 hover:bg-white/10 transition duration-300 ease-in-out w-auto h-auto rounded-none border-4 border-slate-600/50" >
                        <ItemHeader className="p-0">
                            <div className="relative w-full h-[220px] bg-slate-950/5 overflow-hidden">
                                <Image
                                    src={obj.screenshots_url[0]}
                                    alt={obj.title}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </ItemHeader>
                        <ItemContent >
                            <div className="flex flex-row justify-between text-center">
                                <ItemTitle className="basis-3.5/4 min-w-0 text-lg font-bold text-left">{obj.title}</ItemTitle>
                                <ItemFooter className="basis-0.5/4 t-0 justify-end items-center text-lg font-semibold text-green-400">
                                    {obj.votes}
                                    <TrendingUpIcon className="size-6 text-green-400" />
                                </ItemFooter>
                            </div>
                            
                            <ItemDescription className="pt-1 line-clamp-2 text-gray-400">{obj.soln}</ItemDescription>
                        </ItemContent>
                    </Item>
                    
                ))}
                <div className="flex justify-center items-end pb-20">
                    <h1 className="hover:bg-white/10 transition duration-300 ease-in-out p-2 rounded-md font-semibold text-xl animate-pulse">Explore More<span className=" gap-0.5 tracking-widest">.....</span></h1>
                </div>
            </ItemGroup>
            </Fadein>
        </div>
    )
}
