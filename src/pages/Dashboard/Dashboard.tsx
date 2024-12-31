import { IonContent, IonFooter, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonToolbar } from "@ionic/react";
import StockChart from "./StockChart/StockChart";
import { MainContext } from "../../context/mainDataContext";
import { useContext, useEffect } from "react";
import generateColors from "../../components/function/gennerateColors";
import firebaseGetMainData from "../../firebase/api/getData";
import InboundChart from "./InboundChart/InboundChart";
import { InboundDataContext } from "../../context/inboundDataContext";
import { handelStockData } from "./StockChart/function/handelStockData";
import { handelInboundData } from "./InboundChart/function/handelInboundData";

export default function Dashboard() {
  const { data, disPatch } = useContext<any>(MainContext);
  const {InboundData, disPatchInboundData} = useContext<any>(InboundDataContext)

  

  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
    const childRefInbound = "InboundData/";
    firebaseGetMainData(childRefInbound, disPatchInboundData);
  }, []);

  //TODO: gán key of keyOfDataShow sang setKeyOfDataShowFilter

  // Group and calculate
  const stockData = handelStockData(data);
  const inboundData = handelInboundData(InboundData);

  // Display the result
  console.log(stockData);

  return (
    <IonPage>
      <IonContent>
        <IonSegmentView>
          <IonSegmentContent id="first">First</IonSegmentContent>
          <IonSegmentContent id="second">
            <StockChart dataInput={stockData} />
          </IonSegmentContent>
          <IonSegmentContent id="third">
            <InboundChart dataInput={inboundData}/>
          </IonSegmentContent>
          <IonSegmentContent id="fourth">
           4
          </IonSegmentContent>
        </IonSegmentView>
      </IonContent>

      <IonFooter style={{ background: "white" }}>
        <IonSegment value="third" style={{ marginBottom: "0px" }}>
          <IonSegmentButton value="first" contentId="first">
            <IonLabel color="primary">Over View</IonLabel>
          </IonSegmentButton>
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
