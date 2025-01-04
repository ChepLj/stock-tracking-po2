import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExcelToJson from "../../components/ExcelToJson/ExcelToJson";

export default function Auxiliary() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonBackButton text="Home"></IonBackButton> */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Auxiliary</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>Đang phát triển</IonTitle>
        <ExcelToJson/>
      </IonContent>
    </IonPage>
  );
}
