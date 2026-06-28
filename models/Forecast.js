import { isNumber } from "lodash";
import mongoose from "mongoose";

const forecastSchema =
  new mongoose.Schema(
    {
      siteId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Site",
        required: true
      },

      forecastDate: {
        type: Date,
        default: Date.now
      },

      weather: Number,

      irradiance: Number,

      ambientTemperature: Number,

      pvForecast: Number,

      loadForest: Number,

      batterySOCForecast: Number,

      batteryAutonomy: Number,

      generatorRuntimeForecast: Number,

      gridAvailabilityForecast: Number,

      renewableContributionForecast: Number,

      dieselForecast: Number,

      co2Forecast: Number,

      confidenceLevel: Number

    },
    {
      timestamps: true
    }
  );

export const Forecast =
  mongoose.model(
    "Forecast",
    forecastSchema
  );