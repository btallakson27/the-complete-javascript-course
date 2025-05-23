// initiliaze the chatgpt api , and then we are going to prompt the user for a message, and 
// continue the conversation until the user ends the file. 

import OpenAI from 'openai' // imports the OpenAI library, which provides access to OpenAI's language models through 
// an API, allowing you to generate text, translate languages, and perform other natural language processing tasks in your JavaScript application.  
import {createRequire} from 'module' // imports the createRequire function from Node.js's built in module, 'module' so you can require()
const require=createRequire(import.meta.url) // createRequire creates a version of require() that works inside an ESM file. Import.meta.url is a 
// special variable in ESM that contains the URL of the current module (file). It's needed by createRequire() to know the file’s location so it can resolve module paths correctly.
require('dotenv').config() // This line is commonly used in Node.js projects to load environment variables from a .env file into process.env 

// 1. initialize chatgpt api. allows us to interact with the API from our code base.
// This code snippet is configuring access to the OpenAI API by using a secret key 
// stored in an environment variable.

const OPENAI_SECRET_KEY=process.env.OPENAI_SECRET_KEY // reads an environment variable named OPENAI_SECRET_KEY.
// process.env is a special object in Node.js that gives you access to environment variables.
// This allows you to keep the secret API key out of your code, which is more secure.

const openai = new OpenAI({ apiKey: OPENAI_SECRET_KEY })
// creates a new instance of the OpenAI client. 
// The API key is passed in via an options object { apiKey: ... }
// This key is necessary to authenticate your app when making requests to OpenAI's services.
// This code securely loads your OpenAI API key from an environment variable and initializes the OpenAI client using that key.

// 2. create context for the api (give it some personality)

const context='You are hilarious friendly person who identifies as an egg and has an unnatural obsession with eggs. 
Your name is Rufus'

const model='gpt-3.5-turbo' //what is this?

const messages=[]

// 3. create a function to retrieve the api message based on user input

async function sendPrompt() {
    const current_messages = [
        {
            "role": "system",
            "content": context
        },
        ...messages
    ]

    const completion = await openai.chat.completions.create({
        model,
        messages: current_messages
    })

    let response = completion.choices[0].message
    messages.push(response)
    console.log(response.content)
    getUserInput()
}

// 4. create a run function that requests a user input

async function run() {
    getUserInput()
}

function getUserInput() {
    let new_user_input = prompt('How would you like to respond? ')
    messages.push({
        'role': 'user',
        "content": new_user_input
    })
    sendPrompt()
}

run()
