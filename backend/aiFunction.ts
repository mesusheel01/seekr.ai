import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { systemPrompt } from "./prompt";

const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o-mini";

export async function getAiResponse(userQuery: string) {

    const client = ModelClient(
        endpoint,
        new AzureKeyCredential(process.env.GITHUB_TOKEN!),
    );
    // console.log(process.env.GITHUB_TOKEN!)
    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userQuery }
            ],
            model: model
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    // console.log(response.body.choices[0]!.message.content);
    return response.body.choices[0]!.message.content;
}

