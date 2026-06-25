import mongoose from "mongoose";

const analyticsSchema =
  new mongoose.Schema(
    {
      siteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Site"
      },

      saidi: {
        type: Number,
        default: 0
      },

      saifi: {
        type: Number,
        default: 0
      },

      ens: {
        type: Number,
        default: 0
      },

      lolp: {
        type: Number,
        default: 0
      },

      resilienceIndex: {
        type: Number,
        default: 0
      },

      recoveryTime: {
        type: Number,
        default: 0
      },

      criticalLoadServed: {
        type: Number,
        default: 0
      },

      energyMix: {
        solar: {
          type: Number,
          default: 0
        },

        battery: {
          type: Number,
          default: 0
        },

        generator: {
          type: Number,
          default: 0
        },

        grid: {
          type: Number,
          default: 0
        }
      }
    },
    {
      timestamps: true
    }
  );

export const Analytics =
  mongoose.model(
    "Analytics",
    analyticsSchema
  );