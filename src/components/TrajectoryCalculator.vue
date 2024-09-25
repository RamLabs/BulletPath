<template>
  <div class="bg-gray-400 w-3/5 p-4 shadow-lg rounded-b-lg mx-auto">
    <div>
      <h2 class="text-2xl font-bold">Trajectory Calculator</h2>
      <p class="mt-2">
        BulletPaths trajectory calculator is based on Pejsas method for
        calculating the bullet drop from drag. I have implemented his version
        for zeroed rifles that provides you professionals with adjustment in
        height as a function of the range to the target.
      </p>
    </div>
    <div class="flex flex-col justify-center mt-5 mr-4 w-72">
      <label for="ballistic-coefficient" class="font-semibold mb-1"
        >Ballistic Coefficient (kg/m<sup>2</sup>)
      </label>
      <input
        type="number"
        id="ballistic-coefficient"
        class="input-field rounded-md"
        v-model="ballisticCoefficient"
        placeholder=""
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <div class="flex flex-col mt-4 w-96">
      <label for="muzzle-velocity" class="font-semibold mb-1"
        >Muzzle Velocity (m/s)</label
      >
      <input
        type="number"
        id="muzzle-velocity"
        class="input-field rounded-md"
        v-model="muzzleVelocity"
        placeholder=""
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>

    <!-- Input section for Rifle Info -->
    <div class="flex flex-row justify-center">
      <div
        class="bg-gray-200 flex flex-col items-center m-10 w-96 rounded-md p-4"
      >
        <h2 class="-mt-2 text-lg font-semibold">Rifle Info</h2>
        <div class="text-center mt-4 mb-4">
          <label for="zero-range" class="font-semibold mb-1">Zero Range </label>
          <input
            type="number"
            id="zero-range"
            class="input-field mt-2 rounded-md"
            v-model="zeroRange"
            placeholder=""
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
          <span class="font-semibold"> (m)</span>
        </div>
        <div class="text-center">
          <label for="sight-height" class="font-semibold mb-1"
            >Sight Height
          </label>
          <input
            type="number"
            id="sight-height"
            class="input-field mt-2 rounded-md"
            v-model="sightHeight"
            placeholder=""
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
          <span class="font-semibold"> (cm)</span>
        </div>
      </div>
      <!-- End of Input section for Rifle Info -->

      <!-- Input section for Range -->
      <div
        class="bg-gray-200 flex flex-col items-center m-10 w-96 rounded-md p-4"
      >
        <h2 class="-mt-2 text-lg font-semibold">Range</h2>
        <div class="text-center mt-4 mb-4">
          <label for="range-interval" class="font-semibold mb-1"
            >Range Interval
          </label>
          <input
            type="number"
            id="range-interval"
            class="input-field mt-2 rounded-md"
            v-model="rangeInterval"
            placeholder=""
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
          <span class="font-semibold"> (m)</span>
        </div>
        <div class="text-center">
          <label for="max-range" class="font-semibold mb-1">Max Range </label>
          <input
            type="number"
            id="max-range"
            class="input-field mt-2 rounded-md"
            v-model="maxRange"
            placeholder=""
            @focus="isFocused = true"
            @blur="isFocused = false"
          />
          <span class="font-semibold"> (m)</span>
        </div>
      </div>
    </div>
    <!-- End of Input section for Range -->

    <!-- Calculate button -->
    <div class="mt-6">
      <button
        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        @click="calculateTrajectory"
      >
        Calculate
      </button>
    </div>
    <!-- End of Calculate button -->

    <!-- Result Table Section-->
    <div
      class="mx-auto bg-gray-200 flex flex-col items-center m-10 w-96 rounded-md p-4"
      v-if="showTable"
    >
      <h3 class="font-bold text-lg text-center mb-4">Trajectory Table</h3>
      <table class="table auto mx-auto rounded text-center">
        <thead>
          <tr>
            <th>
              <span class="m-3">Range (m)</span>
            </th>
            <th>
              <span class="m-3">Elevation (cm)</span>
            </th>
            <th>
              <span class="m-3">mils (NATO)</span>
            </th>
            <th>
              <span class="m-3">0.1 mils clicks</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in trajectoryData" :key="index">
            <!-- Range data defined by user -->
            <td class="border-l border-r border-gray-600">
              {{ xRangeData[index] }}
            </td>
            <!-- Elevation data in cm -->
            <td class="border-r border-gray-600">{{ item.toFixed(1) }}</td>
            <!-- Convert elevation data to mils (Nato) -->
            <td class="border-r border-gray-600">
              {{ (milliRad[index] * 1.018592).toFixed(1) }}
            </td>
            <!-- Calculate number of clicks for mils sights -->
            <td class="border-r border-gray-600">
              {{ (milliRad[index] / 10.18592).toFixed(0) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- End of Result Table Section-->

    <!-- Chart Section -->
    <div class="flex flex-col items-center" v-if="showTable">
      <h3 class="font-bold text-lg text-center mb-4">Trajectory Chart</h3>
      <TrajectoryChart
        :xRangeData="xRangeData"
        :trajectoryData="trajectoryData"
      />
    </div>
    <!-- End of Chart Section -->

    <!-- Description Section -->
    <div class="mt-10" v-if="showTable">
      <h3 class="font-bold text-lg text-center mb-4">
        Input Parameters and Output Explanation
      </h3>
      <p>
        The trajectory calculator requires several input parameters to provide
        accurate ballistic calculations:
        <br />
        <br />
      </p>
      <ol>
        <li>
          <span class="font-semibold">Ballistic Coefficient (kg/m²):</span> This
          measures the bullet's ability to overcome air resistance during its
          flight.
        </li>
        <li>
          <span class="font-semibold">Muzzle Velocity (m/s):</span> The speed of
          the bullet as it leaves the rifle’s barrel.
        </li>
        <li>
          <span class="font-semibold">Zero Range (m):</span> The distance at
          which the rifle is zeroed, meaning the bullet trajectory crosses the
          line of sight.
        </li>
        <li>
          <span class="font-semibold">Sight Height (cm):</span> The vertical
          distance between the center of the scope and the barrel.
        </li>
        <li>
          <span class="font-semibold">Range Interval (m):</span> The distance
          increments at which trajectory data will be calculated.
        </li>
        <li>
          <span class="font-semibold">Max Range (m):</span> The maximum distance
          for which trajectory data will be computed.
        </li>
      </ol>
    </div>
    <!-- End of Description Section -->
  </div>
</template>

<script>
import { BallisticCalc } from "@/utils/calculations.js";
import TrajectoryChart from "@/components/TrajectoryChart.vue";

export default {
  name: "TrajectoryCalculator",
  components: {
    TrajectoryChart,
  },
  data() {
    return {
      ballisticCoefficient: null, // Ballistic Coefficient
      muzzleVelocity: null, // Muzzle Velocity
      showTable: false, // Show the table with the results
      isFocused: false, // Check if the input field is focused
      trajectoryData: [], // Array to store the trajectory data
      xRangeData: [], // Array to store the range data
      zeroRange: null, // Zero Range
      sightHeight: null, // Sight Height
      rangeInterval: null, // Range Interval
      maxRange: null, // Max Range
      milliRad: [], // MilliRad
    };
  },
  async mounted() {
    this.ballisticCalc = new BallisticCalc();
    await this.ballisticCalc.loadBallisticData();
  },
  methods: {
    calculateTrajectory() {
      // Check if all the input fields are filled
      if (this.maxRange === null) {
        alert("Max range is missing");
      } else if (this.rangeInterval === null) {
        alert("Range interval is missing");
      } else if (this.maxRange < this.rangeInterval) {
        alert("Max range must be greater than range interval");
      } else if (this.sightHeight === null) {
        alert("Sight height is missing");
      } else if (this.muzzleVelocity === null) {
        alert("muzzleVelocity is missing");
      } else if (this.ballisticCoefficient === null) {
        alert("Ballistic Coefficient is missing");
      } else {
        // Creates an array of range data
        this.xRangeData = Array.from(
          { length: Math.floor(this.maxRange / this.rangeInterval) + 1 },
          (_, i) => i * this.rangeInterval
        );

        // Calculates the trajectory data and returns the values
        this.trajectoryData = this.xRangeData.map((x) => {
          return this.ballisticCalc.calculateHeightAboveSightInCm(
            this.sightHeight,
            x,
            this.zeroRange,
            this.muzzleVelocity,
            this.ballisticCalc.calculateF0(
              this.muzzleVelocity,
              this.ballisticCoefficient
            )
          );
        });

        // Converts the trajectory data to milliradians
        this.milliRad = this.xRangeData.map((value, index) => {
          return this.ballisticCalc.calculateMilliradians(
            value,
            this.trajectoryData[index]
          );
        });
        this.showTable = true;
      }
    },
  },
};
</script>

<style scoped>
.input-field {
  width: 75px;
  height: 10px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;
}
.input-field:hover,
.input-field:focus {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-color: #666666;
  outline: none;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}
</style>
