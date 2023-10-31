import { getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class GamePlay {

    @prop({ required: true, index: true, unique: true })
    id!: number
    @prop({ required: true, default: '' })
    gameId!: string
    @prop({ required: true, default: '' })
    userId!: string
    @prop({ required: true, default: 0 })
    score!: string
    @prop({ required: true, default: 0 })
    speed!: string
    @prop({ required: true, default: 0 })
    rewards!: string
    @prop({ required: true, default: 0 })
    typedWords!: string
}

export const Player = getModelForClass(GamePlay)


export function joinGame(gameId: any, userId: any, typedWords: string, speed: any, score: any, rewards: any) {
    const id = Date.now();
    try {
        return Player.create(
            { id, gameId, userId, typedWords, speed, score, rewards }
        )
    } catch (error) {
        return null
    }
}


export async function findMyGameScoresGameId(gameId: string, userId: any) {

    const d = await Player.findOne(
        {
            gameId: { '$regex': gameId, $options: 'i' },
            userId: { '$regex': userId, $options: 'i' }
        }
    ).exec();

    console.log(d);

    return d;
}





export async function findHistoryGames() {
    const sixHoursAgo = new Date();
    sixHoursAgo.setHours(sixHoursAgo.getHours() - 6);
    const d = await Player.find(
        {
            createdAt: { $lt: sixHoursAgo }
        }
    ).exec();
    console.log(d);
    return d;
}


export async function deleteGame(id: any) {
    return await Player.findByIdAndDelete(id)
}
