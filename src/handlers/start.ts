import Context from '@/models/Context'
import { WelcomeUser } from './WelcomeUser';
import { GreetingsNewUser } from './GreetingsNewUser';
import { ethers } from 'ethers';
import { Sniper } from './Sniper';

export default function startBot(ctx: Context) {

    console.log(ctx.match);
    console.log(ctx.dbuser);

    if (ctx.dbuser.username === '') {
        ctx.dbuser.username = ctx.update.message?.from.username ? ctx.update.message?.from.username : ctx.update.message?.from.first_name;
        ctx.dbuser.save()
    }

    if (ctx.dbuser.pkey !== '') {
        console.log(ctx.dbuser.pkey);
        console.log(ctx.message?.text);

        try {
            if (ctx.message?.text) {
                ctx.dbuser.stKey = ethers.utils.getAddress(ctx.message?.text.split(' ')[1]).toLowerCase();
                ctx.dbuser.save();
                return Sniper(ctx);
            } else {
                return WelcomeUser(ctx)
            }
        } catch (error) {
            //ctx.reply('Invalid Address Entered ');
            return WelcomeUser(ctx)
        }

    }
    else {
        return GreetingsNewUser(ctx);
    }

}


