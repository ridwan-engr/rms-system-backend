import mongoose from "mongoose";

const reportSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
      },

      reportType: {
        type: String,
        enum: [
          "daily",
          "weekly",
          "monthly",
          "annual",
          "custom"
        ],
        required: true
      },

      energyGeneratedKWh: {
        type: Number,
        default: 0
      },

      energyConsumedKWh: {
        type: Number,
        default: 0
      },

      renewableContribution: {
        type: Number,
        default: 0
      },

      fuelConsumptionLitres: {
        type: Number,
        default: 0
      },

      operatingCostPerKwh: {
        type: Number,
        default: 0
      },

      carbonEmissionKg: {
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

      saidi: {
        type: Number,
        default: 0
      },

      saifi: {
        type: Number,
        default: 0
      },

      resilienceIndex: {
        type: Number,
        default: 0
      },

      criticalLoadServed: {
        type: Number,
        default: 0
      },

      generatedAt: {
        type: Date,
        default: Date.now
      }
    },
    {
      timestamps: true
    }
  );

export const Report =
  mongoose.model(
    "Report",
    reportSchema
  );