import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonPopover, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useEffect, useState } from "react";
import timestampToTime from "../../components/function/timestampToTime";
import firebaseGetMainData from "../../firebase/api/getData";


const LogsPage: React.FC = () => {
  //* Check Render and Unmount
  console.log("%cLogs Page Render", "color:green");
  useEffect(() => {
    return () => console.log("%cLogs Page Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const [state, setState] = useState<any>();
  //TODO: get data from sever
  useEffect(() => {
    const callback = (content: any) => {
      console.log("🚀 ~ callback ~ content:", content)
      if (content.type === "SUCCESSFUL") {
        setState(content.payload);
      }
    };
    const childRef = `Logs`;
    firebaseGetMainData(childRef, callback);
  }, []);

  //TODO_end: get data from sever
  return (
    <IonPage>
      {/* <Header title="Logs"></Header> */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonBackButton text="Home"></IonBackButton> */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Logs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {state ? (
            Object.keys(state)
              .reverse()
              .map((crr, index) => {
                return (
                  <IonItem key={index}>
                     <div style={{marginRight: '10px'}}>
                    <IonLabel className="fontSize-normal" color="primary">
                      {state[+crr]?.item}
                    </IonLabel>
                    <IonLabel style={{fontSize: '10px'}} color="warning">
                      {timestampToTime(state[+crr]?.status?.timeStamp)}
                    </IonLabel>
                  </div>
                  <IonText>{state[+crr].description}</IonText>
                    <IonLabel id={`log-detail-${crr}`} className="fontSize-normal no-margin-top-bottom">
                      {state[+crr]?.detail}
                    </IonLabel>
                    <div className="fontStyle-italic fontSize-small alight-right"  style={{fontSize: '10px'}}>
                      <IonText>{state[+crr]?.author}</IonText>
                      <IonLabel>{timestampToTime(+crr)}</IonLabel>
                    </div>
                    <IonPopover trigger={`log-detail-${crr}`} triggerAction="click" side="end">
                      <IonText class="ion-padding">{state[+crr]?.detail}</IonText>
                    </IonPopover>
                  </IonItem>
                );
              })
          ) : (
            <IonItem lines="none">Không có dữ liệu !</IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default memo(LogsPage);