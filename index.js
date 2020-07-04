"use strict";
// Requirements

const fs = require('fs');
const VoxtlJS = require('VoxtlJS');
const client = new VoxtlJS('Steve');

const { Control } = require('magic-home');

var lights = []
lights[1] = new Control("192.168.0.13");
lights[2] = new Control("192.168.0.26");
lights[2] = new Control("192.168.0.14");
lights[3] = new Control("10.0.0.32");

const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

// On Ready
client.on('ready', data => {
    console.log('Ready!')
    client.debug(true);
    setInterval(function(){
        client.sendMessage('Follow IGSteven on Twitter\: https\:\/\/twitter\.com\/IG5teven')
        client.sendMessage('Join IGSteven\'s Discord\: https\:\/\/discord\.gg\/KR9K3Vq')
    }, 1500000) // 25min

});

// On Chat Message
client.on('chatMessage', msg => {
    // Prefix
    var prefix = "!";

    if (msg.data.username == 'Tomato'){
        client.sendMessage(`Shut up Tomato!`);
    }

    let command = msg.data.message.split(' ')[0];
    command = command.slice(prefix.length);
    command = command.toLowerCase();

    let args = msg.data.message.split(' ').slice(1);
    let raw = msg.data.message.split(' ').slice(1).join(' ');

    // Commented Out due to only having 1 account!
    //if (msg.data.username == client.bot.username) return; // Ignore Self

    // Check for Prefix
    if (!msg.data.message.startsWith(prefix)) return; // Ignore all without prefix

    // If !Ping reply with Pong!
    if (command == 'ping') { client.sendMessage(`Pong\!`)}
    if (command == 'spam') { client.sendMessage(`!spam LOL`)}
    if (command == 'mixer') { client.sendMessage(`RIP MIXER 2015-2020`)}
    if (command == 'discord') { client.sendMessage(`Join IGSteven\'s Discord\: https\:\/\/discord\.gg\/KR9K3Vq`)}
    if (command == 'twitter') { client.sendMessage(`Follow IGSteven on Twitter\: https\:\/\/twitter\.com\/IG5teven`)}

    if (command == 'light') {
        lights.forEach(light => {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(args[0]);
            light.setColor(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), console.log('done'))
        });
    }
})

// Username, Token
client.login(config.bot.username, config.bot.token)
