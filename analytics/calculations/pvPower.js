/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Photovoltaic (PV) Performance Model
 *
 * Standards:
 * IEC 61724
 * IEC 61215
 * NREL PVWatts Concepts
 *
 * ============================================================
 */


/**
 * Calculate DC PV Power
 *
 * Formula:
 *
 * Pdc =
 * Irradiance/1000
 * × Capacity
 * × ModuleEfficiency
 * × TemperatureFactor
 */

export function calculateDCPower({

    irradiance,

    capacity,

    moduleEfficiency = 0.20,

    temperatureFactor = 1

}){

    if(

        irradiance < 0 ||

        capacity <= 0

    ){

        throw new Error("Invalid PV inputs.");

    }

    const power =

        (

            irradiance / 1000

        ) *

        capacity *

        moduleEfficiency *

        temperatureFactor;

    return Number(

        power.toFixed(2)

    );

}


/**
 * Temperature Correction
 *
 * Typical coefficient:
 *
 * -0.0045 / °C
 */

export function calculateTemperatureFactor(

    cellTemperature,

    referenceTemperature = 25,

    coefficient = -0.0045

){

    const factor =

        1 +

        coefficient *

        (

            cellTemperature -

            referenceTemperature

        );

    return Number(

        factor.toFixed(4)

    );

}


/**
 * AC Power
 *
 * Inverter Efficiency
 */

export function calculateACPower(

    dcPower,

    inverterEfficiency = 0.97

){

    return Number(

        (

            dcPower *

            inverterEfficiency

        ).toFixed(2)

    );

}


/**
 * Daily Energy
 *
 * Peak Sun Hours
 */

export function calculateDailyEnergy(

    acPower,

    peakSunHours

){

    return Number(

        (

            acPower *

            peakSunHours

        ).toFixed(2)

    );

}


/**
 * Specific Yield
 *
 * kWh/kWp
 */

export function calculateSpecificYield(

    dailyEnergy,

    installedCapacity

){

    if(installedCapacity<=0)

        return 0;

    return Number(

        (

            dailyEnergy /

            installedCapacity

        ).toFixed(2)

    );

}


/**
 * Capacity Factor
 */

export function calculateCapacityFactor(

    dailyEnergy,

    installedCapacity

){

    if(installedCapacity<=0)

        return 0;

    return Number(

        (

            dailyEnergy /

            (

                installedCapacity *

                24

            )

            *100

        ).toFixed(2)

    );

}


/**
 * Performance Ratio
 *
 * IEC61724
 */

export function calculatePerformanceRatio(

    actualEnergy,

    referenceEnergy

){

    if(referenceEnergy<=0)

        return 0;

    return Number(

        (

            actualEnergy /

            referenceEnergy

        ).toFixed(3)

    );

}


/**
 * Solar Utilization
 */

export function calculateSolarUtilization(

    solarEnergy,

    totalLoad

){

    if(totalLoad<=0)

        return 0;

    return Number(

        (

            solarEnergy /

            totalLoad

            *100

        ).toFixed(2)

    );

}


/**
 * PV Status
 */

export function classifyPVPerformance(

    performanceRatio

){

    if(performanceRatio>=0.90)

        return "Excellent";

    if(performanceRatio>=0.80)

        return "Very Good";

    if(performanceRatio>=0.70)

        return "Good";

    if(performanceRatio>=0.60)

        return "Average";

    return "Poor";

}