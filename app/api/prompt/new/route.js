import Prompt  from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => {
  const { userId, tag, prompt } = await req.json();
  console.log(userId)
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });
    await newPrompt.save();

    await  newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify("Failed To create a new prompt"),{status:500})
  }
};
