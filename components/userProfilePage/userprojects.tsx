"use client"

import { BinaryIcon, Cross, Delete, DeleteIcon, Disc, Edit, Edit2Icon, Eraser, Heart, HeartMinus, LucideDelete, MessageSquareCode, Paperclip, RemoveFormatting } from "lucide-react";
import { useEffect, useState } from "react";
import UserProjectsSkeleton from "./userprojectsskeleton";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { createPortal } from "react-dom";

export default function UserProjects() {
    const [automations, setAutomations] = useState<any[] | null>(null)
    const [selectedPost, setSelectedPost] = useState(0)
    const [viewComment, setViewComment] = useState(false)
    const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
    const [copy, setCopy] = useState(false)

    useEffect(() => {
        async function hey() {
            try {
                await fetch(`/api/usertopprojects`, { next: { revalidate: 120 } })
                    .then(res => res.json())
                    .then(data => setAutomations(data));
            } catch (error) {
                console.log(error)
            }
        }
        hey();
    }, [])

    const handelComments = (post_id: any) => {
        setViewComment(!viewComment)
        return (
            setSelectedPost(post_id)
        )
    }

    useEffect(() => {
        async function fetchLikes() {
            const res = await fetch("/api/likes");
            const data = await res.json(); // {1:true, 2:true}

            setLikedPosts(data);
        }

        fetchLikes();
    }, []);

    //Onclick action for votes
    const handelVotes = async (post_id: number) => {
        const alreadyLiked = likedPosts[post_id] ?? false;

        // 🔥 Optimistic UI
        setLikedPosts(prev => ({
            ...prev,
            [post_id]: !alreadyLiked
        }));

        setAutomations(prev => prev!.map((ele) =>
            ele.id === post_id
                ? {
                    ...ele,
                    votes: alreadyLiked ? ele.votes - 1 : ele.votes + 1
                }
                : ele
        ));

        const res = await fetch("/api/likes", {
            method: "POST",
            body: JSON.stringify({ post_id })
        });

        const data = await res.json();

        // ❌ rollback if API failed
        if (!data.ok) {
            setLikedPosts(prev => ({
                ...prev,
                [post_id]: alreadyLiked
            }));
            return;
        }

        // ✅ sync with backend truth (VERY IMPORTANT)
        setLikedPosts(prev => ({
            ...prev,
            [post_id]: data.liked
        }));
    };

    //onclick handel delete of posts
    const handelPostDelete = async (post_id:number) => {
        const data = await fetch("/api/likes",{
            method:"DELETE",
            body:JSON.stringify({post_id})
        }).then((res)=>res.json())

        alert("Successfully Deleted, Refresh The Page")
    }

    //Onclick handel for copy workflow
    const handelCopy = async(code:any) => {
        try {
            const text =
                typeof code === "string"
                    ? code
                    : JSON.stringify(code, null, 2);

            await navigator.clipboard.writeText(text);

            setCopy(true);
            setTimeout(() => setCopy(false), 2000);
        } catch (err) {
            console.error("Copy failed", err);
        }
    }

    if (!automations) {
        return <UserProjectsSkeleton />;
    }
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-6">
                {
                    automations.length == 0 &&
                    <h1 className="flex justify-center text-xl p-3 text-gray-400"> No projects yet published...</h1>
                }
                {automations.length > 0 && automations.map((obj: any) => (
                    <div
                        key={obj.id}
                        className="flex flex-col h-full bg-gray-900/40 backdrop-blur-xl p-5 border border-gray-800/50 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.02] transition-all duration-300 ease-in-out rounded-2xl overflow-hidden group"
                    >
                        {/* Image Container */}
                        <Zoom>
                            <div className="relative w-full aspect-video bg-gray-800/50 rounded-xl overflow-hidden mb-4">
                                <img
                                    src={obj.screenshots_url[0]}
                                    alt={obj.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Overlay gradient */}
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                            </div>
                        </Zoom>

                        {/* Content Container */}
                        <div className="flex flex-col flex-grow space-y-4">
                            {/* Title */}
                            <h3 className="font-semibold text-3xl text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                                {obj.problem_stat}
                            </h3>

                            {/* Description */}
                            <p className="text-sm sm:text-base text-gray-400 mb-4 line-clamp-2">
                                {obj.soln}
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span
                                    className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs sm:text-sm rounded-full whitespace-nowrap shadow-md shadow-red-500/30"
                                >
                                    n8n
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-800/50">
                                {/* Left Actions */}
                                <div className="flex items-center gap-2 sm:gap-3">
                                    {/* Votes Button */}
                                    <button
                                        onClick={() => handelVotes(obj.id)}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${likedPosts[obj.id]
                                                ? "text-green-500"
                                                : "text-white"
                                            }`}
                                    >
                                        <span className="text-lg">
                                            {likedPosts[obj.id] ? <Heart/>: <HeartMinus/>}
                                        </span>
                                        <span>{obj.votes}</span>
                                    </button>

                                    
                                    {/* <button className="cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 rounded-xl text-white  hover:bg-gray-700/60  hover:border-blue-500/30 transition-all duration-200 backdrop-blur-sm">
                                      <Edit className="size-4 sm:size-5" />
                                      <span className="hidden sm:inline text-sm sm:text-base">Edit</span>
                                      {/* <span className="sm:hidden text-sm">💬</span> */}
                                    {/* </button>  */}

                                    <button onClick={() => { handelPostDelete(obj.id) }} className="cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 rounded-xl text-white hover:bg-red-600/80  hover:border-blue-500/30 transition-all duration-200 backdrop-blur-sm">
                                        <Disc className="size-4 sm:size-5" />
                                        <span className="hidden sm:inline text-sm sm:text-base">Delete</span>
                                        {/* <span className="sm:hidden text-sm">💬</span> */}
                                    </button>
                                </div>

                                {/* Copy Workflow Button */}
                                <button onClick={() =>{ handelCopy(obj.json_code)}} className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-200 whitespace-nowrap hover:shadow-blue-500/50 hover:scale-105">
                                    Copy Workflow
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
                {copy && 
                createPortal(
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                        <div className="bg-black/90 text-white text-sm px-4 py-2 rounded-lg shadow-xl animate-fade-in-out backdrop-blur-md">
                            Copied to clipboard 🚀
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    )
}