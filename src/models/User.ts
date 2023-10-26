import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true, collation: { locale: 'en', strength: 2 } } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'en' })
  language!: string
  @prop({ required: false, default: '' })
  username!: string | undefined
  @prop({ required: false, default: '' })
  address!: string
  @prop({ required: false, default: '' })
  pkey!: string
  @prop({ required: false, default: '' })
  seed!: string
  @prop({ required: true, default: false })
  premium!: boolean
  @prop({ required: false, default: '' })
  thandle!: string
  @prop({ required: true, default: false })
  onft!: boolean
  @prop({ required: true, default: false })
  onpt!: boolean
  @prop({ required: true, default: false })
  onst!: boolean
  @prop({ required: true, default: false })
  alerts!: boolean
  @prop({ required: true, default: 0 })
  mintwitter!: number
  @prop({ required: true, default: 0 })
  minscore!: number
  @prop({ required: false, default: '' })
  stKey!: string
  @prop({ required: false, default: '' })
  ftKey!: string
  @prop({ required: false, default: '' })
  ptKey!: string
  @prop({ required: true, default: 0 })
  maxgas!: number
  @prop({ required: true, default: 0 })
  maxlimit!: number
}

const UserModel = getModelForClass(User)

export function findOrCreateUser(id: number) {


  console.log(' ****************   Inside findOrCreateUser ' + id);
  return UserModel.findOneAndUpdate(
    { id },
    {},
    {
      upsert: true,
      new: true,
    }
  )
}
