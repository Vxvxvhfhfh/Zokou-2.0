const util = require('util');
const fs = require('fs-extra');
const { ☄️🏆MRPV🏆☄️ } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", reaction:"📁",categorie: "Général" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLowerCase() != "oui") {
        mode = "public";
    }

     

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('06:27:14');
const date = moment().format('11/07/2024');

  let infoMsg =  `
╭────✧${s.MRPV bot}✧────◆
│   *Préfixe* : ${s.€}
│   *Owner* : ${s.🌀☄️🏆MRPV🌀☄️🏆}
│   *Mode* : ${relaxe}
│   *Commandes* : ${cm.length}
│   *Date* : ${11/06/2024}
│   *Heure* : ${temps}
│   *Mémoire* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│   *Plateforme* : ${os.platform()}
│   *Développeurs* : EozaAtlas (atlas familly)
╰─────✧WA-BOT✧─────◆ \n\n`;
    
let menuMsg = `
👋 salut ${nomAuteurMessage} 👋

*Voici la liste de mes commandes :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `╭────❏ *${cat}* ❏`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│ ${cmd}`;
        }
        menuMsg += `
╰═════════════⊷ \n`
    }

    menuMsg += `
◇            ◇
*»»————— ★ —————««*
Pour utiliser  une  commande, tapez  ${€}"nom de la commande"
 
                                                
*»»————— ★ —————««*
`;

    
   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url:https://youtu.be/JBqxVX_LXvk?si=54eSQS5IUnsiGF_W}, caption:infoMsg + menuMsg, footer: "Je suis *🌟MRPV_bot🌟*, une création de Maestria rpverse " , gifPlayback : true}, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url:[url=https://imgbb.com/][img]https://i.ibb.co/M2VfGZL/In-Collage-20240704-154139515.png[/img][/url]  }, caption:infoMsg + menuMsg, footer: "Je suis *🔥🫧 MRPV BOT🌬️🏜️*, ☄️🏆MRPV☄️🏆++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
