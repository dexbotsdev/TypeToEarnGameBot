import mongoose, { connect } from 'mongoose'
import env from '@/helpers/env'

function startMongo() {
  return connect(env.MONGO)
}
mongoose.set('strictQuery', false)
export default startMongo
