export function ens(
  demand,
  supplied
) {
  return Math.max(
    0,
    demand - supplied
  );
}

export function reliabilityIndex(
  outageHours,
  totalHours
) {
  return outageHours / totalHours;
};

export function saifi(
  customerInterruptions,
  totalCustomers
) {
  return (
    customerInterruptions /
    totalCustomers
  );
}

export function saidi(
  outageDurationMinutes,
  totalCustomers
) {
  return (
    outageDurationMinutes /
    totalCustomers
  );
}

export function caidi(
  saidi,
  saifi
) {
  return saifi === 0
    ? 0
    : saidi / saifi;
}

export function criticalLoadServed(
  criticalLoadServed,
  totalCriticalLoad
) {
  return (
    criticalLoadServed /
    totalCriticalLoad
  );
}

export function recoveryTime(
  faultTime,
  recoveryTime
) {
  return (
    new Date(recoveryTime) -
    new Date(faultTime)
  ) / 60000;
}

export function resilienceIndex(
  deliveredEnergy,
  demandedEnergy
) {
  return (
    deliveredEnergy /
    demandedEnergy
  );
}

export function lolp(
  availableCapacity,
  totalDemand
) {
  return (
    availableCapacity <
    totalDemand
  );
}
