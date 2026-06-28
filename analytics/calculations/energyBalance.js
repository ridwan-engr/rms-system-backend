/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Energy Balance Engine
 *
 * Standards
 * ----------
 * IEC 60364
 * IEEE Microgrid Practices
 * IEC 61724
 *
 * This module acts as the central power balance
 * calculator for HEMAP.
 *
 * ============================================================
 */

import {

    calculateRenewablePercentage

}

from "./renewableFraction.js";

import {

    calculateENS

}

from "./ens.js";


/**
 * ------------------------------------------------------------
 * Total Energy Generation
 * ------------------------------------------------------------
 */

export function calculateTotalGeneration({

    solar = 0,

    batteryDischarge = 0,

    generator = 0,

    gridImport = 0

}){

    return Number(

        (

            solar +

            batteryDischarge +

            generator +

            gridImport

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Total Energy Consumption
 * ------------------------------------------------------------
 */

export function calculateTotalConsumption({

    load = 0,

    batteryCharge = 0,

    gridExport = 0

}){

    return Number(

        (

            load +

            batteryCharge +

            gridExport

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Net Energy Balance
 * ------------------------------------------------------------
 *
 * Positive  -> Surplus
 *
 * Negative  -> Deficit
 *
 */

export function calculateEnergyBalance(

    generation,

    consumption

){

    return Number(

        (

            generation -

            consumption

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * System Status
 * ------------------------------------------------------------
 */

export function classifyEnergyBalance(

    balance

){

    if(balance>0)

        return "Surplus";

    if(balance<0)

        return "Deficit";

    return "Balanced";

}


/**
 * ------------------------------------------------------------
 * Renewable Penetration
 * ------------------------------------------------------------
 */

export function renewablePenetration({

    solar=0,

    totalGeneration

}){

    return calculateRenewablePercentage(

        solar,

        totalGeneration

    );

}


/**
 * ------------------------------------------------------------
 * Grid Dependency
 * ------------------------------------------------------------
 */

export function gridDependency(

    gridImport,

    totalGeneration

){

    if(totalGeneration<=0)

        return 0;

    return Number(

        (

            gridImport/

            totalGeneration

            *

            100

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Generator Dependency
 * ------------------------------------------------------------
 */

export function generatorDependency(

    generator,

    totalGeneration

){

    if(totalGeneration<=0)

        return 0;

    return Number(

        (

            generator/

            totalGeneration

            *

            100

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Battery Contribution
 * ------------------------------------------------------------
 */

export function batteryContribution(

    battery,

    totalGeneration

){

    if(totalGeneration<=0)

        return 0;

    return Number(

        (

            battery/

            totalGeneration

            *

            100

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Solar Contribution
 * ------------------------------------------------------------
 */

export function solarContribution(

    solar,

    totalGeneration

){

    if(totalGeneration<=0)

        return 0;

    return Number(

        (

            solar/

            totalGeneration

            *

            100

        ).toFixed(2)

    );

}


/**
 * ------------------------------------------------------------
 * Energy Balance Report
 * ------------------------------------------------------------
 */

export function calculateEnergyReport({

    solar=0,

    batteryDischarge=0,

    batteryCharge=0,

    generator=0,

    gridImport=0,

    gridExport=0,

    load=0,

    duration=1

}){

    const generation=

        calculateTotalGeneration({

            solar,

            batteryDischarge,

            generator,

            gridImport

        });

    const consumption=

        calculateTotalConsumption({

            load,

            batteryCharge,

            gridExport

        });

    const balance=

        calculateEnergyBalance(

            generation,

            consumption

        );

    const ens=

        calculateENS(

            consumption,

            generation,

            duration

        );

    return{

        generation,

        consumption,

        balance,

        status:

            classifyEnergyBalance(balance),

        renewablePercentage:

            renewablePenetration({

                solar,

                totalGeneration:generation

            }),

        solarContribution:

            solarContribution(

                solar,

                generation

            ),

        batteryContribution:

            batteryContribution(

                batteryDischarge,

                generation

            ),

        generatorContribution:

            generatorDependency(

                generator,

                generation

            ),

        gridDependency:

            gridDependency(

                gridImport,

                generation

            ),

        energyNotSupplied:

            ens

    };

}