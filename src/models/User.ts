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
  wallet!: string
  @prop({ required: false, default: '' })
  balance!: string
  @prop({ required: true, default: 0 })
  topscore!: number
  @prop({ required: false, default: '' })
  currentOpenGameId!: string
  @prop({ required: false })
  typeStartTime!: number
  @prop({ required: false })
  typeEndTime!: number
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
