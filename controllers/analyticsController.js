import { asyncHandler }
from "../utils/asyncHandler.js";

import {
  calculateSAIDI,
  calculateSAIFI,
  calculateENS,
  calculateLOLP,
  calculateRecoveryTime,
  calculateCriticalLoadServed,
  calculateResilienceIndex,
  calculateEnergyMix
}
from "../services/analyticsService.js";

export const getSAIDI =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    saidi:
      await calculateSAIDI()
  });

});

export const getSAIFI =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    saifi:
      await calculateSAIFI()
  });

});

export const getENS =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    ens:
      await calculateENS()
  });

});

export const getLOLP =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    lolp:
      await calculateLOLP()
  });

});

export const getRecoveryTime =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    recovery:
      await calculateRecoveryTime()
  });

});

export const getCriticalLoad =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    criticalLoadServed:
      await calculateCriticalLoadServed()
  });

});

export const getResilience =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    resilience:
      await calculateResilienceIndex()
  });

});

export const getEnergyMix =
asyncHandler(async (req, res) => {

  res.json({
    success: true,
    energyMix:
      await calculateEnergyMix()
  });

});