import env from '@/helpers/env';
import Context from '@/models/Context';
import generateNewVideo from './VideoGenService';
import { Menu } from '@grammyjs/menu';
import { createGame } from '@/models/GameContext';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import { InlineKeyboard } from 'grammy';
import { generate } from '@/utils/RandomGen';
import { Player } from '@/models/GamePlay';




export async function GameInfoHandler(ctx: Context) {
    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);

        var out = `
<b>Rewards Tiers</b>

<b>A. Token Holders </b>

<b> 1'st Place :</b> $50
<b> 2'nd Place :</b> $25
<b> 3'rd Place :</b> $10
<b> 4'th Place :</b> $5
<b> 5'th Place :</b> $2
<b> 6th - 10th :</b> $1 


<b>B. Non Token Holders </b>

<b> 1'st Place :</b> $20
<b> 2'nd Place :</b> $10
<b> 3'rd Place :</b> $5
<b> 4'th Place :</b> $3
<b> 5'th Place :</b> $2
<b> 6th - 10th :</b> $1


`

        ctx.reply(out, {
            parse_mode: "HTML", disable_web_page_preview: true,
        });

    }
}
