import { FaultLog }
from "../models/FaultLog.js";

import { EnergyRecord }
from "../models/EnergyRecord.js";

import { Forecast }
from "../models/Forecast.js";

export async function calculateSAIDI() {

  const faults =
    await FaultLog.find({
      status: "resolved"
    });

  let totalDowntime = 0;

  faults.forEach(fault => {

    if (
      fault.occurrenceTime &&
      fault.resolvedTime
    ) {

      totalDowntime +=
        (
          fault.resolvedTime -
          fault.occurrenceTime
        ) /
        (1000 * 60);

    }

  });

  return totalDowntime;
}

export async function calculateSAIFI() {

  const interruptions =
    await FaultLog.countDocuments();

  return interruptions;
}

export async function calculateENS() {

  const records =
    await EnergyRecord.find();

  let ens = 0;

  records.forEach(record => {

    if (
      record.loadDemand >
      record.energyServed
    ) {

      ens +=
        (
          record.loadDemand -
          record.energyServed
        );

    }

  });

  return ens;
}

export async function calculateLOLP() {

  const forecasts =
    await Forecast.find();

  let lossEvents = 0;

  forecasts.forEach(f => {

    if (
      f.predictedLoad >
      f.predictedGeneration
    ) {

      lossEvents++;

    }

  });

  return forecasts.length
    ? (
        lossEvents /
        forecasts.length
      )
    : 0;
}

export async function calculateRecoveryTime() {

  const faults =
    await FaultLog.find({
      status: "resolved"
    });

  if (!faults.length)
    return 0;

  let total = 0;

  faults.forEach(fault => {

    total +=
      (
        fault.resolvedTime -
        fault.occurrenceTime
      ) /
      (1000 * 60 * 60);

  });

  return total / faults.length;
}

export async function calculateCriticalLoadServed() {

  const records =
    await EnergyRecord.find();

  let criticalLoad = 0;
  let suppliedLoad = 0;

  records.forEach(record => {

    criticalLoad +=
      record.criticalLoad || 0;

    suppliedLoad +=
      record.criticalLoadServed || 0;

  });

  return criticalLoad
    ? (
        suppliedLoad /
        criticalLoad
      ) * 100
    : 0;
}

export async function calculateResilienceIndex() {

  const cls =
    await calculateCriticalLoadServed();

  const recovery =
    await calculateRecoveryTime();

  if (recovery === 0)
    return cls;

  return cls / recovery;
}

export async function calculateEnergyMix() {

  const records =
    await EnergyRecord.find();

  let solar = 0;
  let battery = 0;
  let generator = 0;
  let grid = 0;

  records.forEach(record => {

    solar +=
      record.solarEnergy || 0;

    battery +=
      record.batteryEnergy || 0;

    generator +=
      record.generatorEnergy || 0;

    grid +=
      record.gridEnergy || 0;

  });

  return {
    solar,
    battery,
    generator,
    grid
  };
}