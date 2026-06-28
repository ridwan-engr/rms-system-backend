import { truncate } from "lodash";
import mongoose from "mongoose";

const gridSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
      },

      feederName: {
        type: String,
        required: true
      },

      voltage: {
        type: Number,
        default: 0
      },

      frequency: {
        type: Number,
        default: 50
      },

      activePower: {
        type: Number,
        default: 0
      },

      outageStatus: {
        type: Boolean,
        default: false
      },

      reactivePower: {
        type: Number,
        default: 0
      },

      apparentPower: {
        type: Number,
        default: 0
      },

      powerFactor: {
        type: Number,
        default: 0
      },

      availability: {
        type: Boolean,
        default: true
      },

      monthlyOutages:Number,
      
      SAIFI: Number,
      SAIDI: Number,
      ENS: Number,
      LOLP: Number
    
    },
    {
      timestamps: true
    }
  );

export const Grid =
  mongoose.model(
    "Grid",
    gridSchema
  );