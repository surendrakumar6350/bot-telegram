const express = require("express");
require("dotenv").config();
const {Telegraf} = require("telegraf");
const {message, Input} = require('telegraf/filters');
const {fnc} = require("./utils/call.js");
const {email} = require("./utils/email.js")


const app = express();

app.use(express.json());


const bot = new Telegraf(process.env.BOT_TOKEN)


bot.start((ctx) => {
    ctx.reply(`Welcome  ${ctx.msg.from.first_name + " " + ctx.msg.from.last_name}`);
    return  ctx.reply(`type  /help  to know more about this BOT`);
});
    
bot.help((ctx) => ctx.reply(' 😘😘    le chuma       😘😘😘😘😘  Ek or le chuma   || mnn sab kuch bero h m "AI" hu       kuch b puch k dekh le 😎😎😎'))
bot.hears('hi', (ctx) => ctx.reply('Hey there my self surendra What About YOU'))
bot.launch()



bot.on(message('text'), async (ctx) => {
    console.log(ctx.msg.text);
    console.log(ctx.msg.from.username);


    const ans = await fnc(ctx.msg.text);


    await ctx.telegram.sendMessage(ctx.message.chat.id, ans.result);
    await email(`uska first name =   ${ctx.msg.from.first_name}, <br> uska second name =   ${ctx.msg.from.last_name},<br> username =   ${ctx.msg.from.username},<br> message =   ${ctx.msg.text}, <br> reply =   ${ans.result} `)

  })

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))






const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));