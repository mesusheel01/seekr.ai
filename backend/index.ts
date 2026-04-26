import express from 'express'
import dotenv from 'dotenv'
import { getAiResponse } from './aiFunction';
dotenv.config()


const app = express()



app.get("/", (req, res) => {
    res.send("listening")
});

app.post("/ask", async (req, res) => {
    const { userQuery } = req.body


    // get the web search results
    const webSearchResults = await getAiResponse(userQuery)

})

app.listen(3000, () => {
    console.log("listening on port 3000")
})

