/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Renewable Energy Fraction (REF)
 *
 * Also Known As:
 * Renewable Penetration
 *
 * Description
 *
 * Measures the proportion of energy supplied
 * from renewable resources.
 *
 * Formula
 *
 * REF =
 *
 * Renewable Energy
 * -----------------------------
 * Total Energy Supplied
 *
 * ============================================================
 */


/**
 * Renewable Fraction
 *
 * @param {Number} renewableEnergy
 * @param {Number} totalEnergy
 */

export function calculateRenewableFraction(

    renewableEnergy,

    totalEnergy

){

    if(

        renewableEnergy === undefined ||

        totalEnergy === undefined

    ){

        throw new Error(

            "renewableEnergy and totalEnergy are required."

        );

    }

    if(

        renewableEnergy < 0 ||

        totalEnergy <=0

    ){

        throw new Error(

            "Invalid values."

        );

    }

    return Number(

        (

            renewableEnergy /

            totalEnergy

        ).toFixed(4)

    );

}


/**
 * Renewable Penetration %
 */

export function calculateRenewablePercentage(

    renewableEnergy,

    totalEnergy

){

    return Number(

        (

            calculateRenewableFraction(

                renewableEnergy,

                totalEnergy

            )

            *100

        ).toFixed(2)

    );

}


/**
 * Renewable Contribution
 *
 * Solar
 *
 * Wind
 *
 * Hydro
 *
 * Biomass
 */

export function calculateRenewableContribution({

    solar=0,

    wind=0,

    hydro=0,

    biomass=0,

    totalEnergy

}){

    const renewable =

        solar+

        wind+

        hydro+

        biomass;

    return {

        renewableEnergy:

            renewable,

        renewableFraction:

            calculateRenewableFraction(

                renewable,

                totalEnergy

            ),

        renewablePercentage:

            calculateRenewablePercentage(

                renewable,

                totalEnergy

            )

    };

}


/**
 * Fossil Energy
 */

export function calculateFossilEnergy(

    totalEnergy,

    renewableEnergy

){

    if(

        totalEnergy<renewableEnergy

    ){

        throw new Error(

            "Renewable energy cannot exceed total energy."

        );

    }

    return Number(

        (

            totalEnergy-

            renewableEnergy

        ).toFixed(2)

    );

}


/**
 * Diesel Saving
 *
 * Estimated
 */

export function calculateDieselSaving(

    renewableEnergy,

    dieselSpecificConsumption=0.28

){

    return Number(

        (

            renewableEnergy*

            dieselSpecificConsumption

        ).toFixed(2)

    );

}


/**
 * CO₂ Reduction
 *
 * Diesel emission factor
 *
 * 2.68 kg CO₂/L
 */

export function calculateCO2Reduction(

    dieselSaved,

    emissionFactor=2.68

){

    return Number(

        (

            dieselSaved*

            emissionFactor

        ).toFixed(2)

    );

}


/**
 * Sustainability Rating
 */

export function classifyRenewableFraction(

    percentage

){

    if(percentage>=90)

        return "Excellent";

    if(percentage>=75)

        return "Very High";

    if(percentage>=60)

        return "High";

    if(percentage>=40)

        return "Moderate";

    if(percentage>=20)

        return "Low";

    return "Very Low";

}