/**
 * ============================================================
 * HEMAP Engineering Analytics Library
 * ------------------------------------------------------------
 * Module:
 * SAIFI
 *
 * System Average Interruption Frequency Index
 *
 * IEEE 1366
 *
 * Formula
 *
 * SAIFI =
 *
 * Σ(Customer Interruptions)
 * --------------------------
 * Total Customers Served
 *
 * Unit
 *
 * Interruptions / Customer
 *
 * ============================================================
 */


/**
 * Calculate SAIFI
 *
 * @param {Number} customerInterruptions
 * @param {Number} customersServed
 *
 * @returns {Number}
 */

export function calculateSAIFI(

    customerInterruptions,

    customersServed

){

    if(

        customerInterruptions === undefined ||

        customersServed === undefined

    ){

        throw new Error(

            "Both customerInterruptions and customersServed are required."

        );

    }

    if(

        customerInterruptions < 0 ||

        customersServed <= 0

    ){

        throw new Error(

            "Invalid input values."

        );

    }

    return Number(

        (

            customerInterruptions /

            customersServed

        ).toFixed(4)

    );

}


/**
 * Calculate SAIFI
 * using outage events
 *
 * [
 *   {
 *      customersAffected
 *   }
 * ]
 */

export function calculateSAIFIFromEvents(

    events=[],

    customersServed

){

    if(

        !Array.isArray(events)

    ){

        throw new Error(

            "Events must be an array."

        );

    }

    if(

        customersServed <=0

    ){

        throw new Error(

            "Invalid customer count."

        );

    }

    let interruptions=0;

    events.forEach(event=>{

        interruptions +=

            Number(

                event.customersAffected || 0

            );

    });

    return calculateSAIFI(

        interruptions,

        customersServed

    );

}


/**
 * Annual SAIFI
 *
 * Monthly SAIFI values
 */

export function annualSAIFI(

    monthly=[]

){

    if(

        !Array.isArray(monthly)

    ){

        throw new Error(

            "Monthly values must be an array."

        );

    }

    if(

        monthly.length===0

    ){

        return 0;

    }

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
 * Average Monthly SAIFI
 */

export function averageMonthlySAIFI(

    monthly=[]

){

    if(

        monthly.length===0

    ){

        return 0;

    }

    const total=

        annualSAIFI(monthly);

    return Number(

        (

            total/

            monthly.length

        ).toFixed(4)

    );

}


/**
 * Reliability Rating
 */

export function classifySAIFI(

    saifi

){

    if(saifi<=0.5)

        return "Excellent";

    if(saifi<=1)

        return "Very Good";

    if(saifi<=2)

        return "Good";

    if(saifi<=3)

        return "Average";

    if(saifi<=5)

        return "Poor";

    return "Critical";

}


/**
 * Utility Availability
 *
 * Availability %
 */

export function availabilityFromSAIFI(

    saifi

){

    const availability=

        Math.max(

            0,

            100-

            saifi*5

        );

    return Number(

        availability.toFixed(2)

    );

}