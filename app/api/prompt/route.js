import { connectDb } from "@utils/database"
import Prompt from "@models/prompt";

export const GET = async (req) =>{
    try {

        await connectDb();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts) , {status:201}) 
    } catch(err) {
        console.log(err.message);
        return new Response("error at server in response" , {status:500})
    }
}