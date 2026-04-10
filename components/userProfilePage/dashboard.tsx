import { AArrowUp, ArrowBigUpDash, BadgePoundSterlingIcon, ChartAreaIcon, ChartBarIncreasingIcon, EyeIcon, LucideRocket, LucideTrendingUp, LucideVote, MedalIcon, NetworkIcon, NotebookIcon, NotebookPenIcon, NotepadTextDashed, PersonStandingIcon, RocketIcon, ScanFaceIcon, TrendingUp, TrophyIcon, UploadCloudIcon, User2Icon, UserCheck2Icon, UserCircle2Icon, VoteIcon } from "lucide-react";
import { title } from "process";

const overviewData = [
    {
        icon: <UserCircle2Icon className="size-8 text-blue-400"/>,
        title:"Total Visits",
        value: "24k",
    },
    {
        icon: <UploadCloudIcon className="size-8 text-gray-500" />,
        title:"Public Posts",
        value: "10"
    },
    {
        icon: <TrophyIcon className="size-8 text-yellow-400" />,
        title:"Total Votes",
        value: "584"
    }
];



const userProjects = await fetch("/api/usertopprojects").then((res) => (res.json()))

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 pb-4 mb-8 pt-2 bg-[#e9e9e9] text-black">

            <section
                id="overview"
                className="lg:col-span-3 border-2 border-black bg-gray-900/10 rounded-xl p-4 pb-12"
            >
                <h1 className="flex items-center gap-2 text-xl font-sans font-medium mb-4 text-black w-full pr-2 pl-2 pt-1 pb-1  rounded ">
                    Overview
                    <ChartBarIncreasingIcon className="w-5 h-5 text-black" />
                    <div className="border-2 flex-1 ml-1 border-black"></div>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-3">
                    {overviewData.map((obj) => (
                        <div
                            key={obj.title}
                            className="flex flex-col justify-between items-center p-4  rounded-2xl min-h-[120px] bg-white text-black  border-2 border-black  hover:scale-[1.04] transition ease-in-out"
                        >
                            <div className="flex items-center gap-2">
                                {obj.icon}
                                <h2 className="text-2xl font-medium">{obj.title}</h2>
                            </div>

                            <div className="text-2xl font-medium font-sans mb-2">
                                {obj.value}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TOP PROJECTS */}
            <section
                id="top_projects"
                className="border-2 border-black rounded-xl p-4 bg-gray-900/10 "
            >
                <h1 className=" flex  gap-2 items-center text-xl mb-2 font-sans text-center text-black font-medium rounded">
                    Most Votes <NetworkIcon />
                </h1>
                <div className="border-2 mb-5 mt-3 border-black opacity-75 flex-1"></div>
                

                {/* <div className="flex justify-between font-sans px-2 mb-2 text-lg ">
                    <span className="flex gap-1 items-center bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl ml-3"> <RocketIcon/> Project</span>
                    <span className="flex gap-1 items-center bg-black text-white pt-1 pb-1 pl-2 pr-2 rounded-xl mr-2"> <VoteIcon/> Votes</span>
                </div> */}

                <div className="flex flex-col gap-2 ">
                    {userProjects.map((obj:any , index:any) => (
                        <div
                            key={obj.title}
                            className="flex justify-between items-center w-full px-3 py-2 font-medium text-lg rounded-md bg-white text-black hover:scale-[1.02] transition ease-in-out border-2 border-black"
                        >
                            <div className="flex gap-3 ml-3">
                            <span className="font-lg text-lg">{index + 1}.</span>
                            <span>{obj.title}</span>
                            </div>
                            <span className="flex gap-2 mr-1 items-center ">{obj.votes} <TrendingUp className="text-green-600"/></span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )

}