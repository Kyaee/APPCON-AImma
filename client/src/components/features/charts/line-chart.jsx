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
  const data = {
    labels: [
      "2016",
      "2017",
      "2018",
      "2019",
      "2020"
    ],
    datasets: [
      {
        label: "Users",
        data: chartData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }
    ]
  }
  
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Your Growth</h2>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
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