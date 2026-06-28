/**
 * ============================================================
 * HEMAP
 * Solar Analytics Service
 *
 * IEC 61724
 * IEC 61215
 *
 * Used By
 *
 * Dashboard
 * SolarChart
 * Monitoring
 * Forecast
 * Reports
 * Digital Twin
 *
 * ============================================================
 */

import { Solar } from "../../models/solar.js";

import {

    calculateTemperatureFactor,

    calculateDCPower,

    calculateACPower,

    calculateDailyEnergy,

    calculateSpecificYield,

    calculateCapacityFactor,

    calculatePerformanceRatio,

    classifyPVPerformance

}

from "../calculations/pvPower.js";


/**
 * ------------------------------------------------------------
 * Solar Dashboard Summary
 * ------------------------------------------------------------
 */

export async function solarDashboard(){

    const solarPlants =

        await Solar.find();

    let installedCapacity = 0;

    let dcPower = 0;

    let acPower = 0;

    let dailyEnergy = 0;

    let performanceRatio = [];

    for(const pv of solarPlants){

        const tempFactor =

            calculateTemperatureFactor(

                pv.moduleTemperature || 25

            );

        const dc =

            calculateDCPower({

                irradiance:

                    pv.irradiance || 0,

                capacity:

                    pv.capacity || 0,

                moduleEfficiency:

                    pv.moduleEfficiency || 0.20,

                temperatureFactor:

                    tempFactor

            });

        const ac =

            calculateACPower(

                dc,

                pv.inverterEfficiency || 0.97

            );

        const energy =

            calculateDailyEnergy(

                ac,

                pv.peakSunHours || 5

            );

        const pr =

            calculatePerformanceRatio(

                energy,

                pv.referenceEnergy || energy

            );

        installedCapacity +=

            pv.capacity || 0;

        dcPower += dc;

        acPower += ac;

        dailyEnergy += energy;

        performanceRatio.push(pr);

    }

    const averagePR =

        performanceRatio.length

        ?

        performanceRatio.reduce(

            (a,b)=>a+b,

            0

        )

        /

        performanceRatio.length

        :

        0;

    return{

        totalPlants:

            solarPlants.length,

        installedCapacity:

            Number(

                installedCapacity.toFixed(2)

            ),

        dcPower:

            Number(

                dcPower.toFixed(2)

            ),

        acPower:

            Number(

                acPower.toFixed(2)

            ),

        dailyEnergy:

            Number(

                dailyEnergy.toFixed(2)

            ),

        specificYield:

            calculateSpecificYield(

                dailyEnergy,

                installedCapacity

            ),

        capacityFactor:

            calculateCapacityFactor(

                dailyEnergy,

                installedCapacity

            ),

        performanceRatio:

            Number(

                averagePR.toFixed(3)

            ),

        performanceClass:

            classifyPVPerformance(

                averagePR

            )

    };

}


/**
 * ------------------------------------------------------------
 * Live Solar Telemetry
 * ------------------------------------------------------------
 */

export async function liveSolarStatus(){

    const plants =

        await Solar.find();

    return plants.map(site=>{

        const tf =

            calculateTemperatureFactor(

                site.moduleTemperature || 25

            );

        const dc =

            calculateDCPower({

                irradiance:

                    site.irradiance,

                capacity:

                    site.capacity,

                moduleEfficiency:

                    site.moduleEfficiency,

                temperatureFactor:tf

            });

        const ac =

            calculateACPower(

                dc,

                site.inverterEfficiency

            );

        return{

            site:

                site.siteName,

            irradiance:

                site.irradiance,

            moduleTemperature:

                site.moduleTemperature,

            dcPower:dc,

            acPower:ac,

            inverterEfficiency:

                site.inverterEfficiency,

            status:

                ac>0

                ? "ONLINE"

                : "OFFLINE"

        };

    });

}


/**
 * ------------------------------------------------------------
 * Energy Trend
 * ------------------------------------------------------------
 */

export async function solarEnergyTrend(){

    const plants =

        await Solar.find()

        .sort({

            createdAt:1

        });

    return plants.map(item=>({

        date:

            item.createdAt,

        energy:

            calculateDailyEnergy(

                item.powerOutput || 0,

                item.peakSunHours || 5

            )

    }));

}


/**
 * ------------------------------------------------------------
 * Solar Performance Ranking
 * ------------------------------------------------------------
 */

export async function solarRanking(){

    const plants =

        await Solar.find();

    const ranking =

        plants.map(site=>{

            const pr =

                calculatePerformanceRatio(

                    site.actualEnergy || 0,

                    site.referenceEnergy || 1

                );

            return{

                site:

                    site.siteName,

                performanceRatio:pr,

                rating:

                    classifyPVPerformance(pr)

            };

        });

    ranking.sort(

        (a,b)=>

        b.performanceRatio-

        a.performanceRatio

    );

    return ranking;

}