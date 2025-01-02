import React, { useEffect, useState } from "react";
import { Bar, Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from "chart.js";
import { IonGrid, IonRow, IonCol, IonLabel, IonSelect, IonSelectOption, IonItem, IonList } from "@ionic/react";
import "./InboundChart.css";
import OverView from "./OverView/OverView";
import MonthView from "./MonthView/MonthView";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const InboundChart = ({ dataInput }: { dataInput: Record<string, any> }) => {
 

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

export default InboundChart;
