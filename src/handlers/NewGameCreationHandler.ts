import env from '@/helpers/env';
import Context from '@/models/Context';
import generateNewVideo from './VideoGenService';
import { Menu } from '@grammyjs/menu';
import { createGame } from '@/models/GameContext';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import { InlineKeyboard } from 'grammy';
import { generate } from '@/utils/RandomGen';




export async function NewGameCreationHandler(ctx: Context) {

    const apiKey = env.JSON2Video;
    console.log(apiKey);
    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);
        console.log(user);

        if (user.status == 'creator') {
            const gameChat = await ctx.reply(' New Game Video Being Generated .......');
            try {

                const words = generate({
                    exactly: 1,
                    wordsPerString: 7,
                    formatter: (word: string) => word.toUpperCase(),
                })
                const wostr = JSON.stringify(words);
                let word = JSON.parse(wostr)[0];

                word = word.split(' ').slice(0, 7).join(' ')

                console.log(word);



                const videoUrl = await generateNewVideo(word);

                const mediaUrl = videoUrl.movie.url;
                const createGamenew = await createGame(videoUrl.movie.project, word, mediaUrl);
                ctx.replyWithChatAction('typing');
                console.log(createGamenew);
                console.log(gameChat);

                ctx.api.deleteMessage(gameChat.chat.id, gameChat.message_id);

                ctx.dbuser.currentOpenGameId = createGamenew.gameId;

                ctx.dbuser.save();

                // console.log(ctx.update.message.chat.id)

                const keyboard = new InlineKeyboard()
                    .url("📱 Join Game", `https://t.me/ttegamebot?start=${createGamenew.gameId}`);

                ctx.reply(`<b>📱 TypeFast2Earn Game Created 📱</b>

Game Id      : #️⃣ : ${shortenUUID(createGamenew.gameId)} 
Text To Type : 🔠 : ${shortenUUID(word.toLowerCase())}....... 
TimeLimit    : 🪫 : 30 Minutes 
Entry Fee    : None
Prize Pool   : Token Airdrops 
(Check Tier Rewards with /gameInfo) 
                `, {
                    parse_mode: "HTML", disable_web_page_preview: true,
                    reply_markup: keyboard,
                })





            } catch (error) {
                console.log(error)
            }
        } else {

            ctx.reply(' Only Creator and Admin Can create a new Game');
        }
    }
}


function shortenUUID(uuid: string) {
    return uuid.substring(0, 6);
}