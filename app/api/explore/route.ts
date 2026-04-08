import { pool } from "@/db/connection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const filterBy = await req.text()
    //All Filter query
    try {
        if (filterBy === "All") {
            const top10 = await pool.query(`
            select u.name , p.title , p.votes , p.soln ,p.id , p.badges , p.screenshots_url, p.category from projects p
            join users u on u.email=p.username
            order by RANDOM() limit 10;
            `)
            console.log(top10)
            return new Response(JSON.stringify(top10.rows))
        }

        const top3 = await pool.query(`
            select u.name , p.title , p.votes , p.soln ,p.id , p.badges , p.screenshots_url, p.category from projects p
            join users u on u.email=p.username
            where p.category=$1
            order by RANDOM() limit 10;
            ` , [filterBy])
        console.log(filterBy)
        return new Response(JSON.stringify(top3.rows))


    }
    catch (err) {
        console.log(err)
    }
}
