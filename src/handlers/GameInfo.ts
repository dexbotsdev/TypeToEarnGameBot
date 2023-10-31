import Context from '@/models/Context';




export async function GameInfoHandler(ctx: Context) {
    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);

        var out = `
<b>Rewards Tiers</b>

<b>A. Token Holders </b>

<b> 1'st Place :</b> $200
<b> 2'nd Place :</b> $100
<b> 3'rd Place :</b> $50
<b> 4'th Place :</b> $25
<b> 5'th Place :</b> $25
<b> 6th - 10th :</b> $10


<b>B. Non Token Holders </b>

<b> 1'st Place :</b> $30
<b> 2'nd Place :</b> $15
<b> 3'rd Place :</b> $10
<b> 4'th Place :</b> $8
<b> 5'th Place :</b> $8
<b> 6th - 10th :</b> $5


`

        ctx.reply(out, {
            parse_mode: "HTML", disable_web_page_preview: true,
        });

    }
}
