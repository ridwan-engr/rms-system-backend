/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * SAIDI
 *
 * System Average Interruption Duration Index
 *
 * IEEE 1366
 *
 * Formula
 *
 * SAIDI =
 *
 * Σ(Customer Interruption Duration)
 * ---------------------------------
 * Total Customers Served
 *
 * Unit
 *
 * Hours / Customer
 *
 * ============================================================
 */


/**
 * Calculate SAIDI
 *
 * @param {Number} customerInterruptionDuration
 * @param {Number} customersServed
 *
 * @returns {Number}
 */

export function calculateSAIDI(

    customerInterruptionDuration,

    customersServed

){

    if(

        customerInterruptionDuration === undefined ||

        customersServed === undefined

    ){

        throw new Error(

            "Both customerInterruptionDuration and customersServed are required."

        );

    }

    if(

        customerInterruptionDuration < 0 ||

        customersServed <= 0

    ){

        throw new Error(

            "Invalid input values."

        );

    }

    return Number(

        (

            customerInterruptionDuration /

            customersServed

        ).toFixed(4)

    );

}


/**
 * Calculate SAIDI from outage events
 *
 * Event Format
 *
 * {
 *    customersAffected,
 *    duration
 * }
 */

export function calculateSAIDIFromEvents(

    events=[],

    customersServed

){

    if(!Array.isArray(events))

        throw new Error(

            "Events must be an array."

        );

    if(customersServed<=0)

        throw new Error(

            "Invalid customer count."

        );

    let totalDuration=0;

    events.forEach(event=>{

        totalDuration +=

            Number(event.customersAffected || 0)

            *

            Number(event.duration || 0);

    });

    return calculateSAIDI(

        totalDuration,

        customersServed

    );

}


/**
 * Annual SAIDI
 */

export function annualSAIDI(

    monthly=[]

){

    if(!Array.isArray(monthly))

        throw new Error(

            "Monthly values must be an array."

        );

    if(monthly.length===0)

        return 0;

    const total=

        monthly.reduce(

            (sum,value)=>

            sum+Number(value),

            0

        );

    return Number(

        total.toFixed(4)

    );

}


/**
 * Average Monthly SAIDI
 */

export function averageMonthlySAIDI(

    monthly=[]

){

    if(monthly.length===0)

        return 0;

    return Number(

        (

            annualSAIDI(monthly)

            /

            monthly.length

        ).toFixed(4)

    );

}


/**
 * Customer Average Interruption Duration Index
 *
 * CAIDI
 *
 * SAIDI
 * -----
 * SAIFI
 */

export function calculateCAIDI(

    saidi,

    saifi

){

    if(saifi<=0)

        return 0;

    return Number(

        (

            saidi /

            saifi

        ).toFixed(4)

    );

}


/**
 * Reliability Classification
 */

export function classifySAIDI(

    saidi

){

    if(saidi<=1)

        return "Excellent";

    if(saidi<=2)

        return "Very Good";

    if(saidi<=4)

        return "Good";

    if(saidi<=8)

        return "Average";

    if(saidi<=12)

        return "Poor";

    return "Critical";

}


/**
 * Availability %
 *
 * Total Hours = 8760
 */

export function calculateAvailabilityFromSAIDI(

    saidi,

    annualHours=8760

){

    if(annualHours<=0)

        return 0;

    return Number(

        (

            (

                annualHours-saidi

            )

            /

            annualHours

            *

            100

        ).toFixed(5)

    );

}