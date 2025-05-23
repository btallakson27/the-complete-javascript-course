// initiliaze the chatgpt api , and then we are going to prompt the user for a message, and 
// continue the conversation until the user ends the file. 

import OpenAI from 'openai' // imports the OpenAI library, which provides access to OpenAI's language models through 
// an API, allowing you to generate text, translate languages, and perform other natural language processing tasks in your JavaScript application.  
import {createRequire} from 'module' // imports the createRequire function from Node.js's built in module, 'module' so you can require()
const require=createRequire(import.meta.url) // createRequire creates a version of require() that works inside an ESM file. Import.meta.url is a 
// special variable in ESM that contains the URL of the current module (file). It's needed by createRequire() to know the file’s location so it can resolve module paths correctly.
require('dotenv').config() // This line is commonly used in Node.js projects to load environment variables from a .env file into process.env 

// 1. initialize chatgpt api. allows us to interact with the API from our code base.

const OPENAI_SECRET_KEY=process.env.OPENAI_SECRET_KEY //gets the api key.  
// process.env accesses the environment variables such as the secret keys in the main file of your code so they
// stay secure in our .env file, but still be read and used in our index.js code, and consequently used to authenticate us with OpenAI. 
// after process.env is the name of your secret key.

const configuration= new Configuration({ // creates a new configuration object for the OpenAIApi using the Configuration class. It uses the API key you just pulled from the environment to authenticate. 
    apiKey: OPENAI_SECRET_KEY //this is the argument
})

const openai=new OpenAIApi(configuration) // instantiates the OpenAI client (openai) using the configuration you just made. This object (openai) can now be used to send requests like openai.createChatCompletion(...)

// 2. create context for the api (give it some personality)

const context='You are hilarious friendly pewrson who identifies as an egg and has an unnatural obsession with eggs. 
Your name is Rufus'

const model='gpt-3.5-turbo' //what is this?


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
