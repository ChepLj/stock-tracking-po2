import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonItem, IonList } from "@ionic/react";
import "../OutboundChart.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ITF_dataArrayTemp {
  label: string[];
  totalPrice: number[];
  TotalValue: number;
  TotalMaterial: number;
  materialArray: string[];
}

const OverView = ({ dataInput }: { dataInput: Record<string, any> }) => {

  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const softMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
    if (data) {
      const tempArray: ITF_dataArrayTemp = { label: [], totalPrice: [], TotalValue: 0, TotalMaterial: 0, materialArray: [] };
      for (let i = 1; i <= 12; i++) {
        const item = data[i];
        const totalPrice = Number(item?.totalPrice || 0);
        tempArray.label.push(softMonths[i - 1]);
        tempArray.totalPrice.push(totalPrice);
        tempArray.TotalValue += totalPrice;
      }
      setDataArray(tempArray);
    }
  }, [selectedYear, dataInput]);

  useEffect(() => {
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
        text: "Biểu đồ giá trị xuất kho theo năm",
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

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const formattedTotalValue = dataArray.TotalValue.toLocaleString("en-US");

  return (
    <IonCol size="12" size-lg="6">
          <div className="inbound_chart-container">
            <div className="inbound_chart-YearGroup">
              <select value={selectedYear} onChange={handleYearChange} className="inboundChart">
                {Object.keys(dataInput).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <Bar data={dataChart} options={optionsChart} />
            <div className="stockChart-pie_totalPrice">Total value: {formattedTotalValue} VNĐ</div>
          </div>
        </IonCol>
  );
};

export default OverView;
