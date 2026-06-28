/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Loss of Load Probability (LOLP)
 *
 * Standard:
 * IEEE Reliability Assessment
 *
 * Description:
 * Calculates the probability that available generation
 * cannot satisfy the load demand.
 *
 * Formula
 *
 * LOLP = Number of Deficit Periods
 *        -------------------------
 *         Total Observation Periods
 *
 * ============================================================
 */


/**
 * Calculate LOLP
 *
 * @param {Array}
 *
 * [
 *   {
 *      loadDemand,
 *      availablePower
 *   }
 * ]
 *
 * @returns {Number}
 */

export function calculateLOLP(records = []) {

    if (!Array.isArray(records)) {

        throw new Error(
            "Records must be an array."
        );

    }

    if (records.length === 0) {

        return 0;

    }

    let deficitPeriods = 0;

    for (const record of records) {

        if (

            record.loadDemand === undefined ||

            record.availablePower === undefined

        ) {

            throw new Error(

                "Each record must contain loadDemand and availablePower."

            );

        }

        if (

            record.availablePower < record.loadDemand

        ) {

            deficitPeriods++;

        }

    }

    return Number(

        (

            deficitPeriods /

            records.length

        ).toFixed(4)

    );

}


/**
 * Reliability
 *
 * Reliability
 *
 * = 1 − LOLP
 */

export function calculateReliability(lolp) {

    if (

        lolp < 0 ||

        lolp > 1

    ) {

        throw new Error(

            "LOLP must be between 0 and 1."

        );

    }

    return Number(

        (1 - lolp).toFixed(4)

    );

}


/**
 * Percentage Reliability
 */

export function calculateReliabilityPercent(lolp) {

    return Number(

        (

            calculateReliability(lolp)

            * 100

        ).toFixed(2)

    );

}


/**
 * Risk Classification
 */

export function classifyLOLP(lolp) {

    if (lolp <= 0.01)

        return "Excellent";

    if (lolp <= 0.05)

        return "Good";

    if (lolp <= 0.10)

        return "Acceptable";

    if (lolp <= 0.20)

        return "Poor";

    return "Critical";

}


/**
 * Calculate LOLP from probability table
 *
 * [
 *   {
 *      probability,
 *      loadLoss
 *   }
 * ]
 *
 * LOLP =
 * Σ(probability)
 * where loadLoss == true
 */

export function calculateLOLPFromStates(states = []) {

    if (!Array.isArray(states))

        throw new Error("States must be an array.");

    let lolp = 0;

    states.forEach(state => {

        if (state.loadLoss === true) {

            lolp += state.probability;

        }

    });

    return Number(

        lolp.toFixed(4)

    );

}