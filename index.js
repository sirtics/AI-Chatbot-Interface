import { config } from "dotenv";
import OpenAI from 'openai';
import readline from "readline";

config();
const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

userInterface.prompt();

userInterface.on("line", async input => {
    try {
        const res = await openai.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: 'gpt-3.5-turbo',
        });

        if (res.data && res.data.choices && res.data.choices[0] && res.data.choices[0].message) {
            const content = res.data.choices[0].message.content;
            console.log(content);
        } else {
            console.error("Response structure is unexpected:", res);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }

    userInterface.prompt();
});
