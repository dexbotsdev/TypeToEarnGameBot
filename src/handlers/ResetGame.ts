import env from '@/helpers/env';
import Context from '@/models/Context';
import generateNewVideo from './VideoGenService';
import { Menu } from '@grammyjs/menu';
import { createGame } from '@/models/GameContext';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import { InlineKeyboard } from 'grammy';
import { generate } from '@/utils/RandomGen';
import { Player } from '@/models/GamePlay';




export async function ResetGameHandler(ctx: Context) {

    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);
        console.log(user);

        if (user.status == 'creator') {
            const gameChat = await ctx.reply(' Player Data is being Reset .......');
            try {

                await Player.remove({});

                await ctx.reply(' Player Data has been Reset .......');
            } catch (error) {
                console.log(error)
            }
        } else {

            ctx.reply(' Only Creator and Admin Can Reset Game');
        }
    }
}
