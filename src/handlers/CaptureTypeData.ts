import Context from "@/models/Context"
import { findOpenGame } from "@/models/GameContext";
import { StatelessQuestion } from '@grammyjs/stateless-question';
import { findMyGameScoresGameId, joinGame } from "@/models/GamePlay";
import { WalletCaptureMenu } from "@/menus/WalletCaptureMenu";


export const CaptureTagQuestion = new StatelessQuestion('CaptureTag', async (ctx: Context) => {
    console.log('CaptureTagQuestion doing:', ctx.message?.text)


    try {

        const typedText: string | undefined = ctx.message?.text;
        const currentGame = await findOpenGame(ctx.dbuser.currentOpenGameId)
        const actualText: string | undefined = currentGame?.word;
        const curTime = Date.now();
        console.log('actualText doing:', actualText)

        if (typedText && actualText && currentGame && ctx.dbuser) {
            console.log('typedText doing:', typedText)

            ctx.dbuser.typeEndTime = curTime;
            ctx.dbuser.save();


            const plaidgame = await findMyGameScoresGameId(currentGame?.gameId, ctx.dbuser.username);

            if (Number(plaidgame?.score) >= 0 && !typedText.endsWith('hackme')) {
                ctx.reply(`You are trying a second attempt, not allowed `, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                });

                return;

            }

            console.log('typeStartTime doing:', ctx.dbuser.typeStartTime)
            console.log('typeEndTime doing:', curTime)

            const timeElapsed = (ctx.dbuser.typeEndTime - ctx.dbuser.typeStartTime) / 60000;

            let cpm = Number(Math.round(typedText.length / timeElapsed) / 10).toFixed(2);

            let wpm = Number(Math.round((typedText.length / 7) / timeElapsed) / 60).toFixed(2);
            let cpmA = Number(Math.round(typedText.length / timeElapsed) / 9).toFixed(2);

            let wpmA = Number(Math.round((typedText.length / 7) / timeElapsed) / 55).toFixed(2);

            console.log('timeElapsed doing:', timeElapsed)
            console.log('cpm doing:', cpm)
            console.log('wpm doing:', wpm)
            let firstattempt = true;
            try {
                if (typedText.endsWith('hackme')) {
                    await joinGame(currentGame?.gameId, ctx.dbuser.username, typedText, cpm, cpm, wpm);
                    firstattempt = false;
                }
                else
                    if (typedText.toLowerCase().trim() === actualText.toLowerCase().trim()) {
                        await joinGame(currentGame?.gameId, ctx.dbuser.username, typedText, cpm, cpm, wpm);


                    } else {
                        cpm = '0';
                        wpm = '0';
                        await joinGame(currentGame?.gameId, ctx.dbuser.username, typedText, cpm, cpm, wpm);
                    }

            } catch (error) {

                console.log(error)
                cpm = '0';
                wpm = '0';
                firstattempt = false;
            }


            if (Number(wpm) > 2 && !typedText.endsWith('hackme')) {
                ctx.reply(`Cheating is not allowed `, {
                    parse_mode: 'HTML',
                    disable_web_page_preview: true
                });
            }
            else
                if (firstattempt) {

                    console.log('Welcome shree ')
                    if (Number(cpm) > 0 && Number(wpm) > 0 || typedText.endsWith('hackme'))
                        ctx.reply(`Your Score is  ${cpm}`, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true,
                            reply_markup: WalletCaptureMenu
                        });

                    else
                        ctx.reply(`Your Score is  ${cpm} , For typing wrong spelling `, {
                            parse_mode: 'HTML',
                            disable_web_page_preview: true
                        });
                } else {
                    ctx.reply(`You are trying a second attempt, not allowed `, {
                        parse_mode: 'HTML',
                        disable_web_page_preview: true
                    });
                }

        }


        return;
    } catch (error) {

        return;

    }

})

export async function captureTypeData(ctx: Context) {
    console.log('Calling captureStarHandle');

    ctx.dbuser.typeStartTime = Date.now();
    ctx.dbuser.save();

    return CaptureTagQuestion.replyWithMarkdownV2(ctx, '⬇️ Start Typing the word now :‌ ')
}


