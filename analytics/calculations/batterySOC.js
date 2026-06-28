/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * Battery State of Charge (SOC)
 *
 * IEC 62933
 * IEEE Battery Storage Guidelines
 *
 * Compatible with:
 *
 * Lithium-ion
 * Lead Acid
 * AGM
 * Gel
 *
 * ============================================================
 */


/**
 * Coulomb Counting SOC
 *
 * SOCnew =
 *
 * SOCold +
 *
 * (ChargingEnergy × ηcharge)
 *
 * -
 *
 * (DischargingEnergy / ηdischarge)
 *
 * -----------------------------------
 *
 * Battery Capacity
 */

export function calculateSOC({

    previousSOC,

    batteryCapacity,

    chargingEnergy = 0,

    dischargingEnergy = 0,

    chargingEfficiency = 0.95,

    dischargingEfficiency = 0.95

}) {

    if (

        batteryCapacity <= 0

    ) {

        throw new Error(

            "Battery capacity must be greater than zero."

        );

    }

    let soc =

        previousSOC +

        (

            chargingEnergy *

            chargingEfficiency

        )

        /

        batteryCapacity -

        (

            dischargingEnergy /

            dischargingEfficiency

        )

        /

        batteryCapacity;

    soc = Math.max(

        0,

        Math.min(

            1,

            soc

        )

    );

    return Number(

        soc.toFixed(4)

    );

}


/**
 * SOC %
 */

export function calculateSOCPercentage(

    soc

) {

    return Number(

        (

            soc *

            100

        ).toFixed(2)

    );

}


/**
 * Remaining Energy
 */

export function remainingEnergy(

    soc,

    batteryCapacity

) {

    return Number(

        (

            soc *

            batteryCapacity

        ).toFixed(2)

    );

}


/**
 * Depth of Discharge
 *
 * DOD = 1 − SOC
 */

export function calculateDOD(

    soc

) {

    return Number(

        (

            1 -

            soc

        ).toFixed(4)

    );

}


/**
 * DOD %
 */

export function calculateDODPercentage(

    soc

) {

    return Number(

        (

            (

                1 -

                soc

            )

            *100

        ).toFixed(2)

    );

}


/**
 * Battery Runtime
 *
 * Runtime =
 *
 * Remaining Energy
 *
 * -----------------
 *
 * Load
 */

export function estimateRuntime(

    remainingEnergy,

    load

) {

    if (

        load <= 0

    )

        return 0;

    return Number(

        (

            remainingEnergy /

            load

        ).toFixed(2)

    );

}


/**
 * Round Trip Efficiency
 */

export function calculateRoundTripEfficiency(

    chargingEfficiency,

    dischargingEfficiency

) {

    return Number(

        (

            chargingEfficiency *

            dischargingEfficiency *

            100

        ).toFixed(2)

    );

}


/**
 * Battery Status
 */

export function classifyBatterySOC(

    percentage

) {

    if (

        percentage >= 90

    )

        return "Fully Charged";

    if (

        percentage >= 70

    )

        return "Healthy";

    if (

        percentage >= 50

    )

        return "Normal";

    if (

        percentage >= 30

    )

        return "Low";

    if (

        percentage >= 15

    )

        return "Critical";

    return "Shutdown";

}


/**
 * Battery Health Alarm
 */

export function batteryAlarm(

    percentage

) {

    return percentage < 20;

}