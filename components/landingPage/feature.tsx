import { FeatherIcon } from "lucide-react";
import { ItemHeaderDemo } from "../feature-cards/cards";
import { Suspense } from "react";
import LPSkeleton from "./skeleton";

export default function Feature() {
    return (
            <section className="bg-black/95 lg:pb-10 text-white">
                <h1 className="p-4 lg:p-8 font-bold text-xl lg:text-4xl flex gap-2 items-center">
                    <FeatherIcon size={35} /> Weekly Top Performers 
                <div className="border-2 border-gray-300 flex flex-1 rounded-2xl text-center items-center -translate-y-[-2px]"></div>
                </h1>
                <Suspense fallback={<LPSkeleton/>}>
                    <ItemHeaderDemo />
                </Suspense>
                
            </section>
    )
}