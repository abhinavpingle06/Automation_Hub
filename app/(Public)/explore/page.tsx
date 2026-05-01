'use client'
import { useEffect, useState } from "react";
import { Search, Eye, Heart, TrendingUp, Sparkles, SearchCheck } from "lucide-react";
import { NextRequest } from "next/server";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function ExplorePage() {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [token,setToken] = useState(null)
    const [isUser,setIsUser] = useState<boolean | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                const res = await fetch("/api/explore", {
                    method: "POST",
                    body: filter
                });
                const data = await res.json();
                setProjects(data);
                const { token } = await fetch("/api/auth/token").then((res) => res.json())
                setToken(token)
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [filter]);

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handelBack = () => { token === null ? window.location.href = "/" : window.location.href = "/profile" }

    const handelLike = (id:number) => { token === null ? notAUser() : isAUser(id)}

    const notAUser = async () => {
        setIsUser(false)
        setTimeout(()=> {setIsUser(null)}, 3000 )
    }

    const isAUser = async (id:number) => {
        setIsUser(true)
        setTimeout(() => { setIsUser(null) }, 3000)
    }

    const SkeletonCard = () => (
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden p-8">
            <div className="flex flex-col lg:flex-row gap-6">

                {/* Image */}
                <Skeleton className="w-full lg:w-[40%] h-65 rounded-xl" />

                {/* Content */}
                <div className="flex-1 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />

                    <div className="flex justify-between items-center pt-4">
                        <Skeleton className="h-10 w-24 rounded-xl" />
                        <Skeleton className="h-10 w-32 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );

    const filteredProjects = projects.filter((project: any) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            project.title?.toLowerCase().includes(query) ||
            project.name?.toLowerCase().includes(query) ||
            project.soln?.toLowerCase().includes(query)
        );
    });

    return (
        <main className="min-h-screen bg-black relative overflow-x-hidden px-4 sm:px-6 lg:px-10 py-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-40 right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 right-1/3 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-end max-w-screen">
                    <Button onClick={handelBack} className="bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-200 border border-blue-700/50">Back</Button>
                </div>
                
                {isUser === false && (
                    <div className="fixed top-5 right-5 z-50">
                        <div
                            className={`
                                bg-red-500/60 text-white px-4 py-3 rounded-lg shadow-lg
                                transition-opacity duration-500
                                ${isUser === false ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
                                `}
                        >
                            ⚠️ You are not logged in
                        </div>
                    </div>
                )}
                {isUser === true && (
                    <div className="fixed top-5 right-5 z-50">
                        <div
                            className={`
                                bg-blue-500/60 text-white px-4 py-3 rounded-lg shadow-lg
                                transition-opacity duration-500 border border-slate-500
                                ${isUser === true ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}
                                `}
                        >
                            🏗️ Like feature Planned in next push!
                        </div>
                    </div>
                )}

                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent pb-3">
                            Explore Projects
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">Discover amazing automations from our community</p>
                </div>

                <div className="max-w-2xl mx-auto mb-8">
                    <div className="relative group flex">
                        {/* <SearchCheck className="absolute left-5 top-1/2 transform -translate-y-1/2 size-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" /> */}
                        <input
                            type="text"
                            placeholder="Search for projects, creators, or solutions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex justify-center gap-3 mb-10 flex-wrap">
                    {["All", "n8n", "selenium"].map((category) => (
                        <button
                            key={category}
                            onClick={() => handleFilterChange(category)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === category
                                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                                    : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 border border-slate-700/50"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                    <h1 className="text-slate-400 text-lg mt-3 tracking-widest font-bold animate-pulse ">...</h1>
                </div>

                {/* Projects List */}
                <div className="space-y-6">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
                    ) : filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-slate-500 text-xl">No projects found</p>
                        </div>
                    ) : (
                        filteredProjects.map((project: any) => (
                            <div
                                key={project.id}
                                className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/50 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Image */}
                                    
                                    <div className="lg:w-[40%] bg-slate-800/50 flex items-center justify-center p-4 lg:p-6">
                                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                                            <Zoom>
                                            <img
                                                src={project.screenshots_url[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </Zoom>
                                        </div>
                                    </div>
                                    

                                    {/* Content */}
                                    <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-100 group-hover:text-blue-400 transition-colors duration-300 mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm sm:text-base flex items-center gap-2">
                                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                        by {project.name}
                                                    </p>
                                                </div>
                                                {project.trending && (
                                                    <span className="hidden sm:flex px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-semibold rounded-full items-center gap-1.5 shadow-lg shadow-blue-500/30">
                                                        <TrendingUp className="size-3" /> Trending
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                                                {project.soln}
                                            </p>

                                            {/* Badge */}
                                            <div className="flex gap-2 mb-6">
                                                <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-500/30">
                                                    n8n
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                                            <div className="flex items-center gap-4">
                                                {/* Views */}
                                                {project.views && (
                                                    <span className="flex items-center gap-2 text-sm text-slate-400">
                                                        <Eye className="size-4" />
                                                        <span className="hidden sm:inline">{project.views}</span>
                                                    </span>
                                                )}

                                                {/* Likes */}
                                                <button onClick={() => handelLike(project.id)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-red-500/50 text-slate-400 hover:text-red-400 transition-all duration-300 group/like">
                                                    <Heart className="size-4 group-hover/like:scale-110 transition-transform" />
                                                    <span className="font-semibold">{project.votes}</span>
                                                </button>
                                            </div>

                                            {/* View Project Button */}
                                            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:via-blue-400 hover:to-cyan-400 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105">
                                                View Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}

export default ExplorePage;