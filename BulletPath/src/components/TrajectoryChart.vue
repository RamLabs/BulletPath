<!-- "@/components/TrajectoryChart.vue" -->

<template>
  <div class="bg-white relative w-[600px] h-[400px] shadow-lg rounded-md">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

// Register the ChartJS components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

export default {
  name: "TrajectoryChart",
  components: {
    Line, // Import Line component from vue-chartjs
  },
  props: {
    xRangeData: {
      type: Array,
      required: true,
    },
    trajectoryData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: this.xRangeData,
        datasets: [
          {
            label: "Elevation [cm]",
            data: this.trajectoryData,
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: "Range (m)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Elevation (cm)",
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped></style>
