import { connectDb } from "@utils/database"
import Prompt from "@models/prompt";

export const POST = async ( req , res ) => {
    const {userId , prompt , tag} = await req.json();

    try {
        await connectDb();
        const newprompt = new Prompt({
            creator : userId,
            tag : tag,
            prompt:prompt
        })
        await newprompt.save();
        return new Response(JSON.stringify(newprompt) , {status:201})
    } catch(err) {
        return new Response("failed to create prompt" ,{status:500})
    }
}