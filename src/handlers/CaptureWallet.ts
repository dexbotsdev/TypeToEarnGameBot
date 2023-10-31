import Context from "@/models/Context"
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { ethers } from 'ethers';

export const CaptureWallet = new StatelessQuestion('CaptureWallet', async (ctx: Context) => {
    console.log('CaptureWallet doing:', ctx.message?.text)

    try {

        const typedText: string | undefined = ctx.message?.text;

        if (typedText) {

            if (ethers.utils.isAddress(typedText)) {
                ctx.dbuser.wallet = typedText;
                ctx.dbuser.save();
            } else {
                ctx.reply('Not a valid address ');
            }


        }

    } catch (error) {

    }

})

export async function CaptureWalletData(ctx: Context) {
    console.log('Calling CaptureWallet');
    return CaptureWallet.replyWithMarkdownV2(ctx, '⬇️ Enter Your Wallet Address for Reward :‌ ')
}


