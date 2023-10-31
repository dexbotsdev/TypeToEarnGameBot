import Context from '@/models/Context';
import { deleteGame, findHistoryGames } from '@/models/GamePlay';

export async function ArchiveLeaderboard(ctx: Context) {

    if (ctx.update.message?.from) {
        const user = await ctx.getChatMember(ctx.update.message?.from.id);
        console.log('-----' + user);

        if (user.status == 'creator') {
            const gameChat = await ctx.reply(' ArchiveLeaderboard .......');

            try {
                const playlist = await findHistoryGames();
                let count = 0;
                playlist.forEach(async game => {
                    await deleteGame(game.id);
                    count++;
                    console.log(' Deleted Game with ID ' + game.id);
                })
                ctx.api.deleteMessage(gameChat.chat.id, gameChat.message_id);

                await ctx.reply(' Archive Successful ');
            } catch (error) {
                console.log(error)
            }
        } else {

            ctx.reply(' Only Creator and Admin Can perform Archiving');
        }
    }

}
