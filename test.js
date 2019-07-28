const fetch = require('node-fetch');


(async () => {
    let json = await fetch('https://chatbots.kktix.cc/events.json')
        .then(res => res.json());

    let item = json.entry[0];
    let text = `${item.title} ${new Date(item.published).toLocaleDateString()} ${item.url}`;
    console.log(text);


})()