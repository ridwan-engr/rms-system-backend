/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Energy Not Supplied (ENS)
 *
 * Standard:
 * IEEE Reliability Assessment
 *
 * Description:
 * Calculates the total energy that could not be supplied
 * due to interruptions or insufficient generation.
 *
 * Unit:
 * kWh
 *
 * Formula:
 *
 * ENS = Σ (LoadDemand − AvailablePower) × Duration
 *
 * where
 *
 * LoadDemand > AvailablePower
 *
 * otherwise
 *
 * ENS = 0
 *
 * ============================================================
 */


/**
 * Calculate Energy Not Supplied
 *
 * @param {Number} loadDemand
 * @param {Number} availablePower
 * @param {Number} duration
 *
 * duration in hours
 *
 * @returns {Number}
 */

export function calculateENS(

    loadDemand,

    availablePower,

    duration

) {

    if (

        loadDemand === undefined ||

        availablePower === undefined ||

        duration === undefined

    ) {

        throw new Error(

            "ENS requires loadDemand, availablePower and duration."

        );

    }

    if (

        loadDemand < 0 ||

        availablePower < 0 ||

        duration < 0

    ) {

        throw new Error(

            "Negative values are not allowed."

        );

    }

    const deficit =

        Math.max(

            0,

            loadDemand - availablePower

        );

    const ens =

        deficit * duration;

    return Number(

        ens.toFixed(3)

    );

}


/**
 * Calculate ENS for multiple intervals
 *
 * @param {Array}
 *
 * [
 *   {
 *      loadDemand,
 *      availablePower,
 *      duration
 *   }
 * ]
 */

export function calculateTotalENS(records = []) {

    if (!Array.isArray(records)) {

        throw new Error(

            "Records must be an array."

        );

    }

    let totalENS = 0;

    for (const record of records) {

        totalENS += calculateENS(

            record.loadDemand,

            record.availablePower,

            record.duration

        );

    }

    return Number(

        totalENS.toFixed(3)

    );

}


/**
 * Percentage ENS
 *
 * ENS%
 *
 * = ENS
 *   -----
 *   Energy Demand
 *
 */

export function calculateENSPercentage(

    totalENS,

    energyDemand

) {

    if (energyDemand <= 0)

        return 0;

    return Number(

        (

            totalENS /

            energyDemand

        ) * 100

    ).toFixed(2);

}


/**
 * Availability
 *
 * Availability %
 *
 * =

 * 100 - ENS%
 */

export function calculateAvailability(

    totalENS,

    energyDemand

) {

    const ensPercent =

        Number(

            calculateENSPercentage(

                totalENS,

                energyDemand

            )

        );

    return Number(

        (100 - ensPercent)

        .toFixed(2)

    );

}


/**
 * Average ENS
 */

export function averageENS(records = []) {

    if (!records.length)

        return 0;

    return Number(

        (

            calculateTotalENS(records)

            /

            records.length

        ).toFixed(3)

    );

}