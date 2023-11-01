import { GamePlayMenu } from '@/menus/GamePlayMenu';
import { StartScreenMenu } from '@/menus/StartScreenMenus';
import Context from '@/models/Context';
import { findOpenGame } from '@/models/GameContext';

export async function GreetingsNewUser(ctx: Context) {


    return ctx.reply(`<b>🎮 Welcome to the TypeClubArena Dear @${ctx.dbuser.username}
  
    Enter the wonderful world of TypeClub and earn while you play: 

    $RULES </b>
    1) There will be 5 sec Video with a Text every 30 Minutes
    2) Click on Start Typing and submit in your private bot channel.
    3) Your Typing speed is the key to success.
    4) To win  reward pool A of 500$ you need to hold $TYPE tokens.
    5) Every Play Has a seperate Leaderboard
    6) Every 6 Hours the Leaderboard is reset to 0
    7) Top 10 of the Leaderboard are rewarded proportionately
    8) The Game Improves everyday
       
`,
        {
            parse_mode: "HTML", disable_web_page_preview: true
        },);
}
