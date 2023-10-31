import Context from '@/models/Context';

export async function WelcomeUser(ctx: Context) {
    console.log('-----' + ctx.dbuser);


}
