import { getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class UserInfo {
    @prop({ required: true, default: 'StarsArena' })
    network!: string
    @prop({ required: true, default: '', unique: true })
    address!: string
    @prop({ required: true, default: '' })
    handle!: string
    @prop({ required: false, default: 0 })
    score!: number
    @prop({ required: false, default: 0 })
    twtCount!: number
    @prop({ required: false, default: '0 AVAX' })
    avax!: string
    @prop({ required: false, default: '0 ETH' })
    ftprice!: string
    @prop({ required: false, default: '0 AVAX' })
    price!: string
    @prop({ required: false, default: 0 })
    followCount!: number
    @prop({ type: String, required: false, default: [] })
    followers!: mongoose.Types.Array<string>;
}

const UserSocials = getModelForClass(UserInfo)


export function createUser(address: any, handle: any, score: any, twtCount: any, avax: any, ftPrice: any, price: any, followCount: any, followers: any) {
    try {
        return UserSocials.create(
            { address, handle, score, twtCount, avax, ftPrice, price, followCount, followers }
        )
    } catch (error) {
        return null
    }
}


export async function findUserByAddress(address: string) {

    const d = await UserSocials.findOne(
        { address: { '$regex': address, $options: 'i' } }
    ).exec();

    console.log(d);

    return d;
}

export async function findUserByHandle(handle: string) {
    const d = await UserSocials.findOne(
        { handle: { '$regex': handle, $options: 'i' } }
    ).exec();

    console.log(d);

    return d;
}



