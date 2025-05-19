// initiliaze the chatgpt api , and then we are going to prompt the user for a message, and 
// continue the conversation until the user ends the file. 

import {OpenAIApi, Configuration} from 'openai' // import from the openai package
import {createRequire} from 'module' // import from package called module, which is installed by default
const require=createRequire(import.meta.url) //use old require, call createRequire, and pass in import.meta.url
require('dotenv').config() //require package called dotenv and use the config method, which allows us to access 
// the environment variables within our code. 

// 1. initialize chatgpt api. allows us to interact with the API from our code base.

const OPENAI_SECRET_KEY=process.env.OPENAI_SECRET_KEY //gets the api key.  
// process.env accesses the environment variables such as the secret keys in the main file of your code so they
// stay secure in our .env file, but still be read and used in our index.js code, and consequently used to authenticate us with OpenAI. 
// after process.env is the name of your secret key.

const configuration= new Configuration({
    apiKey: OPENAI_SECRET_KEY //this is the argument
})

const openai=new OpenAIApi(configuration)

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
