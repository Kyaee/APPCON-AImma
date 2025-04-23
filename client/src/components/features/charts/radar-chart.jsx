import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChart({chartData}) {
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

  const data = {
    labels: [
      'Engagement',
      'Confidence',
      'Time Efficiency',
      'Resilience',
      'Knowledge',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: chartData,
      fill: true,
      backgroundColor: isDark ? 'rgba(255, 99, 132, 0.1)' : 'rgba(255, 99, 132, 0.2)',
      borderColor: isDark ? 'rgb(255, 99, 132)' : 'rgb(255, 99, 132)',
      pointBackgroundColor: isDark ? 'rgb(255, 99, 132)' : 'rgb(255, 99, 132)',
      pointBorderColor: isDark ? '#1a1a1e' : '#fff',
      pointHoverBackgroundColor: isDark ? '#1a1a1e' : '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)'
    }], 
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: isDark ? '#ffffff40' : '#00000040'
        },
        grid: {
          color: isDark ? '#ffffff40' : '#00000040'
        },
        ticks: {
          backdropColor: 'transparent',
          color: isDark ? '#fff' : '#000'
        },
        pointLabels: {
          color: isDark ? '#fff' : '#000'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#fff' : '#000'
        }
      }
    }
  };

  return (
    <div className="bg-background dark:bg-dark-mode-bg  rounded-lg max-w-sm">
      <Radar data={data} options={options} />
    </div>
  );
}
