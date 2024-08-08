const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUxRMldkWG5JcUFVUkJsRUJEM2JxbW5mTUJwaU1LMS9MS2VBQ25Pc1RHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUpiZnU1Vmt6MWJVT2tDNjZUTTJVWVBrK3VxOUtjd0w2MXROVEdJdUZVbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhSU03ellZZUFKQWFQWDRsTnppYTM2dXJqTjNUVk9CUS9kYUZhYVI3VGtrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkbTQrVUY0SDlkVS93d09pQXdtQ2VtTTEza1Z6Q2tOWjJsSGgzeHZLNVNJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtDcXVPc1pyeFhZVlB4c1R0dGxGUEJLRzJOZ1dXYmt2R3Exejcranhza2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNYUR2bWdlTXhtRTdmOExrL1NzZUpKMjM1bVdCZUpybXpqZFVlK1NUSDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUl2ZytsYkVQY004ejFhS3g1VFJZZ1B4RkRQdWk3QXhINEdGV3BSdDFHbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlU1VllGNU5oQWxjS3RucGloeWhTbUlETjBseFgxcUR0eURUTGpXMzRrOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlrUFQ3QVRWL0RReHYxQ2dWN29SWXFtMGRiVXBhVFhBVGFtbURML25EWkVBNlIvdnMxUXU2NjBjVHA1cmFTTHZVR2RJajNiSnlMTzBNRHJXV2xmYmlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTUsImFkdlNlY3JldEtleSI6InRma3NWRG9LZWQyWjdQeXZTOFg0MGVzRGlRNGJEdzVjbG02SGZnUE5yN2M9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlZ3Q0VScnp3UnRlU25wcWZXWVpNU1EiLCJwaG9uZUlkIjoiYmIwOWJmNzMtMDhhNS00MjBlLTlkMDUtNDk4MDFkMGQyZmM0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ5T3BqbFZvckRLQ0MwVDkrUlNrTmI0N0xYcz0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVdEdmx6STYvNFZXckNubVJnY3paQ3c5TS9nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSVM0eW9rSEVPR04xYlVHR0FJZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNFRwRkZtSUZMZFE3VzFiSUx3NW5tVUdIaUFKUTlhcEt0MXg2NGpOUEkxZz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYjdZSDdTT1loOURFVVYyZFNvS1dWK1k5cldTL0VEbkZaOHM1cDR2Y3MyNHNaaHVyYUpVb2NlWENFaEtCY0ltVDhnczBvaUhwVnA4R2doRkU0dThCRGc9PSIsImRldmljZVNpZ25hdHVyZSI6Ii9kSy85WFFVQnhhbWROWk1MZzdZS2tpeXo5czZRSFZ0dnpTSzJ1TGY0Vzl1L3J3UXZ6VndTWTgvbE9adHdWL1ZOUUFKME0zOFM1eFFRWk1jNEdXaGdnPT0ifSwibWUiOnsiaWQiOiIyMjY2MzY4NTQ2ODoyMEBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjQ4MTk4NTc2MDM4MTE2OjIwQGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMjY2MzY4NTQ2ODoyMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlRTZSUlppQlMzVU8xdFd5QzhPWjVsQmg0Z0NVUFdxU3JkY2V1SXpUeU5ZIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjMxNTYxOTcsImxhc3RQcm9wSGFzaCI6IjJXVWptWiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSnptIn0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE, €
    NOM_OWNER: process.env.NOM_OWNER || "MRPV Bot",
    NUMERO_OWNER : process.env.NUMERO_OWNER, 63685468             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || '🏆🌀☄️MRPV_BOT🏆🌀☄️',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
