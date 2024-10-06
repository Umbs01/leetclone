import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatGraph({ profile }) {
  const data = {
    labels: ["Fundamental", "Medium", "Difficult"],
    datasets: [
      {
        label: "Problems Solved",
        data: [
          profile.solved.fundamental,
          profile.solved.medium,
          profile.solved.difficult,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        borderColor: ["#36A2EB", "#FFCE56", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Problems Solved by Difficulty",
      },
    },
  };

  return (
    <div className="bg-[#282828] text-white p-6 rounded-lg shadow-lg h-full">
      <Bar data={data} options={options} />
    </div>
  );
}
