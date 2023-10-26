import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';

export function GreetingsNewUser(ctx: Context) {


    console.log(ctx)



    return ctx.reply(`🎯 Welcome to the StarsArena Sniper ${ctx.dbuser.username}
  
    This bot allows you: 
    1) Track new registered users
    2) Buy and sell keys in 1 click
    3) Track exact Twitter profiles and be notified when they join Stars Arena
      
    In order to start you need to import or generate wallet.
    
    dev - @dexbotdev.
    Chat - @musashi
    More - StarsArenaBots (https://linktr.ee/StarsArenaBots)`,
        {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: StartScreenMenu
        },);
}
