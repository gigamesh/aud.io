const mongoose = require('mongoose');

const userGearItemSchema = mongoose.Schema({
  ownerId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      "Instruments",
      "Rack-Mounted FX",
      "Mixing Boards",
      "Microphones",
      "Pedal FX",
      "Cables",
      "Accessories"
    ]
  },
  specificType: {
    type: String,
    required: true,
    maxlength: 50
  },
  make: {
    type: String,
    maxlength: 50
  },
  model: {
    type: String,
    maxlength: 50
  },
  originalPurchaseDate: {
    type: String,
    maxlength: 50
  },
  rentalPrice: {
    type: Number,
    required: true
  },
  estimatedValue: {
    type: Number
  },
  photos: {
    primary: {
      type: String,
      maxlength: 300
    },
    secondary: [{
      type: String,
      maxlength: 300
    }]
  }
},{timestamps: true})

const UserGearItem = mongoose.model('UserGearItem', userGearItemSchema);

module.exports = { UserGearItem }
