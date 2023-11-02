import Context from '@/models/Context'
import { GreetingsNewUser } from './GreetingsNewUser';
import { PlayGame } from './PlayGame';

export default async function startBot(ctx: Context) {

    console.log(ctx.match);
    if (ctx.update.message?.chat.type != 'supergroup') {
        if (ctx.match) {
            const currentGameId = ctx.match.toString();
            const user = ctx.dbuser;

            user.typeStartTime = Date.now();
            user.currentOpenGameId = currentGameId;
            user.save();
            ctx.match = "";
            return await PlayGame(ctx, currentGameId.toString());
        }
    }

}


