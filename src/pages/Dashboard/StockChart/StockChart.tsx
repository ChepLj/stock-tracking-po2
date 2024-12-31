import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, PointElement, LineElement, LineController, BarController } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Chart } from "react-chartjs-2";
import "./StockChart.css";
import generateColors from "../../../components/function/gennerateColors";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController);

export default function StockChart({ dataInput }: { dataInput: any }) {
  const colorArray = generateColors(30);
  const dataArrayTemp: { label: string[]; totalPrice: number[]; TotalValue: number; TotalMaterial: number; materialArray: number[] } = {
    label: [],
    totalPrice: [],
    TotalValue: 0,
    TotalMaterial: 0,
    materialArray: [],
  };
  Object.values(dataInput).forEach((crr: any, index: number) => {
    dataArrayTemp.label.push(crr.sLoc);
    dataArrayTemp.totalPrice.push(crr.totalPrice);
    dataArrayTemp.TotalValue = dataArrayTemp.TotalValue + crr.totalPrice;
    dataArrayTemp.materialArray.push(crr.materials.length);
    dataArrayTemp.TotalMaterial = dataArrayTemp.TotalMaterial + (crr.materials.length);
  });

  const dataPie = {
    labels: dataArrayTemp.label,
    datasets: [
      {
        label: "# Total Price",
        data: dataArrayTemp.totalPrice,
        backgroundColor: colorArray.backgroundColor,
        borderColor: colorArray.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const dataChart = {
    labels: dataArrayTemp.label,
    datasets: [
      {
        type: "line" as const,
        label: "Material",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: dataArrayTemp.materialArray,
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "Price",
        backgroundColor: "rgb(75, 192, 192)",
        data: dataArrayTemp.totalPrice,
        borderColor: "white",
        borderWidth: 2,
        yAxisID: "y1",
      },
    ],
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
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
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

  const formattedTotalValue = dataArrayTemp.TotalValue.toLocaleString("en-US");
  return (
    <IonGrid>
      <IonRow>
        <IonCol size="12" size-lg="8">
          <div className="chart-container">
            <Chart type="bar" data={dataChart} options={optionsChart} redraw={true} />
            <div className="stockChart-pie_totalPrice">Total material: {dataArrayTemp.TotalMaterial} item</div>
          </div>
        </IonCol>
        <IonCol>
          <div className="pie-container">
            <Pie data={dataPie} redraw={true} className="stockChart-pie" />
            <div className="stockChart-pie_totalPrice">Total value: {formattedTotalValue} VNĐ</div>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}
