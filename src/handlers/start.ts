import Context from '@/models/Context'
import { GreetingsNewUser } from './GreetingsNewUser';
import { PlayGame } from './PlayGame';

export default function startBot(ctx: Context) {


    if (ctx.dbuser.username === '') {
        ctx.dbuser.username = ctx.message?.from.username ? ctx.message?.from.username : ctx.message?.from.first_name;
        ctx.dbuser.save()
    }

    console.log(ctx.match);
    if (ctx.update.message?.chat.type != 'supergroup') {
        if (ctx.match) {
            const currentGameId = ctx.match;
            return PlayGame(ctx, currentGameId.toString());
        }
    }


    return GreetingsNewUser(ctx);
}


