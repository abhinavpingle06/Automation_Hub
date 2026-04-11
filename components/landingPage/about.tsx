import { AtomIcon, GemIcon, LucideArrowBigUpDash, TvIcon } from "lucide-react";
import Fadein from "../ui/fadein";

export default function About() {
    return (
        <div className="bg-black/95 pb-6 text-white">
            <div className="border-3 border-gray-300 flex flex-1 mx-40 rounded-2xl"></div>
            <Fadein>
            <p className="flex text-center justify-center font-bold text-4xl pt-6 gap-2 pb-4 "> <AtomIcon className="-translate-y-[-5px] size-9"/>About iBuiltThis </p>
            <div className="text-center font-extralight text-sm lg:text-lg space-y-5 pl-20 pr-20 ">
               <p>iBuiltThis is a community-driven app where creators share what they’re building—big or small. From side projects and startups to experiments, prototypes, and passion projects, iBuiltThis is a place to show your work, learn from others, and get inspired.</p>

                <p>This platform is a personal learning project built to explore how developers present their work beyond resumes. The goal is to experiment with structured project storytelling — focusing on problems, technical decisions, and trade-offs — to improve how projects are discussed during interviews.</p>

                <p>This website is a learning project created to practice full-stack development and product design.</p>
            </div>
            </Fadein>
        </div>
    )
}