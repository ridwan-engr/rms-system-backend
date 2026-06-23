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

      voltage: {
        type: Number,
        default: 0
      },

      frequency: {
        type: Number,
        default: 50
      },

      powerAvailable: {
        type: Number,
        default: 0
      },

      outageStatus: {
        type: Boolean,
        default: false
      },

      outageDurationMinutes: {
        type: Number,
        default: 0
      }
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