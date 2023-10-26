import { getAppWalletBalance } from '@/chainutils/chainutils';
import { ProfileScreenMenu } from '@/menus/ProfileScreenMenu';
import Context from '@/models/Context';
import { ethers } from "ethers";
import { GreetingsNewUser } from './GreetingsNewUser';

export async function WelcomeUser(ctx: Context) {
    console.log('-----' + ctx.dbuser.pkey);


    if (!ctx.dbuser.pkey) {
        return GreetingsNewUser(ctx)
    }
    else {

        const user = ctx.dbuser;
        const walletAddress = user.address;
        const walletBalance = await getAppWalletBalance(walletAddress);
        const balance = Number(ethers.utils.formatEther(walletBalance)).toFixed(4);

        const message = `🤖 Hey ${ctx.dbuser.username}, welcome! 
💼 Your wallet:
${walletAddress} 
💰 Your balance:
${balance} AVAX 
💳 Unpaid Fee:
${balance} AVAX

  
DevSupport - @dexbotdev.
Chat - @pepeandlife`;


        ctx.reply(message, {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: ProfileScreenMenu
        })
    }
}
