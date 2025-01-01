import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { handelInboundData } from "./function/handelInboundData";
import { IonGrid, IonRow, IonCol } from "@ionic/react";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface ITF_dataArrayTemp {
  label: string[];
  totalPrice: number[];
  TotalValue: number;
  TotalMaterial: number;
  materialArray: string[];
}

const StockChart = ({ dataInput }: { dataInput: any }) => {
  // console.log("🚀 ~ StockChart ~ dataInput:", dataInput)
  const [selectedYear, setSelectedYear] = useState<string>("2024"); // Default selected year
  const softMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [dataArray, setDataArray] = useState<ITF_dataArrayTemp>({
    label: [],
    totalPrice: [],
    TotalValue: 0,
    TotalMaterial: 0,
    materialArray: [],
  });
  const [dataChart, setDataChart] = useState<any>({
    labels: [''],
    datasets: [
      {
        type: "bar" as const,
        label: "Price",
        backgroundColor: "rgb(75, 192, 192)",
        data: [''],
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y1",
      },
    ],
  })
  //TODO: change year
  useEffect(() => {
    const data = dataInput[selectedYear.toString()];
    if (data) {
      const dataArrayTemp: ITF_dataArrayTemp = { label: [], totalPrice: [], TotalValue: 0, TotalMaterial: 0, materialArray: [] };
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((crr: any, index: number) => {
        const item = data[crr];
        const totalPrice = Number(item?.totalPrice) || 0;
        dataArrayTemp.label.push(softMonths[crr - 1]);
        dataArrayTemp.totalPrice.push(totalPrice);
        dataArrayTemp.TotalValue = dataArrayTemp.TotalValue + totalPrice;
        // dataArrayTemp.materialArray.push(item.materials.length);
        // dataArrayTemp.TotalMaterial = dataArrayTemp.TotalMaterial + (item.materials.length);
      });
      setDataArray(dataArrayTemp);
      setDataChart({
        labels: dataArray.label,
        datasets: [
          {
            type: "bar" as const,
            label: "Price",
            backgroundColor: "rgb(75, 192, 192)",
            data: dataArray.totalPrice,
            borderColor: "white",
            borderWidth: 2,
            yAxisID: "y1",
          },
        ],
      })
    }
  }, [selectedYear, dataInput]);

  //TODO_END: change year

  // Handle year selection
  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };



  const optionsChart = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Biểu đồ giá trị nhập kho theo tháng",
      },
    },
    scales: {
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  const formattedTotalValue = dataArray.TotalValue.toLocaleString("en-US");

  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" size-lg="8">
          <div className="chart-container">
            <select value={selectedYear} onChange={handleYearChange}>
              {Object.keys(dataInput).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <Chart type="bar" data={dataChart} options={optionsChart} redraw={true} />
            <div className="stockChart-pie_totalPrice">Total value: {formattedTotalValue} VNĐ</div>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default StockChart;
