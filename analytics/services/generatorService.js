/**
 * ============================================================
 * HEMAP
 * Generator Analytics Service
 *
 * Standards
 * ----------
 * ISO 3046
 * IEC 60034
 *
 * Used By
 *
 * Dashboard
 * GeneratorChart
 * GeneratorGauge
 * Monitoring
 * Reports
 * Digital Twin
 *
 * ============================================================
 */

import { Generator } from "../../models/generator.js";

import {

    calculateLoadFactor,

    calculateGeneratorEfficiency,

    calculateFuelConsumption,

    calculateSpecificFuelConsumption,

    calculateFuelCost,

    calculateGeneratorEmission,

    estimateGeneratorRuntime,

    calculateGeneratorHealth,

    maintenanceStatus,

    classifyGenerator

}

from "../calculations/generatorEfficiency.js";


/**
 * ============================================================
 * Generator Dashboard
 * ============================================================
 */

export async function generatorDashboard(){

    const generators =

        await Generator.find();

    if(!generators.length){

        return{

            totalGenerators:0,

            averageEfficiency:0,

            totalFuel:0,

            totalEmission:0,

            averageLoadFactor:0

        };

    }

    let efficiency = 0;

    let loadFactor = 0;

    let fuel = 0;

    let emission = 0;

    generators.forEach(gen=>{

        const lf =

            calculateLoadFactor(

                gen.outputPower || 0,

                gen.ratedPower || 1

            );

        loadFactor += lf;

        const eff =

            calculateGeneratorEfficiency(

                gen.outputPower || 0,

                gen.fuelEnergyInput || 1

            );

        efficiency += eff;

        const fuelUsed =

            calculateFuelConsumption(

                gen.outputPower || 0,

                gen.sfc || 0.27

            );

        fuel += fuelUsed;

        emission +=

            calculateGeneratorEmission(

                fuelUsed

            );

    });

    return{

        totalGenerators:

            generators.length,

        averageEfficiency:

            Number(

                (

                    efficiency /

                    generators.length

                ).toFixed(3)

            ),

        averageLoadFactor:

            Number(

                (

                    loadFactor /

                    generators.length

                ).toFixed(3)

            ),

        totalFuel:

            Number(

                fuel.toFixed(2)

            ),

        totalEmission:

            Number(

                emission.toFixed(2)

            )

    };

}


/**
 * ============================================================
 * Live Generator Status
 * ============================================================
 */

export async function liveGeneratorStatus(){

    const generators =

        await Generator.find();

    return generators.map(gen=>{

        const efficiency =

            calculateGeneratorEfficiency(

                gen.outputPower || 0,

                gen.fuelEnergyInput || 1

            );

        const fuel =

            calculateFuelConsumption(

                gen.outputPower || 0,

                gen.sfc || 0.27

            );

        return{

            site:

                gen.siteName,

            generatorId:

                gen._id,

            outputPower:

                gen.outputPower,

            loadFactor:

                calculateLoadFactor(

                    gen.outputPower,

                    gen.ratedPower

                ),

            efficiency,

            fuelConsumption:

                fuel,

            temperature:

                gen.coolantTemperature,

            oilPressure:

                gen.oilPressure,

            running:

                gen.running,

            status:

                classifyGenerator(

                    efficiency

                )

        };

    });

}


/**
 * ============================================================
 * Fuel Report
 * ============================================================
 */

export async function generatorFuelReport(

    dieselPrice

){

    const generators =

        await Generator.find();

    return generators.map(gen=>{

        const fuel =

            calculateFuelConsumption(

                gen.outputPower,

                gen.sfc || 0.27

            );

        return{

            site:

                gen.siteName,

            fuelConsumption:

                fuel,

            operatingCost:

                calculateFuelCost(

                    fuel,

                    dieselPrice

                )

        };

    });

}


/**
 * ============================================================
 * Generator Health
 * ============================================================
 */

export async function generatorHealth(){

    const generators =

        await Generator.find();

    return generators.map(gen=>{

        const efficiency =

            calculateGeneratorEfficiency(

                gen.outputPower,

                gen.fuelEnergyInput

            );

        const loadFactor =

            calculateLoadFactor(

                gen.outputPower,

                gen.ratedPower

            );

        return{

            site:

                gen.siteName,

            health:

                calculateGeneratorHealth({

                    efficiency,

                    loadFactor,

                    oilPressure:

                        gen.oilPressure,

                    coolantTemperature:

                        gen.coolantTemperature

                }),

            status:

                classifyGenerator(

                    efficiency

                )

        };

    });

}


/**
 * ============================================================
 * Runtime Report
 * ============================================================
 */

export async function generatorRuntime(){

    const generators =

        await Generator.find();

    return generators.map(gen=>{

        const fuel =

            calculateFuelConsumption(

                gen.outputPower,

                gen.sfc || 0.27

            );

        return{

            site:

                gen.siteName,

            runtime:

                estimateGeneratorRuntime(

                    gen.fuelTankCapacity || 0,

                    fuel

                )

        };

    });

}


/**
 * ============================================================
 * Maintenance Report
 * ============================================================
 */

export async function maintenanceReport(){

    const generators =

        await Generator.find();

    return generators.map(gen=>({

        site:

            gen.siteName,

        operatingHours:

            gen.operatingHours,

        maintenance:

            maintenanceStatus(

                gen.operatingHours,

                gen.maintenanceInterval || 250

            )

    }));

}


/**
 * ============================================================
 * Emission Report
 * ============================================================
 */

export async function generatorEmissionReport(){

    const generators =

        await Generator.find();

    return generators.map(gen=>{

        const fuel =

            calculateFuelConsumption(

                gen.outputPower,

                gen.sfc || 0.27

            );

        return{

            site:

                gen.siteName,

            emission:

                calculateGeneratorEmission(

                    fuel

                )

        };

    });

}