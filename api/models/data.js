import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  userId: { type: String, required: [true] },
  dId: { type: String, required: [true] },
  variable: { type: String, required: [true] },
  value: { type: Number },
  value2: { type: Number },
  lat: { type: Number },
  lng: { type: Number },
  inmsg:{type: String},
  time: { type: Number, required: [true] }
});

// Convertir a modelo
const Data = mongoose.model("Data", dataSchema);

export default Data;
