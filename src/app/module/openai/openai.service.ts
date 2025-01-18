import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load API key from environment variables
});

  const model = "gpt-4o-mini"


async function createAssistant() {
    

  return await openai.beta.assistants.create({
    name: "finupsBD",
    instructions: "You are a personal advisor about loan, cards include anything. Write and run code to answer math questions.",
    tools: [{ type: "code_interpreter" }],
    model: model
  });
}

async function interactWithAssistant(assistantId: string, message: string) {
  return await openai.chat.completions.create({
    model: model,
    messages: [{ role: "user", content: message }],
  });
}


export const OpenaiServices = {
  createAssistant, 
  interactWithAssistant
}