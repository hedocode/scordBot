const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

require('dotenv').config()

if(!process.env.DISCORD_BOT_TOKEN) {
    console.error("J'ai besoin d'un fichier .env à la racine pour fonctionner, il doit contenir une ligne DISCORD_BOT_TOKEN=[VOTRE_TOKEN]")
    console.error('Créer une application discord et récupérer son token : https://www.writebots.com/discord-bot-token/');
    return;
}

client.once(
    'ready',
    () => {
	    console.log('Pret à dire plein de choses !');
	    console.log('re plein de choses !');
    }
);

client.on(
    'messageCreate',
    message => {
        const msgText = message.content;
        var globalRegex = new RegExp('di|dea', "ig");
        var regex = new RegExp('(?:dis |dit |di|dea)([^]*)', "i");
        const saidDi = regex.test(msgText);

        if (saidDi) {
            const count = msgText.replace('\n', '').split(globalRegex).length;
            const wordArray = msgText.split(regex);
            if (count > 5) {
                message.reply(
                    'IL SUFFIT, JE VAIS PAS FAIRE ' + (count - 2) + ' MESSAGE' + (count - 2) > 1 ? '' : 'S'
                );
            }else {
                wordArray.shift();
                const response = wordArray.join(' ').trim();
                if(response && response.length > 0) {
                    message.reply(response);
                }
            }
        }
    }
);


client.login(
    process.env.DISCORD_BOT_TOKEN
);