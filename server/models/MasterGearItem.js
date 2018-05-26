const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

const masterGearItemSchema = mongoose.Schema({
  category:{
    type: String,
    enum: [
      "Instruments",
      "Rack-Mounted FX",
      "Mixing Boards",
      "Microphones",
      "Pedal FX",
      "Cables",
      "Accessories",
      "Monitors",
      "Amplifiers"
    ]
  },
  specificType: {
    type: String,
    maxlength: 50,
  },
  make: {
    type: String,
    maxlength: 50
  },
  model: {
    type: String,
    maxlength: 50
  }
},{timestamps: true})

masterGearItemSchema.index({make: 1, model: 1}, {unique: true})

masterGearItemSchema.plugin(findOrCreate);
const MasterGearItem = mongoose.model('MasterGearItem', masterGearItemSchema);

module.exports = { MasterGearItem }
