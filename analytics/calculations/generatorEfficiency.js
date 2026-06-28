/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Generator Performance & Efficiency
 *
 * Standards:
 * ISO 3046
 * IEC 60034
 *
 * ============================================================
 */


/**
 * Generator Load Factor
 *
 * Load Factor =
 * Output Power / Rated Power
 */

export function calculateLoadFactor(

    outputPower,

    ratedPower

){

    if(ratedPower<=0)

        throw new Error("Invalid rated power.");

    return Number(

        (

            outputPower/

            ratedPower

        ).toFixed(4)

    );

}


/**
 * Generator Efficiency
 *
 * η =
 *
 * Electrical Output
 * ------------------
 * Fuel Energy Input
 */

export function calculateGeneratorEfficiency(

    electricalOutput,

    fuelEnergyInput

){

    if(fuelEnergyInput<=0)

        return 0;

    return Number(

        (

            electricalOutput/

            fuelEnergyInput

        ).toFixed(4)

    );

}


/**
 * Fuel Consumption
 *
 * Fuel (L/h)
 *
 * =
 *
 * Output × SFC
 */

export function calculateFuelConsumption(

    outputPower,

    specificFuelConsumption=0.27

){

    return Number(

        (

            outputPower*

            specificFuelConsumption

        ).toFixed(2)

    );

}


/**
 * Specific Fuel Consumption
 *
 * L/kWh
 */

export function calculateSpecificFuelConsumption(

    fuelUsed,

    energyGenerated

){

    if(energyGenerated<=0)

        return 0;

    return Number(

        (

            fuelUsed/

            energyGenerated

        ).toFixed(3)

    );

}


/**
 * Fuel Cost
 */

export function calculateFuelCost(

    fuelConsumed,

    dieselPrice

){

    return Number(

        (

            fuelConsumed*

            dieselPrice

        ).toFixed(2)

    );

}


/**
 * CO₂ Emission
 *
 * Diesel
 *
 * 2.68 kg/L
 */

export function calculateGeneratorEmission(

    fuelConsumed,

    emissionFactor=2.68

){

    return Number(

        (

            fuelConsumed*

            emissionFactor

        ).toFixed(2)

    );

}


/**
 * Runtime Estimate
 */

export function estimateGeneratorRuntime(

    fuelTank,

    fuelConsumption

){

    if(fuelConsumption<=0)

        return 0;

    return Number(

        (

            fuelTank/

            fuelConsumption

        ).toFixed(2)

    );

}


/**
 * Generator Health
 */

export function calculateGeneratorHealth({

    efficiency,

    loadFactor,

    oilPressure,

    coolantTemperature

}){

    let score=100;

    if(efficiency<0.30)

        score-=25;

    if(loadFactor>0.90)

        score-=15;

    if(oilPressure<2)

        score-=20;

    if(coolantTemperature>95)

        score-=20;

    return Math.max(0,score);

}


/**
 * Maintenance Due
 */

export function maintenanceStatus(

    operatingHours,

    maintenanceInterval=250

){

    const remaining=

        maintenanceInterval-

        (operatingHours%

        maintenanceInterval);

    return{

        remainingHours:remaining,

        due:remaining<=10

    };

}


/**
 * Generator Rating
 */

export function classifyGenerator(

    efficiency

){

    if(efficiency>=0.40)

        return "Excellent";

    if(efficiency>=0.35)

        return "Very Good";

    if(efficiency>=0.30)

        return "Good";

    if(efficiency>=0.25)

        return "Average";

    return "Poor";

}