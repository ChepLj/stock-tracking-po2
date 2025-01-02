import React, { useEffect, useRef, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { IonCol } from "@ionic/react";
import "../InboundChart.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ITF_dataArrayTemp {
  label: string[];
  totalPrice: number[];
  TotalValue: number;
  TotalMaterial: number;
  materialArray: string[];
}

const MonthView = ({ dataInput }: { dataInput: Record<string, any> , }) => {

  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedMonth, setSelectedMonth] = useState<string>("1");
  const [monthArray, setMonthArray] = useState<string[]>(["1"]);
  const softMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let redraw = useRef(true)
  // Initialize data for chart and table
  const [dataArray, setDataArray] = useState<ITF_dataArrayTemp>({
    label: [],
    totalPrice: [],
    TotalValue: 0,
    TotalMaterial: 0,
    materialArray: [],
  });

  const [dataChart, setDataChart] = useState<any>({
    labels: [],
    datasets: [
      {
        type: "bar" as const,
        label: "Price",
        backgroundColor: "rgb(75, 192, 192)",
        data: [],
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y1",
      },
    ],
  });

  useEffect(() => {
    const data = dataInput[selectedYear];
    redraw.current = true
    if (data) {
      const months = Object.keys(data);
      setMonthArray(months);
      setSelectedMonth(months[0]); // Set default month when the year changes
    }
  }, [selectedYear, dataInput]);

  useEffect(() => {
    const data = dataInput[selectedYear]?.[selectedMonth];
    redraw.current = false
       
    if (data) {

      const sLocData = data.sLocData;
      if (sLocData) {
        const tempArray: ITF_dataArrayTemp = { label: [], totalPrice: [], TotalValue: 0, TotalMaterial: 0, materialArray: [] };

        for (const key in sLocData) {
          const item = sLocData[key];
          tempArray.label.push(key);
          tempArray.totalPrice.push(item?.totalPrice);
        }
        tempArray.TotalValue = data.totalPrice
        setDataArray(tempArray);
      }
    }
  }, [selectedYear, selectedMonth, dataInput]);

  useEffect(() => {
    setDataChart({
      labels: dataArray.label,
      datasets: [
        {
          type: "bar" as const,
          label: "Price",
          backgroundColor: "rgb(79, 192, 75)",
          data: dataArray.totalPrice,
          borderColor: "white",
          borderWidth: 2,
          yAxisID: "y1",
        },
      ],
    });
  }, [dataArray]);

  const optionsChart: ChartOptions<"bar"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Biểu đồ giá trị nhập kho theo tháng",
      },
    },
    scales: {
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        type: "category",
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  const formattedTotalValue = dataArray.TotalValue.toLocaleString("en-US");

  return (
    <IonCol size="12" size-lg="6">
      <div className="inbound_chart-container">
        <div className="inbound_chart-monthYearGroup">
          <div className="custom-select-container">
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="inboundChart">
              {Object.keys(dataInput).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="custom-select-container">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="inboundChart">
              {monthArray.map((month) => (
                <option key={month} value={month}>
                  {softMonths[parseInt(month) - 1]} {/* Show month name */}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Bar data={dataChart} options={optionsChart} redraw={redraw.current}/>
        <div className="stockChart-pie_totalPrice">Total value: {formattedTotalValue} VNĐ</div>
      </div>
    </IonCol>
  );
};

export default MonthView;
