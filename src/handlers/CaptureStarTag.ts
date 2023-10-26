import { DeleteMessageMenu } from "@/menus/DeleteMessageMenu";
import Context from "@/models/Context"
import { ethers } from "ethers";
import { WelcomeUser } from "./WelcomeUser";
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { Sniper } from "./Sniper";
import { findUserByHandle } from "@/models/UserInfo";


export const CaptureTagQuestion = new StatelessQuestion('CaptureTag', async (ctx: Context) => {
    console.log('CaptureTagQuestion doing:', ctx.message?.text)


    try {
        if (ctx.message?.text && ethers.utils.getAddress(ctx.message?.text.split('x')[1]) === ctx.message.text)
            ctx.dbuser.stKey = ctx.message.text;
        ctx.dbuser.save();
        Sniper(ctx);
        return;
    } catch (error) {
        await ctx.replyWithChatAction("typing", ctx.dbuser.id);
        if (ctx.message?.text)
            ctx.dbuser.stKey = ctx.message.text;
        ctx.dbuser.save();

        console.log(ctx.dbuser);

        const dat = await findUserByHandle(ctx.dbuser.stKey);

        console.log(dat);

        if (dat && dat.address)
            Sniper(ctx);
        return;

    }

})

export async function captureStarHandle(ctx: Context) {
    console.log('Calling captureStarHandle');
    return CaptureTagQuestion.replyWithMarkdownV2(ctx, '⬇️ Enter Key or Address to Snipe :‌ ')
}


