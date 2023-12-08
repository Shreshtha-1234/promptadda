import { connectDb } from "@utils/database"
import Prompt from "@models/prompt";

// get
export const GET = async (req, {params}) =>{
    
    try {
        await connectDb();
        const prompts = await Prompt.findById(params.id).populate('creator');
        if(!prompts)
        return new Response("Prompt not found" , {status:404}) 
        return new Response(JSON.stringify(prompts) , {status:201}) 
    } catch(err) {
        console.log(err.message);
        return new Response("error at server in prompt/id/get" , {status:500})
    }
}
// patch
export const PATCH = async (req , {params}) =>{
    const { prompt , tag } = await req.json();
    try{
        await connectDb();
        const existPrompt = await Prompt.findById(params.id);
        if(!prompt)
        return new Response("Prompt not found" , {status:404});
        existPrompt.prompt = prompt;
        existPrompt.tag = tag;
        await existPrompt.save();
        return new Response(JSON.stringify(existPrompt) , {status:200});

    } catch(err) {
        console.log("Error while updating prompt at backend -> ",err.message);
        return new Response("error at server in prompt/id/patch" , {status:500})
    }
}
// delete

export const DELETE = async (req , {params}) =>{
    try{
        await connectDb();
        await Prompt.findByIdAndDelete(params.id);
        return new Response("prompt deleted successfully", {status:200});
    } catch (err) {
        console.log("Error while deleting prompt at backend -> ",err.message);
        return new Response("error at server in response prompt/id/delete" , {status:500})
    }
}