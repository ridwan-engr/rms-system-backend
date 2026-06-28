import mongoose from "mongoose";

const generatorSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site"
      },
      generatorName:String,

      capacityKW: Number,

      fuelType: String,

      fuelLevel: Number,

      fuelConsumption: Number,

      runningHours: Number,

      outputPower: Number,

      engineTemperature: Number,
      
      oilPressure: Number,
      
      maintenanceDueHours: Number,

      status: {
        type: String,
        enum: [
          "running",
          "stopped"
        ]
      }
    }
  );

export const Generator =
  mongoose.model(
    "Generator",
    generatorSchema
  );
  