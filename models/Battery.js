import mongoose from "mongoose";

const batterySchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site"
      },

      capacityKWh: Number,

      soc: Number,

      chargingPowerKW: Number,

      dischargingPowerKW: Number,

      batteryName: String,
      
      chemistry: String,
    
      voltage: Number,
      
      current: Number,
      
      stateOfCharge: Number,

      stateOfHealth: String,
      
      chargeEfficiency: Number,
      
      dischargeEfficiency: Number,
      
      temperature: String,
      
      chargeCycles: Number,
      
      status: String

    },
    {
      timestamps: true
    }
  );

export const Battery =
  mongoose.model(
    "Battery",
    batterySchema
  );