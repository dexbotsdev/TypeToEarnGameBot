import { getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class PaymentData {

    @prop({ required: true, index: true, unique: true })
    id!: number
    @prop({ required: true, default: '' })
    userId!: string
    @prop({ required: true, default: 0 })
    tokensPaid!: string
    @prop({ required: true, default: Date.now() })
    paymentTime!: number
}

export const lb = getModelForClass(PaymentData)


export async function createPayment(userId: any, score: any, tokensPaid: any) {
    const id = Date.now();
    await lb.collection.drop();
    await lb.createCollection();

}


