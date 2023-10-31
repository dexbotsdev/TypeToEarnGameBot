import Context from '@/models/Context';
import { WelcomeUser } from './WelcomeUser';
import { GreetingsNewUser } from './GreetingsNewUser';
import { findOpenGame } from '@/models/GameContext';

export async function MessageHandler(ctx: Context) {


    // console.log(ctx); 
    if (ctx.dbuser.username === '') {
        ctx.dbuser.username = ctx.message?.from.username ? ctx.message?.from.username : ctx.message?.from.first_name;
        ctx.dbuser.save()
        GreetingsNewUser(ctx);
    } else {
        try {
            const text = ctx.update.message?.text;
            console.log(ctx.update.message)

            if (text?.startsWith('/gameInfo') || text?.startsWith('/start') || text?.startsWith('/help') || text?.startsWith('/info')) {

                ctx.reply('Commands Supported only in the Bot Not in Group', {
                    parse_mode: "HTML", disable_web_page_preview: true
                });
            }



        } catch (error) {
            console.log('send failed bro')
        }
    }

}
