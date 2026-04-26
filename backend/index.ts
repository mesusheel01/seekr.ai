import express from 'express'
import dotenv from 'dotenv'
import { getAiResponse } from './aiFunction';
import { promptTemplate } from './prompt';
import { tavily } from '@tavily/core';
import { prisma } from './db';
dotenv.config()


const client = tavily({
    apiKey: process.env.TAVILY_API_KEY!
})

const app = express()
app.use(express.json())


app.post('/signin', async (req, res) => {

})

app.post('/signup', async (req, res) => {

})

app.get('/conversations', async (req, res) => {
    // get all the conversations of the user

})

app.get("/conversation/:conversationId", async (req, res) => {
    // get a particular conversation
})


app.post("/ask_ai", async (req, res) => {
    const userQuery = req.body["query"]


    // get the web search results
    const webRes = await client.search(userQuery, {
        searchDepth: 'advanced'
    })

    // -> need to know how to get web search resulte
    const webSearchResult = webRes.results;

    // hit the llm and seek back the respone of the web search results
    const prompt = promptTemplate
        .replace("{{WEB_SEARCH_RESULTS}}", JSON.stringify(webSearchResult))
        .replace("{{USER_QUERY}}", userQuery)
    const llmResponse = await getAiResponse(prompt)
    res.write(llmResponse)

    res.write("\n<SOURCES>\n")
    webSearchResult?.forEach(result => { result: result.url })
    res.write("\n</SOURCES>\n")

    res.end()
})

// route for follow up question
app.post('/ask_ai/follow_up', async (req, res) => {
    // Get the followup question
    // Send the last chat history to the llm and ask it to respond to the followup question
    // return the response
})


app.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${3000}`)
})

