import { pool } from "@/db/connection"
import { VerifyToken } from "@/lib/verify"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { post_id } = await req.json();

    const token = req.cookies.get("iBuildThis")?.value;
    const data = await VerifyToken(token);
    const email = data.email;

    const user = await pool.query(
        `SELECT id FROM users WHERE email=$1`,
        [email]
    );

    const user_id = user.rows[0]?.id;

    if (!user_id) {
        return NextResponse.json({ ok: false, error: "User not found" });
    }

    await pool.query("BEGIN");

    try {
        // 🔥 TRY TO INSERT (LIKE)
        const insert = await pool.query(
            `INSERT INTO likes (user_id, post_id) 
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING
         RETURNING *`,
            [user_id, post_id]
        );

        if (insert.rowCount! > 0) {
            // ✅ LIKE happened
            await pool.query(
                `UPDATE projects 
             SET votes = votes + 1 
             WHERE id=$1`,
                [post_id]
            );

            await pool.query("COMMIT");
            return NextResponse.json({ ok: true, liked: true });
        }

        // 🔥 IF INSERT FAILED → UNLIKE
        const del = await pool.query(
            `DELETE FROM likes 
         WHERE user_id=$1 AND post_id=$2
         RETURNING *`,
            [user_id, post_id]
        );

        if (del.rowCount! > 0) {
            await pool.query(
                `UPDATE projects 
             SET votes = GREATEST(votes - 1, 0) 
             WHERE id=$1`,
                [post_id]
            );
        }

        await pool.query("COMMIT");
        return NextResponse.json({ ok: true, liked: false });

    } catch (err) {
        await pool.query("ROLLBACK");
        return NextResponse.json({ ok: false });
    }
}

export async function GET(req:NextRequest) {
    const token = req.cookies.get("iBuildThis")?.value || null
    if (token === null) return NextResponse.json({"ok":false});
    const data = await VerifyToken(token)
    const email = data.email 

    const result = await pool.query(
        `SELECT post_id FROM likes WHERE user_id = (
        select id from users where email=$1
        )`,
        [email]
    );

    // return as object (best for frontend)
    const likedMap: Record<number, boolean> = {};

    result.rows.forEach((row: any) => {
        likedMap[row.post_id] = true;
    });

    return NextResponse.json(likedMap);
}

export async function DELETE(req:NextRequest){
    const { post_id } = await req.json();
    const res = await pool.query(
        `delete FROM projects WHERE id=$1`,
        [post_id]
    );

    return NextResponse.json({"ok":true})
}