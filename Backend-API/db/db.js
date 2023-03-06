const mongoose = require('mongoose')
const MONGODBURI = process.env.MONGODBURI

module.exports = async () => {
  mongoose.set('strictQuery', false)
  const mongooseConnect = await mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  if (mongooseConnect) {
    console.log('Connected to Database')
  } else {
    console.log('Not Connected to Database')
  }
}
