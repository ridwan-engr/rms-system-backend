/**
 * ==========================================================
 * HEMAP
 * Master Analytics Service
 *
 * This service aggregates analytics from every subsystem.
 *
 * Used by:
 *
 * Dashboard
 * Reports
 * Monitoring
 * Digital Twin
 * REST API
 * Socket.IO
 *
 * ==========================================================
 */

import { Site } from "../../models/site.js";

import { Solar } from "../../models/solar.js";

import { Battery } from "../../models/battery.js";

import { Generator } from "../../models/generator.js";

import { Grid } from "../../models/grid.js";

import { Fault } from "../../models/fault.js";

import {

    calculateEnergyReport

}

from "../calculations/energyBalance.js";

import {

    calculateSOCPercentage

}

from "../calculations/batterySOC.js";

import {

    calculateRenewablePercentage

}

from "../calculations/renewableFraction.js";



/**
 * ----------------------------------------------------------
 * Dashboard KPIs
 * ----------------------------------------------------------
 */

export async function dashboardAnalytics(){

    const [

        sites,

        solar,

        batteries,

        generators,

        grids,

        faults

    ] = await Promise.all([

        Site.find(),

        Solar.find(),

        Battery.find(),

        Generator.find(),

        Grid.find(),

        Fault.find()

    ]);


    const totalSolar =

        solar.reduce(

            (sum,item)=>

            sum+(item.powerOutput||0),

            0

        );


    const totalGenerator =

        generators.reduce(

            (sum,item)=>

            sum+(item.outputPower||0),

            0

        );


    const totalGrid =

        grids.reduce(

            (sum,item)=>

            sum+(item.importPower||0),

            0

        );


    const totalBatteryDischarge =

        batteries.reduce(

            (sum,item)=>

            sum+(item.dischargePower||0),

            0

        );


    const totalBatteryCharge =

        batteries.reduce(

            (sum,item)=>

            sum+(item.chargePower||0),

            0

        );


    const totalLoad =

        sites.reduce(

            (sum,item)=>

            sum+(item.loadDemand||0),

            0

        );


    const report =

        calculateEnergyReport({

            solar:totalSolar,

            batteryDischarge:totalBatteryDischarge,

            batteryCharge:totalBatteryCharge,

            generator:totalGenerator,

            gridImport:totalGrid,

            load:totalLoad,

            duration:1

        });


    const averageSOC =

        batteries.length

        ?

        batteries.reduce(

            (sum,item)=>

            sum+

            calculateSOCPercentage(

                item.stateOfCharge||0

            ),

            0

        )

        /

        batteries.length

        :

        0;


    const renewable =

        calculateRenewablePercentage(

            totalSolar,

            report.generation

        );


    return{

        timestamp:new Date(),

        sites:sites.length,

        solarSites:solar.length,

        batteries:batteries.length,

        generators:generators.length,

        grids:grids.length,

        activeFaults:

            faults.filter(

                f=>f.status==="OPEN"

            ).length,

        energy:report,

        batterySOC:Number(

            averageSOC.toFixed(2)

        ),

        renewablePercentage:renewable

    };

}



/**
 * ----------------------------------------------------------
 * Fleet Summary
 * ----------------------------------------------------------
 */

export async function fleetSummary(){

    const dashboard =

        await dashboardAnalytics();

    return{

        totalSites:

            dashboard.sites,

        renewable:

            dashboard.renewablePercentage,

        batterySOC:

            dashboard.batterySOC,

        generation:

            dashboard.energy.generation,

        load:

            dashboard.energy.consumption,

        balance:

            dashboard.energy.balance

    };

}



/**
 * ----------------------------------------------------------
 * Active Alarm Count
 * ----------------------------------------------------------
 */

export async function alarmSummary(){

    const alarms =

        await Fault.countDocuments({

            status:"OPEN"

        });

    return{

        active:alarms

    };

}