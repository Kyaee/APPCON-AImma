import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { ZapIcon } from "lucide-react";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ chartData }) {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels: weekdays,
    datasets: [
      {
        label: "EXP Gained",
        data: [50, 10, 20, 60, 80, 30, 40],
        backgroundColor: "rgba(255, 193, 7, 0.2)",
        borderColor: "rgba(255, 193, 7, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(255, 193, 7, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 193, 7, 1)",
        tension: 0.3, // Adds a slight curve to lines
      },
    ],
  };

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setIsDark(document.documentElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex items-center gap-2 mb-1">
        <ZapIcon className="h-5 w-5 text-yellow-500" />
        <h2 className="text-center text-base font-semibold text-black dark:text-white">
          Weekly EXP Progress
        </h2>
      </div>
      <div className="w-full h-[200px]">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => `EXP: ${context.parsed.y}`,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: isDark ? "#ffffff20" : "#00000020",
                },
                ticks: {
                  color: isDark ? "#fff" : "#000",
                },
                title: {
                  display: true,
                  text: "Days of the Week",
                  color: isDark ? "#fff" : "#000",
                  font: {
                    size: 12,
                    weight: "normal",
                  },
                  padding: { top: 10 },
                },
              },
              y: {
                grid: {
                  color: isDark ? "#ffffff20" : "#00000020",
                },
                // Set min and max values for y-axis
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 25,
                  color: isDark ? "#fff" : "#000",
                  // Add specific y-axis labels
                  callback: function (value) {
                    if (
                      value === 0 ||
                      value === 25 ||
                      value === 50 ||
                      value === 75 ||
                      value === 100
                    ) {
                      return value + " exp";
                    }
                    return "";
                  },
                },
                title: {
                  display: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default LineChart;
