import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ chartData }) {
  return (
    <div className="chart-container bg-background dark:bg-dark-mode-bg">
      <h2 style={{ textAlign: "center" }} className="text-black dark:text-white">Your Growth</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
              color: document.documentElement.classList.contains('dark') ? 'white' : 'black'
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;