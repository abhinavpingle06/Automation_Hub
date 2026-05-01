import { AddProjectInDB } from "@/db/addproject"
import { pool } from "@/db/connection"
import { NextRequest, NextResponse } from "next/server"
import {v2 as cloudinary} from "cloudinary"
import { VerifyToken } from "@/lib/verify"

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
})

export async function GET(req:NextRequest) {
    try {
        const token = req.cookies.get("iBuildThis")?.value
        const userdata = await VerifyToken(token)
        console.log(userdata)
        const data = await pool.query(`
            Select email , name , socials , bio from users 
            where email=$1
            `,[userdata.email])

            console.log(data)

        return new Response(JSON.stringify(data.rows), { status: 200 })
    } catch (error) {
        console.log(error)
    }
}

export async function POST(req: NextRequest) {
    try {
        const { title, oneLiner, description, screenshots , code , badges} = await req.json()
        //Adding in cloudinary
        const result = await cloudinary.uploader.upload(screenshots[0], { folder:"AutomationHub"})
        // console.log(result)
        //Adding in DB
        const token = req.cookies.get("iBuildThis")?.value;
        const userinfo = await VerifyToken(token)
        await AddProjectInDB({ title: title, oneline: oneLiner, desc: description, screenshot: [result.secure_url], category: "n8n",username:userinfo.email, code: code })
        return NextResponse.json({"status":true})
    }
    catch(err){
        console.log(err)
        return NextResponse.json({"ok":false})
    }
     
}
