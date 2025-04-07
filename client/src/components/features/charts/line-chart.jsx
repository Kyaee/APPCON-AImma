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
import { useEffect, useState } from "react";

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
  

  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);


  return (
    <div className="chart-container bg-background dark:bg-dark-mode-bg">
      <h2 style={{ textAlign: "center" }} className="text-black dark:text-white">Your Growth</h2>
      <Line
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020",
              color: isDark ? 'white' : 'black'
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              grid: {
                color: isDark ? '#ffffff40' : '#00000040'
              },
              ticks: {
                color: isDark ? '#fff' : '#000'
              }
            },
            y: {
              grid: {
                color: isDark ? '#ffffff40' : '#00000040'
              },
              ticks: {
                color: isDark ? '#fff' : '#000'
              }
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;