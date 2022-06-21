import mongoose from "mongoose";

const Schema = mongoose.Schema

const flightSchema = new Schema ({
  airline: {
    type: String,
    enum: ['American','Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'LAX', 'SAN','DEN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max:9999,
    required: true
  },

  departs: {
    type: Date,
    default: function () {
      // return new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      const today = new Date()
      const oneYear = today.getFullYear() + 1
      today.setFullYear(oneYear)
      return today
    }
  }
},{
  timestamps: true,
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}