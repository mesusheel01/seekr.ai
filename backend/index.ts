import express from 'express'
import dotenv from 'dotenv'
import { getAiResponse } from './aiFunction';
import { promptTemplate, systemPrompt, webSearchingAgent } from './prompt';
dotenv.config()


const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("listening")
});

app.post("/ask", async (req, res) => {
    const userQuery = req.body["query"]


    // get the web search results
    const webSearchResults = await getAiResponse(userQuery, webSearchingAgent)
    console.log(webSearchResults)
    // hit the llm and seek back the respone of the web search results
    const prompt = promptTemplate
        .replace("{{WEB_SEARCH_RESULTS}}", JSON.stringify(webSearchResults))
        .replace("{{USER_QUERY}}", userQuery)

    const llmResponse = await getAiResponse(prompt, systemPrompt)

    res.write("\n--------------------Sources-----------------------\n")

    // webSearchResults?.forEach(result => {
    //     res.write(`${result.url}\n`)
    // })
    // console.log(llmResponse)
    // res.json({ response: llmResponse })
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

