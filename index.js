const express = require("express");
require("dotenv").config();
const { Telegraf } = require("telegraf");
const { message } = require('telegraf/filters');
const { fnc } = require("./utils/call.js");
const { email } = require("./utils/email.js");

const app = express();

app.use(express.json());

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(`Welcome  ${ctx.msg.from.first_name + " " + ctx.msg.from.last_name}`);
  return ctx.reply(`type  /help  to know more about this BOT`);
});
bot.hears('/features', (ctx) => ctx.reply(`✨ *Bot Features* ✨

Discover what this bot can do for you:

1. **Personalized Greetings**: Get a warm welcome with your name when you start a conversation.
2. **AI-Powered Answers**: Ask any question and receive intelligent, AI-driven responses.
3. **Email Notifications**: Important interactions are sent to your email for your records.
4. **Interactive Command Guide**: Type /help to see a list of commands and how to use them.
5. **User Info Retrieval**: Fetch detailed user information such as username and message history.
6. **Keyword Triggers**: Certain keywords in your messages trigger specific bot actions.
7. **24/7 Availability**: The bot is always online, ready to assist you anytime.
8. **Fun Interactions**: Engage in fun and casual conversations for a light-hearted experience.
9. **Information Lookup**: Quickly lookup information or perform searches directly through the bot.
10. **Custom Notifications**: Set up and receive custom notifications for specific events or actions.

🔧 *How to Use:*
Type any of the commands or keywords to interact with the bot. For example, type "hi" to get a friendly greeting.

Enjoy these features and feel free to contact *Surendra Kumar* for any suggestions or further assistance!
`));
bot.help((ctx) => ctx.reply(`🤖 **Bot Help Menu** 🤖
    
Welcome to the Bot! Here are the commands you can use:

/start - Start the bot and get a welcome message.
/help - Show this help message.
/hi - Say hello and introduce yourself.
/features - List the features of this bot.

🔍 **How to Use:**
Simply type any of the commands above to interact with the bot. For example, type "/hi" to say hello.

🌐 **Additional Info:**
- This bot is powered by AI to assist you with various tasks.
- You can ask me anything, and I'll do my best to help!

If you have any feedback or need further assistance, feel free to reach out!

Enjoy your time here! 😊
`));
bot.hears('hi', (ctx) => ctx.reply('Hey there my self SURENDRA KUMAR What About YOU'));
bot.hears('/hi', (ctx) => ctx.reply('Hey there my self SURENDRA KUMAR What About YOU'));
bot.launch();

bot.on(message('text'), async (ctx) => {
  try {
    const waitingMessage = await ctx.reply('⏳ Please wait while I process your request...');

    console.log(ctx.message.text);
    console.log(ctx.message.from.username);

    const ans = await fnc(ctx.message.text);

    await ctx.telegram.editMessageText(ctx.chat.id, waitingMessage.message_id, null, ans.result);
    await email(`First name: ${ctx.message.from.first_name}, <br> Last name: ${ctx.message.from.last_name},<br> Username: ${ctx.message.from.username},<br> Message: ${ctx.message.text}, <br> Reply: ${ans.result}`);
} catch (error) {
    console.error('Error processing message:', error);
    ctx.reply('An error occurred while processing your message. Please try again later.');
}
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', promise, 'reason:', reason);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
