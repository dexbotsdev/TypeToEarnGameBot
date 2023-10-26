import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class Trade {
    @prop({ required: true, default: '' })
    user!: string | undefined
    @prop({ required: false, default: '' })
    subject!: string | undefined
    @prop({ required: false, default: 0 })
    amnt!: number
    @prop({ required: false, default: '' })
    buyTime!: Date
    @prop({ required: false, default: '' })
    sellTime!: Date
}

const TradeModel = getModelForClass(Trade)


export function createTrade(user: string, subject: string, amnt: number) {
    return TradeModel.create(
        { user, subject, amnt, buyTime: Date.now() }
    )
}


export async function findMyTrades(user: string) {
    return await TradeModel.find(
        { user }
    )
}

export async function findOneTrade(user: string, subject: string) {
    return await TradeModel.find(
        { user, subject }
    )
}


export async function updateTrade(address: string, stKey: string, shareCount: number) {

    const filter = { user: address, stKey: stKey, amnt: shareCount };
    const update = { sellTime: Date.now() };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await TradeModel.findOneAndUpdate(filter, update, {
        new: true
    });

}


