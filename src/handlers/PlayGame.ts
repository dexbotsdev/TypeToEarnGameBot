import { GamePlayMenu } from '@/menus/GamePlayMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { findOpenGame } from '@/models/GameContext';

export async function PlayGame(ctx: Context, currentOpenGameId: string) {


    const game = await findOpenGame(currentOpenGameId);

    if (game && game.endTime.getTime() < Date.now()) {
        ctx.reply('THIS GAME HAS ALREADY ENDED', {
            parse_mode: "HTML"
        })
        return;
    }

    ctx.reply(`🎮 Wait until the Video is Loaded, once its loaded click on the Button to start the timer.`);

    ctx.dbuser.currentOpenGameId = currentOpenGameId;
    ctx.dbuser.save();


    if (game)
        ctx.replyWithVideo(game?.mediaUrl, {
            parse_mode: "HTML",
            reply_markup: GamePlayMenu,
        })

}
