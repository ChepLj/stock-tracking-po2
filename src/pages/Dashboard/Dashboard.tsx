import { IonButtons, IonContent, IonFooter, IonHeader, IonLabel, IonMenuButton, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonTitle, IonToolbar } from "@ionic/react";
import StockChart from "./StockChart/StockChart";
import { MainContext } from "../../context/mainDataContext";
import { useContext, useEffect, useState } from "react";
import generateColors from "../../components/function/gennerateColors";
import firebaseGetMainData from "../../firebase/api/getData";
import InboundChart from "./InboundChart/InboundChart";
import { InboundDataContext } from "../../context/inboundDataContext";
import { handelStockData } from "./StockChart/function/handelStockData";
import { handelInboundData } from "./InboundChart/function/handelInboundData";
import { OutboundDataContext } from "../../context/outboundDataContext";
import OutboundChart from "./OutboundChart/OutboundChart";
import { handelOutboundData } from "./OutboundChart/function/handelOutboundData";

export default function Dashboard() {
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { InboundData, keyOfInboundDataShow, disPatchInboundData } = useContext<any>(InboundDataContext);
  const { OutboundData, keyOfOutboundDataShow, disPatchOutboundData } = useContext<any>(OutboundDataContext);

  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
  }, []);

  //TODO: gán key of keyOfDataShow sang setKeyOfDataShowFilter

  // Group and calculate
  const stockData = handelStockData(data, keyOfDataShow);
  const inboundData = handelInboundData(InboundData, keyOfInboundDataShow);
  const outboundData = handelOutboundData(OutboundData, keyOfOutboundDataShow);

  // Display the result

  //TODO: handleViewChange

  const handleViewChange = (view: any) => {
    console.log("🚀 ~ handleViewChange ~ view:", view);

    switch (view) {
      case "second": {
        const childRef = "MainData/";
        // setTimeout(()=>{firebaseGetMainData(childRef, disPatch)},400)

        break;
      }
      case "third": {
        const childRefInbound = "InboundData/";
        setTimeout(() => {
          firebaseGetMainData(childRefInbound, disPatchInboundData);
        }, 500);

        break;
      }
      case "fourth": {
        const childRefOutbound = "OutboundData/";
        setTimeout(() => {
          firebaseGetMainData(childRefOutbound, disPatchOutboundData);
        }, 500);

        break;
      }
    }
  };
  //TODO_END: handleViewChange
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonBackButton text="Home"></IonBackButton> */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
          <IonSegmentContent id="second">
            <StockChart dataInput={stockData} />
          </IonSegmentContent>
          <IonSegmentContent id="third">
            <InboundChart dataInput={inboundData} />
          </IonSegmentContent>
          <IonSegmentContent id="fourth">
            <OutboundChart dataInput={outboundData} />
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>

      <IonFooter style={{ background: "white" }}>
        <IonSegment
          style={{ marginBottom: "0px" }}
          onIonChange={(e) => {
            const selectedValue = e.detail.value; // Get the selected value
            console.log("Selected Segment:", selectedValue);
            handleViewChange(selectedValue); // Call the function when the view changes
          }}
        >
          <IonSegmentButton value="second" contentId="second">
            <IonLabel color="primary">Stock</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="third" contentId="third">
            <IonLabel color="primary">Nhập Kho</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="fourth" contentId="fourth">
            <IonLabel color="primary">Xuất Kho</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonFooter>
    </IonPage>
  );
}
