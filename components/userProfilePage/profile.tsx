"use client";

import { useEffect, useState } from "react";
import { Globe, Github, Linkedin, GlobeIcon, LinkedinIcon, GithubIcon } from "lucide-react";
import { VerifyToken } from "@/lib/verify";


export default function Profile() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user data only once when component mounts
        const fetchUserData = async () => {
            try {
                // Replace this with your actual API endpoint
                const response = await fetch(`/api/userprojects`, {
                    credentials: "include"
                });
                const userInfo = await response.json();
                setUserData(userInfo[0]);
                console.log("Completed")

            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const user = {
        name: userData?.name,
        username: userData?.email,
        bio: userData?.bio || "",
        avatar: userData?.avatar || "👨‍💻",
        socialLinks: userData?.socials || ["", "", ""]
    };

    // const getIcon = (iconName: string) => {
    //     switch (iconName) {
    //         case "Globe":
    //             return <Globe className="size-4 sm:size-5" />;
    //         case "Github":
    //             return <Github className="size-4 sm:size-5" />;
    //         case "Linkedin":
    //             return <Linkedin className="size-4 sm:size-5" />;
    //         default:
    //             return null;
    //     }
    // };

    if (loading) {
        // Loading skeleton
        return (
            <div className="rounded-2xl p-6 sm:p-8 mb-6 shadow-lg animate-pulse">
                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-700/50 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 w-full">
                        <div className="h-8 bg-gray-700/50 mb-2"></div>
                        <div className="h-4 bg-gray-700/50  mb-3"></div>
                        <div className="h-4 bg-gray-700/50 w-full mb-2"></div>
                        <div className="h-4 bg-gray-700/50 "></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="rounded-2xl p-6 sm:p-8 hover:border-gray-600 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
                
                {/* User Info */}
                <div className="flex-1 w-full min-w-0">
                    {/* Name */}
                    <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-1 break-words text-white">
                        {user.name}
                    </h1>

                    {/* Username */}
                    <p className="text-sm sm:text-base text-gray-400 mb-3">
                        {user.username}
                    </p>

                    {/* Bio */}
                    <p className="text-sm sm:text-base lg:text-xl text-gray-300  break-words leading-relaxed">
                       {user.bio}
                    </p>

                    {/* Social Links
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {user.socialLinks.map((link: any, index: number) => (
                            <a
                                key={index}
                                href={link.startsWith("") ? "Not Found" : link.startsWith('http') ? link : `https://${link}` }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2.5 text-sm sm:text-base text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 rounded-xl transition-all duration-200 group backdrop-blur-sm"
                            >
                                {
                                    index==0 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <Globe className="size-4 sm:size-5" />
                                    </span>
                                }
                                {
                                    index == 1 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <LinkedinIcon className="size-4 sm:size-5" />
                                    </span>
                                }
                                {
                                    index == 2 &&
                                    <span className="group-hover:scale-110 transition-transform">
                                        <GithubIcon className="size-4 sm:size-5" />
                                    </span>
                                }

                                <span className="hover:underline truncate max-w-[150px] sm:max-w-none">
                                    {link}
                                </span>
                            </a>
                        ))} */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}