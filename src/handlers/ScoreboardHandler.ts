import Context from '@/models/Context';

export async function ScoreboardHandler(ctx: Context) {

    console.log(ctx);

    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);
        console.log('-----' + user);

        if (user.status == 'creator') {
            ctx.reply(' Only Creator Can create a new Game ');
        } else {

            ctx.reply(' Only Creator and Admin Can create a new Game');
        }
    }
}
