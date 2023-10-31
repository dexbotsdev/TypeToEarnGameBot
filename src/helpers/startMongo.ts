import mongoose, { connect } from 'mongoose'
import env from '@/helpers/env'

const username = encodeURIComponent("dexbotdev");
const password = encodeURIComponent("Orangefire#414");
const uri = `mongodb+srv://${username}:${password}@cluster0.n6sebl1.mongodb.net/?retryWrites=true&w=majority`

function startMongo() {
  return connect(uri)
}
mongoose.set('strictQuery', false)
export default startMongo
