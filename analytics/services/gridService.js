/**
 * ============================================================
 * HEMAP
 * Grid Analytics Service
 *
 * Standards
 * ----------
 * IEEE 1159
 * IEC 61000
 *
 * Used By
 *
 * Dashboard
 * GridChart
 * GridGauge
 * Monitoring
 * Reports
 * Digital Twin
 *
 * ============================================================
 */

import { Grid } from "../../models/grid.js";



/**
 * ============================================================
 * Dashboard Summary
 * ============================================================
 */

export async function gridDashboard(){

    const grids = await Grid.find();

    if(!grids.length){

        return{

            totalSites:0,

            averageVoltage:0,

            averageFrequency:0,

            totalImport:0,

            totalExport:0,

            availability:0

        };

    }

    let voltage=0;

    let frequency=0;

    let importEnergy=0;

    let exportEnergy=0;

    let available=0;

    grids.forEach(g=>{

        voltage+=Number(g.voltage||0);

        frequency+=Number(g.frequency||0);

        importEnergy+=Number(g.importEnergy||0);

        exportEnergy+=Number(g.exportEnergy||0);

        if(g.available)

            available++;

    });

    return{

        totalSites:grids.length,

        averageVoltage:Number(

            (

                voltage/grids.length

            ).toFixed(2)

        ),

        averageFrequency:Number(

            (

                frequency/grids.length

            ).toFixed(2)

        ),

        totalImport:Number(

            importEnergy.toFixed(2)

        ),

        totalExport:Number(

            exportEnergy.toFixed(2)

        ),

        availability:Number(

            (

                available/

                grids.length

                *

                100

            ).toFixed(2)

        )

    };

}



/**
 * ============================================================
 * Live Grid Status
 * ============================================================
 */

export async function liveGridStatus(){

    const grids = await Grid.find();

    return grids.map(grid=>({

        site:grid.siteName,

        voltage:grid.voltage,

        frequency:grid.frequency,

        importEnergy:grid.importEnergy,

        exportEnergy:grid.exportEnergy,

        available:grid.available,

        voltageStatus:

            classifyVoltage(

                grid.voltage

            ),

        frequencyStatus:

            classifyFrequency(

                grid.frequency

            )

    }));

}



/**
 * ============================================================
 * Voltage Classification
 * ============================================================
 */

export function classifyVoltage(

    voltage

){

    if(voltage>=210 && voltage<=240)

        return "NORMAL";

    if(voltage<210)

        return "LOW";

    return "HIGH";

}



/**
 * ============================================================
 * Frequency Classification
 * ============================================================
 */

export function classifyFrequency(

    frequency

){

    if(frequency>=49.5 && frequency<=50.5)

        return "NORMAL";

    if(frequency<49.5)

        return "LOW";

    return "HIGH";

}



/**
 * ============================================================
 * Voltage Trend
 * ============================================================
 */

export async function voltageTrend(){

    const grids=

        await Grid.find()

        .sort({

            createdAt:1

        });

    return grids.map(item=>({

        date:item.createdAt,

        voltage:item.voltage

    }));

}



/**
 * ============================================================
 * Frequency Trend
 * ============================================================
 */

export async function frequencyTrend(){

    const grids=

        await Grid.find()

        .sort({

            createdAt:1

        });

    return grids.map(item=>({

        date:item.createdAt,

        frequency:item.frequency

    }));

}



/**
 * ============================================================
 * Import Export Summary
 * ============================================================
 */

export async function importExportSummary(){

    const grids=

        await Grid.find();

    let totalImport=0;

    let totalExport=0;

    grids.forEach(g=>{

        totalImport+=

            Number(g.importEnergy||0);

        totalExport+=

            Number(g.exportEnergy||0);

    });

    return{

        importEnergy:Number(

            totalImport.toFixed(2)

        ),

        exportEnergy:Number(

            totalExport.toFixed(2)

        ),

        netImport:Number(

            (

                totalImport-

                totalExport

            ).toFixed(2)

        )

    };

}



/**
 * ============================================================
 * Grid Availability
 * ============================================================
 */

export async function gridAvailability(){

    const grids=

        await Grid.find();

    const available=

        grids.filter(

            g=>g.available

        ).length;

    return{

        availability:Number(

            (

                available/

                grids.length

                *

                100

            ).toFixed(2)

        ),

        unavailable:

            grids.length-

            available

    };

}



/**
 * ============================================================
 * Outage Summary
 * ============================================================
 */

export async function outageSummary(){

    const grids=

        await Grid.find();

    let outages=0;

    grids.forEach(g=>{

        outages+=

            Number(

                g.outageCount||0

            );

    });

    return{

        outages

    };

}