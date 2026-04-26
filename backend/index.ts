import express from 'express'
import dotenv from 'dotenv'

import { getAiResponse } from './aiFunction';
import { promptTemplate, systemPrompt, webSearchingAgent } from './prompt';
import { tavily } from '@tavily/core';
dotenv.config()


const client = tavily({
    apiKey: process.env.TAVILY_API_KEY!
})

const app = express()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("listening")
});

app.post("/ask", async (req, res) => {
    const userQuery = req.body["query"]


    // get the web search results
    const webRes = await client.search(userQuery, {
        searchDepth: 'advanced'
    })

    const webSearchResult = webRes.results;
    // -> need to know how to get web search resulte
    console.log(webSearchResult)
    // hit the llm and seek back the respone of the web search results
    const prompt = promptTemplate
        .replace("{{WEB_SEARCH_RESULTS}}", JSON.stringify(webSearchResult))
        .replace("{{USER_QUERY}}", userQuery)
    console.log("REached above getairesponse!")
    const llmResponse = await getAiResponse(prompt)
    res.write("\n--------------------Sources-----------------------\n")

    webSearchResult?.forEach(result => {
        res.write(JSON.stringify(result))
    })
    console.log(llmResponse)
    res.end()
})



app.listen(3000, () => {
    console.log("listening on port 3000")
})

