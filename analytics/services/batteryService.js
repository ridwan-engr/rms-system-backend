/**
 * ============================================================
 * HEMAP
 * Battery Analytics Service
 *
 * Standards
 * ----------
 * IEC 62933
 * IEEE Battery Storage
 *
 * Used By
 *
 * Dashboard
 * BatteryChart
 * BatteryGauge
 * Monitoring
 * Reports
 * Digital Twin
 *
 * ============================================================
 */

import { Battery } from "../../models/battery.js";

import {

    calculateSOCPercentage,

    remainingEnergy,

    calculateDODPercentage,

    estimateRuntime,

    calculateRoundTripEfficiency,

    classifyBatterySOC,

    batteryAlarm

}

from "../calculations/batterySOC.js";


/**
 * ------------------------------------------------------------
 * Battery Dashboard
 * ------------------------------------------------------------
 */

export async function batteryDashboard(){

    const batteries =

        await Battery.find();

    if(!batteries.length){

        return{

            totalBatteries:0,

            averageSOC:0,

            averageDOD:0,

            totalEnergy:0,

            averageRuntime:0

        };

    }

    let soc = 0;

    let dod = 0;

    let energy = 0;

    let runtime = 0;

    batteries.forEach(b=>{

        const percentage =

            calculateSOCPercentage(

                b.stateOfCharge || 0

            );

        soc += percentage;

        dod +=

            calculateDODPercentage(

                b.stateOfCharge || 0

            );

        const remaining =

            remainingEnergy(

                b.stateOfCharge || 0,

                b.capacity || 0

            );

        energy += remaining;

        runtime +=

            estimateRuntime(

                remaining,

                b.load || 1

            );

    });

    return{

        totalBatteries:

            batteries.length,

        averageSOC:

            Number(

                (

                    soc/

                    batteries.length

                ).toFixed(2)

            ),

        averageDOD:

            Number(

                (

                    dod/

                    batteries.length

                ).toFixed(2)

            ),

        totalRemainingEnergy:

            Number(

                energy.toFixed(2)

            ),

        averageRuntime:

            Number(

                (

                    runtime/

                    batteries.length

                ).toFixed(2)

            )

    };

}


/**
 * ------------------------------------------------------------
 * Live Battery Status
 * ------------------------------------------------------------
 */

export async function liveBatteryStatus(){

    const batteries =

        await Battery.find();

    return batteries.map(b=>{

        const soc =

            calculateSOCPercentage(

                b.stateOfCharge || 0

            );

        const remaining =

            remainingEnergy(

                b.stateOfCharge || 0,

                b.capacity || 0

            );

        return{

            site:

                b.siteName,

            batteryId:

                b._id,

            soc,

            remainingEnergy:

                remaining,

            voltage:

                b.voltage,

            current:

                b.current,

            temperature:

                b.temperature,

            status:

                classifyBatterySOC(soc),

            alarm:

                batteryAlarm(soc)

        };

    });

}


/**
 * ------------------------------------------------------------
 * Battery Trend
 * ------------------------------------------------------------
 */

export async function batteryTrend(){

    const batteries =

        await Battery.find()

        .sort({

            createdAt:1

        });

    return batteries.map(item=>({

        date:

            item.createdAt,

        soc:

            calculateSOCPercentage(

                item.stateOfCharge || 0

            )

    }));

}


/**
 * ------------------------------------------------------------
 * Battery Health
 * ------------------------------------------------------------
 */

export async function batteryHealth(){

    const batteries =

        await Battery.find();

    return batteries.map(b=>{

        const soc =

            calculateSOCPercentage(

                b.stateOfCharge || 0

            );

        return{

            site:

                b.siteName,

            health:

                classifyBatterySOC(

                    soc

                ),

            soc,

            temperature:

                b.temperature,

            cycles:

                b.cycles || 0

        };

    });

}


/**
 * ------------------------------------------------------------
 * Runtime Report
 * ------------------------------------------------------------
 */

export async function batteryRuntime(){

    const batteries =

        await Battery.find();

    return batteries.map(b=>{

        const energy =

            remainingEnergy(

                b.stateOfCharge || 0,

                b.capacity || 0

            );

        return{

            site:

                b.siteName,

            runtime:

                estimateRuntime(

                    energy,

                    b.load || 1

                )

        };

    });

}


/**
 * ------------------------------------------------------------
 * Efficiency Report
 * ------------------------------------------------------------
 */

export async function batteryEfficiency(){

    const batteries =

        await Battery.find();

    return batteries.map(b=>({

        site:

            b.siteName,

        roundTripEfficiency:

            calculateRoundTripEfficiency(

                b.chargeEfficiency || 0.95,

                b.dischargeEfficiency || 0.95

            )

    }));

}