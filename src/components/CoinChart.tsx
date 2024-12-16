import React, { useEffect, useState } from "react";
import { useCrypto } from "../context/CryptoContext";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js kutubxonasini kerakli qismlarini chaqirish ( Meni kompyuterimda APEXCHART ishlataolmadim )
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ coinId }: { coinId: string | undefined }) => {
  const { currency, setChartData } = useCrypto(); // Context orqali currency va setChartData olish
  const [timeframe, setTimeframe] = useState("24h"); // Vaqt davrini belgilash uchun
  const [chartData, setLocalChartData] = useState<any>(null); // Grafikni saqlash uchun

  //  APIdan malumotlarni olish (kerakli coin uchun)
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.toLowerCase()}&days=${
            timeframe === "24h"
              ? 1
              : timeframe === "30d"
              ? 30
              : timeframe === "3m"
              ? 90
              : 365
          }`
        );
        const data = await response.json();

        // diogramma uchun malumotlarni tayyorlash
        const chartData = {
          labels: data.prices.map((price: number[]) =>
            new Date(price[0]).toLocaleDateString()
          ),
          datasets: [
            {
              label: `Price (${currency})`, // Narx  
              data: data.prices.map((price: number[]) => price[1]), // Narxlar ro'yxati
              borderColor: "rgb(34, 211, 238)", 
              backgroundColor: "rgba(34, 211, 238, 0.5)", 
            },
          ],
        };

        setLocalChartData(chartData); // saqlash
        setChartData(chartData); //  global saqlsh
      } catch (error) {
        console.error("Error fetching chart data:", error); // Xatolikni bo'lsa chiqarish
      }
    };

    fetchChartData(); // Malumotlarni yuklash
  }, [coinId, currency, timeframe]); //  o'zgarsa yana yuklash

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      {chartData && (
        <div className="h-[400px]">
          {/* Agar chartData bo'lsa grafikni ko'rsatish */}
          <Line
            data={chartData} // Grafik ma'lumotlari
            options={{
              scales: {
                y: {
                  ticks: { color: "white" }, 
                  grid: { color: "rgba(255, 255, 255, 0.1)" }, 
                },
                x: {
                  ticks: { color: "white" }, 
                  grid: { color: "rgba(255, 255, 255, 0.1)" }, 
                },
              },
              plugins: {
                legend: {
                  labels: { color: "white" }, 
                },
              },
            }}
          />
        </div>
      )}
      <div className="flex justify-end gap-4 mt-5">
        {["24h", "30d", "3m", "1y"].map((period) => (
          <button
            key={period}
            onClick={() => setTimeframe(period)} // Vaqtni o'zgartirish
            className={`px-4 py-1 rounded w-full text-start ${
              timeframe === period
                ? "bg-cyan-400 text-black"  
                : "bg-gray-700 text-white"
            }`}
          >
            {period} {/* Vaqtni ko'rsatish */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CoinChart;
