import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { Snipermenu } from "@/menus/SniperMenu";
import { findUserByAddress, findUserByHandle } from "@/models/UserInfo";
import { ethProvider, getAppWalletBalance } from "@/chainutils/chainutils";
import { findOneTrade } from '../models/Trades';
import { PortfolioDisplay } from "./PortfolioDisplay";


export async function Sniper(ctx: Context) {


    const snipingToken = ctx.dbuser.stKey;
    let user: any = {};
    console.log('snipingToken is ' + snipingToken);

    if (snipingToken.startsWith('0x')) {
        user = await findUserByAddress(snipingToken.toLowerCase());
    } else {
        user = await findUserByHandle(snipingToken.toLowerCase());
    }

    console.log(user);

    if (user && user.handle) {
        console.log('Calling Sniper Screen');

        await ctx.replyWithChatAction("typing", ctx.dbuser.id);



        const key = user.handle;
        const address = user.address;
        let cnt: any = 0;
        //sharesSupply(address);
        const mytrades = await findOneTrade(ctx.dbuser.address, address);

        if (mytrades && mytrades.length > 0) {
            cnt = mytrades.length > 0 ? mytrades.at(0)?.amnt : 0;
        }
        // mybal = provider.getbal
        // sellprice buuyprice 
        let bal = ethers.utils.formatEther(await getAppWalletBalance(ctx.dbuser.address));

        bal = Number(bal).toFixed(5)

        if (Number(bal) == 0) {
            const sent = await ctx.reply('Your Trading Wallet does not have required amount to trade, please fund the trading wallet to continue');

            if (sent) WelcomeUser(ctx);

            return;
        }

        const text = `🔑 Key: @${user.handle} 
  
    💼 Address:<a href="https://snowtrace.io/address/${user.address}">${user.address}</a>
    
    🐦 Twitter: 
    📊 Twitter Score: - ${user.score} 
    💸 AVAX Balance: ${bal}  AVAX
    🖨 Supply: ${user.followCount} 
    💰 Price: ${user.price}
      
    Your keys: ${cnt} keys
    Your AVAX: ${bal} AVAX
`;
        ctx.reply(text, {
            parse_mode: "HTML", disable_web_page_preview: true,
            reply_markup: Snipermenu
        })
    }

}


