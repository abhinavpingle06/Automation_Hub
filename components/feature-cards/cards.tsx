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
            <ItemGroup className="grid grid-cols-1 lg:grid-cols-2 xlx:grid-cols-3 place-content-center px-2 lg:px-25 sm:gap-10 gap-5 ">
                {imgObj.map((obj:any,index:any) => (
                    <Item key={obj.title} variant="default" className="hover:scale-105 hover:bg-white/10 transition duration-300 ease-in-out w-auto h-auto rounded-none" >
                        <ItemHeader>
                            <Image
                                src={obj.screenshots_url[0]}
                                alt={obj.title}
                                width={500}
                                height={260}
                                className="w-full lg:h-[260px] md:h-[200px] h-[200px] w-[250px] object-cover"
                            />
                        </ItemHeader>
                        <ItemContent >
                            <div className="flex flex-row justify-between text-center">
                                <ItemTitle className="text-lg w-full flex font-bold">{obj.title}</ItemTitle>
                                <ItemFooter className="flex justify-end text-lg font-semibold items-center text-center text-green-400">
                                    {obj.votes}
                                    <TrendingUpIcon className="size-8 text-green-400" strokeWidth={2}/>
                                </ItemFooter>
                            </div>
                            
                            <ItemDescription className="pt-1 text-gray-400">{obj.soln}</ItemDescription>
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
