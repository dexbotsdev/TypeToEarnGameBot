import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { randomUUID } from 'crypto'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class GameContext {

    @prop({ required: true, index: true, unique: true })
    id!: string
    @prop({ required: true, default: '' })
    gameId!: string
    @prop({ required: true, default: '' })
    word!: string
    @prop({ required: true, default: '' })
    mediaUrl!: string
    @prop({ required: true, default: '' })
    startTime!: Date
    @prop({ required: true, default: '' })
    endTime!: Date
}

const g = getModelForClass(GameContext)


export function createGame(id: string, word: string, mediaUrl: string) {

    const gameId = randomUUID();
    const startTime = Date.now();
    const endTime = startTime + 30 * 60 * 1000;
    const slotsOpen = 10;
    return g.create(
        { id, gameId, word, startTime, endTime, slotsOpen, mediaUrl }
    )
}


export async function findOpenGame(gameId: string) {
    try {
        const games =
            await g.findOne(
                { gameId: gameId }
            )

        console.log(games)
        return games;
    } catch (error) {
        console.log(error)

        return undefined;
    }
}


