import { IonGrid, IonRow } from "@ionic/react";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import MonthView from "./MonthView/MonthView";
import "./OutboundChart.css";
import OverView from "./OverView/OverView";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const OutboundChart = ({ dataInput }: { dataInput: Record<string, any> }) => {
 

  return (
    <IonGrid>
      <IonRow>
        <OverView dataInput={dataInput}/>
        <MonthView dataInput={dataInput} />
      </IonRow>
      <IonRow>
      </IonRow>
    </IonGrid>
  );
};

export default OutboundChart;
