import mongoose from "mongoose";

const energyRecordSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
      },

      solarPower: {
        type: Number,
        default: 0
      },

      batteryPower: {
        type: Number,
        default: 0
      },

      batteryMode: {
        type: Number,
        default: 0
      },

      generatorPower: {
        type: Number,
        default: 0
      },

      gridPower: {
        type: Number,
        default: 0
      },

      loadPower: {
        type: Number,
        default: 0
      },

      renewableContribution: {
        type: Number,
        default: 0
      },

      dieselSaved: {
        type: Number,
        default: 0
      },

      co2Reduction: {
        type: Number,
        default: 0
      },

      systemEfficiency: {
        type: Number,
        default: 0
      },

      totalGeneration: {
        type: Number,
        default: 0
      },

      totalConsumption: {
        type: Number,
        default: 0
      }

    },
    {
      timestamps: true
    }
  );

export const EnergyRecord =
  mongoose.model(
    "EnergyRecord",
    energyRecordSchema
  );