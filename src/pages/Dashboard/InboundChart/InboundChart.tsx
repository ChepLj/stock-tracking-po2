
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// TypeScript interfaces for the data structure
interface DataItem {
  description: string;
  material: string;
  quantity: string;
  price: string;
  year: string;
  month: string;
  sLoc: string;
}

interface GroupedData {
  [year: string]: {
    [month: string]: {
      totalPrice: number;
      sLocs: {
        [sLoc: string]: number; // Price for each sLoc
      };
    };
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const data: Record<string, DataItem> = {
  "111111111-3014": {
    description: "234sdfsdfd",
    material: "111111111",
    quantity: "2",
    price: "1",
    year: "2024",
    month: "12",
    sLoc: "3014"
  },
  "120000046-3010": {
    description: "Bang keo dien 2P 100g",
    material: "120000046",
    quantity: "11",
    price: "6000",
    year: "2024",
    month: "10",
    sLoc: "3010"
  },
  "120000046-3017": {
    description: "Bang keo dien 2P 100g",
    material: "120000046",
    quantity: "84",
    price: "6000",
    year: "2024",
    month: "11",
    sLoc: "3017"
  },
  "120000046-3110": {
    description: "Bang keo dien 2P 100g",
    material: "120000046",
    quantity: "20",
    price: "6000",
    year: "2024",
    month: "10",
    sLoc: "3110"
  }
};

// Group data by year, month, and sLoc
function groupDataByYearMonthAndSLoc(data: Record<string, DataItem>): GroupedData {
  const groupedData: GroupedData = {};

  Object.values(data).forEach(item => {
    const { year, month, quantity, price, sLoc } = item;
    const totalPrice = parseInt(price) * parseInt(quantity);

    if (!groupedData[year]) {
      groupedData[year] = {};
    }

    if (!groupedData[year][month]) {
      groupedData[year][month] = {
        totalPrice: 0,
        sLocs: {}
      };
    }

    // Add total price for the month
    groupedData[year][month].totalPrice += totalPrice;

    // Add price for each sLoc
    if (!groupedData[year][month].sLocs[sLoc]) {
      groupedData[year][month].sLocs[sLoc] = 0;
    }
    groupedData[year][month].sLocs[sLoc] += totalPrice;
  });

  return groupedData;
}

// Format data for the chart
function formatDataForChart(groupedData: GroupedData, year: string): ChartData {
  const chartData: ChartData = {
    labels: [], // Months
    datasets: [] // Datasets for each sLoc
  };

  if (groupedData[year]) {
    Object.keys(groupedData[year]).forEach(month => {
      const totalPrice = groupedData[year][month].totalPrice;
      chartData.labels.push(month);

      // Create a dataset for each sLoc
      Object.keys(groupedData[year][month].sLocs).forEach((sLoc, index) => {
        const priceForSLoc = groupedData[year][month].sLocs[sLoc];
        const percentage = (priceForSLoc / totalPrice) * 100;

        // If this is the first time adding the dataset, initialize it
        if (!chartData.datasets[index]) {
          chartData.datasets[index] = {
            label: `sLoc ${sLoc}`,
            data: [],
            backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.5)`,
            borderColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`,
            borderWidth: 1
          };
        }

        // Push the percentage value for each sLoc
        chartData.datasets[index].data.push(percentage);
      });
    });
  }

  return chartData;
}

const StockChart = ({dataInput}:{dataInput: any}) => {
  const [selectedYear, setSelectedYear] = useState<string>('2024'); // Default selected year
  const groupedData = groupDataByYearMonthAndSLoc(data);
  const chartData = formatDataForChart(groupedData, selectedYear);

  // Handle year selection
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div>
      <h1>Stock Price Chart by sLoc</h1>
      
      {/* Year Selector */}
      <select value={selectedYear} onChange={handleYearChange}>
        {Object.keys(groupedData).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Bar Chart Component */}
      <Bar data={chartData} />
    </div>
  );
};

export default StockChart;
