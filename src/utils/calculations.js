/* "./src/utils/calculations.js" */
import Spline from 'cubic-spline/index.js'; 

export class BallisticCalc {
    constructor() {
        this.pejsaBallisticData = [[], [], [], [], []];
        this.spline = null;

        // fetch data from TSV file
        this.loadBallisticData().then(() => {
            const x = this.pejsaBallisticData[0].map(Number);
            const y = this.pejsaBallisticData[4].map(Number);
            this.spline = new Spline(x, y);
        });
    }

    async loadBallisticData() {
        try {
            const response = await fetch('/pejsa-Ballistic-F-data-for-interpolation.tsv');
            const data = await response.text();
            const rows = data.trim().split('\n');

            rows.slice(1).forEach(row => {
              const columns = row.split('\t'); // "\t" för att separera TSV-fält
              columns.forEach((column, index) => {
                if (index < this.pejsaBallisticData.length) {
                  this.pejsaBallisticData[index].push(column);
                }
              });
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    /**
     * Calculates the kinetic energy 
     * @param {*} m - the mass in kg
     * @param {*} v - the velocity in m/s
     * @returns the kinetic energy in Joules
     */
    calculateKineticEnergy(m, v) {
        return 0.5 * m * Math.pow(v, 2);
    }

    /**
     * 
     * @param {*} x - range in meters
     * @param {*} F0 - equals initial retardation coefficient at v0
     * @param {*} n - correction term to take varying atmospheric drag into account
     * @returns 
     */
    retardationCoeffMean(x, F0, n) {
        return F0 - 1 / 4 * n * x;
    }

    /**
     * Calculates the drop height from muzzle in meters
     * @param {*} x in meters
     * @param {*} v0 in m/s
     * @param {*} F0 equals initial retardation coefficient at v0
     * @returns the drop height in meters
     */
    calculateDropHeight(x, v0, F0) {
        let n;
        if (v0 < 274.32) {
            n = 0;
        } else if (v0 < 365.76) {
            n = - 3;
        } else if (v0 < 426.72) {
            n = 0;
        } else {
            n = 0.5;
        }

        // Gravitational constant (m/s^2)
        const g = 9.82;

        return (Math.pow(x, 2) * g / (2 * Math.pow(v0, 2)) / Math.pow(1 - x / 3 / this.retardationCoeffMean(x, F0, n), 2));
    }

    /**
     * Calculates the bullet's elevation above the line of sight in cm
     * @param {*} S - sight height in cm
     * @param {*} x - Range in meters
     * @param {*} Z - Zero range in meters
     * @param {*} v0 - muzzle velocity in m/s
     * @param {*} F0 - equals initial retardation coefficient at v0
     * @returns the elevation in cm
     */
    calculateHeightAboveSightInCm(S, x, Z, v0, F0) {
        return (-1*(this.calculateDropHeight(x, v0, F0) + S/100) + x * ((this.calculateDropHeight(Z, v0, F0) + S/100) / Z)) * 100;
    }

    /**
     * Calculates the adjustment required in milliradians
     * @param {*} x - range in meters
     * @param {*} H - Elevation in cm
     * @returns Adjustment in milliradians
     */
    calculateMilliradians(x, H) {
        return H * x / 1000 ;
    }

    /**
     * Calculates the F0 value 
     * @param {*} v0 - muzzle velocity in m/s
     * @param {*} BC - Ballistic Coefficient
     * @returns 
     */
    calculateF0(v0, BC) {
        // cubic spline interpolation
        if (!this.spline) {
            console.error('Spline not initialized');
            return null;
        }
        return BC * this.spline.at(v0);
    }
}