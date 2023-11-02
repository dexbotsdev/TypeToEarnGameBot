import Context from '@/models/Context'
import { GreetingsNewUser } from './GreetingsNewUser';
import { PlayGame } from './PlayGame';

export default function StartNewGame(ctx: Context) {

    if (ctx.update.message?.chat.type != 'supergroup') {
        if (ctx.match) {
            const currentGameId = ctx.match;
            ctx.match = "";
            return PlayGame(ctx, currentGameId.toString());
        }
    }


}


