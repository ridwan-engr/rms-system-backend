import mongoose from "mongoose";

const faultLogSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
      },

      equipment: {
        type: String,
        enum: [
          "solar",
          "battery",
          "generator",
          "grid",
          "inverter"
        ]
      },

      faultCode: {
        type: String,
        required: true
      },

      faultCategory: {
        type: String,
        required: true
      },

      description: {
        type: String,
        required: true
      },

      severity: {
        type: String,
        enum: [
          "low",
          "medium",
          "high",
          "critical"
        ],
        default: "medium"
      },

      rootCause: {
        type: String,
        required: true
      },

      technician: {
        type: String,
        required: true
      },

      status: {
        type: String,
        enum: [
          "open",
          "in_progress",
          "resolved"
        ],
        default: "open"
      },

      acknowledged: {
        type: String,
        required: true
      },

      downTime: {
        type: Date,
        default: Date.now
      },

      mttr: {
        type: Number,
        required: true
      },

      detectedAt: {
        type: Date
      },

      resolvedAt: {
        type: Number,
        default: 0
      }
    },
    {
      timestamps: true
    }
  );

export const FaultLog =
  mongoose.model(
    "FaultLog",
    faultLogSchema
  );