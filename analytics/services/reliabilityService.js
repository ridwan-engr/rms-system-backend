/**
 * ============================================================
 * HEMAP
 * Reliability Analytics Service
 *
 * IEEE 1366
 *
 * Used By
 *
 * Dashboard
 * Reliability Reports
 * SAIFI Chart
 * SAIDI Chart
 * ENS Chart
 * LOLP Chart
 * Digital Twin
 *
 * ============================================================
 */

import { Site } from "../../models/site.js";
import { Fault } from "../../models/fault.js";

import {

    calculateENS

} from "../calculations/ens.js";

import {

    calculateLOLP

} from "../calculations/lolp.js";

import {

    calculateSAIFIFromEvents,

    annualSAIFI,

    averageMonthlySAIFI,

    classifySAIFI

} from "../calculations/saifi.js";

import {

    calculateSAIDIFromEvents,

    calculateCAIDI,

    annualSAIDI,

    averageMonthlySAIDI,

    classifySAIDI

} from "../calculations/saidi.js";


/**
 * ============================================================
 * Dashboard Reliability Summary
 * ============================================================
 */

export async function reliabilityDashboard(){

    const [

        sites,

        faults

    ] = await Promise.all([

        Site.find(),

        Fault.find()

    ]);

    const customersServed =

        sites.reduce(

            (sum,site)=>

            sum+

            Number(site.customersServed || 0),

            0

        );

    const totalDemand =

        sites.reduce(

            (sum,site)=>

            sum+

            Number(site.loadDemand || 0),

            0

        );

    const totalSupply =

        sites.reduce(

            (sum,site)=>

            sum+

            Number(site.energySupplied || 0),

            0

        );

    const duration =

        faults.reduce(

            (sum,f)=>

            sum+

            Number(f.duration || 0),

            0

        );

    const events =

        faults.map(f=>({

            customersAffected:

                Number(f.customersAffected || 0),

            duration:

                Number(f.duration || 0)

        }));

    const ens =

        calculateENS(

            totalDemand,

            totalSupply,

            1

        );

    const lolp =

        calculateLOLP(

            totalDemand,

            totalSupply

        );

    const saifi =

        calculateSAIFIFromEvents(

            events,

            customersServed

        );

    const saidi =

        calculateSAIDIFromEvents(

            events,

            customersServed

        );

    const caidi =

        calculateCAIDI(

            saidi,

            saifi

        );

    return{

        timestamp:new Date(),

        customersServed,

        totalFaults:

            faults.length,

        ens,

        lolp,

        saifi,

        saidi,

        caidi,

        saifiRating:

            classifySAIFI(

                saifi

            ),

        saidiRating:

            classifySAIDI(

                saidi

            )

    };

}



/**
 * ============================================================
 * Monthly Reliability Report
 * ============================================================
 */

export async function monthlyReliability(){

    const faults =

        await Fault.find();

    const monthly =

        Array(12).fill(0);

    faults.forEach(f=>{

        const month =

            new Date(

                f.createdAt

            ).getMonth();

        monthly[month]++;

    });

    return monthly.map((count,index)=>({

        month:index+1,

        outages:count

    }));

}



/**
 * ============================================================
 * Annual Reliability
 * ============================================================
 */

export async function annualReliability(){

    const dashboard =

        await reliabilityDashboard();

    return{

        year:

            new Date().getFullYear(),

        ens:

            dashboard.ens,

        lolp:

            dashboard.lolp,

        saifi:

            dashboard.saifi,

        saidi:

            dashboard.saidi,

        caidi:

            dashboard.caidi

    };

}



/**
 * ============================================================
 * Reliability Trend
 * ============================================================
 */

export async function reliabilityTrend(){

    const faults =

        await Fault.find()

        .sort({

            createdAt:1

        });

    return faults.map(f=>({

        date:

            f.createdAt,

        customersAffected:

            f.customersAffected,

        duration:

            f.duration

    }));

}



/**
 * ============================================================
 * Monthly KPI Summary
 * ============================================================
 */

export function reliabilityKPI({

    monthlySAIFI=[],

    monthlySAIDI=[]

}){

    const annualSaifi =

        annualSAIFI(

            monthlySAIFI

        );

    const annualSaidi =

        annualSAIDI(

            monthlySAIDI

        );

    return{

        annualSAIFI:

            annualSaifi,

        annualSAIDI:

            annualSaidi,

        averageMonthlySAIFI:

            averageMonthlySAIFI(

                monthlySAIFI

            ),

        averageMonthlySAIDI:

            averageMonthlySAIDI(

                monthlySAIDI

            ),

        caidi:

            calculateCAIDI(

                annualSaidi,

                annualSaifi

            )

    };

}



/**
 * ============================================================
 * Reliability Alarm
 * ============================================================
 */

export async function reliabilityAlarm(){

    const dashboard =

        await reliabilityDashboard();

    return{

        critical:

            dashboard.saifi>3 ||

            dashboard.saidi>8 ||

            dashboard.lolp>0.10,

        message:

            dashboard.saifi>3

            ? "High interruption frequency."

            : dashboard.saidi>8

            ? "High interruption duration."

            : dashboard.lolp>0.10

            ? "High loss of load probability."

            : "System operating normally."

    };

}