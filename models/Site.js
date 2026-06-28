import mongoose from "mongoose";

const siteSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      trim: true
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    status:{
        type:String,
        trim:true,
        default:"Active"
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    },

    siteType: {
      type: String,
      default: true
    },

    commissioningDate: {
      type: Date,
      default: true
    }


  },
  {
    timestamps: true
  }
);

export const Site = mongoose.model(
  "Site",
  siteSchema
);
