const { WebhookClient } = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser')

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post("/dialogflow", (request, response) => {
    console.log("dialogflow")
    let agent = new WebhookClient({ request, response });

    async function welcome(agent) {

        // console.log("agent", agent)

        agent.add("hello world");
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    async function eat(agent) {

        console.log("agent", agent)
        agent.add(`吃${agent.parameters.distract}`)
        // agent.add("eat world");
    }


    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    intentMap.set('eat', eat);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    agent.handleRequest(intentMap);

})


server.get('/', (req, res) => {
    console.log('Hello world received a request.');

    const target = process.env.TARGET || 'World';
    res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log('Hello world listening on port', port);
});