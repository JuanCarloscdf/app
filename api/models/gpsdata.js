import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  userId: { type: String, required: [true] },
  dId: { type: String, required: [true] },
  variable: { type: String, required: [true] },
  position: { type: Object, required: [true] },
  time: { type: Number, required: [true] }
});

// Convertir a modelo
const Gpsdata = mongoose.model("Gpsdata", dataSchema);

export default Gpsdata;