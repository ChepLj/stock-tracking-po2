import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { Toast } from "@capacitor/toast";
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonText, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useContext, useEffect } from "react";
import { AuthContext } from "../../context/loginContext";
import { MainContext } from "../../context/mainDataContext";
import firebaseDeleteData from "../../firebase/api/deleteData";
import firebaseGetMainData from "../../firebase/api/getData";
import firebasePostData from "../../firebase/api/postData";
import { ITF_Logs } from "../../interface/mainInterface";
import timestampToTime from "../../components/function/timestampToTime";
import { InboundDataContext } from "../../context/inboundDataContext";
import { OutboundDataContext } from "../../context/outboundDataContext";
import { checkActionCode } from "firebase/auth";
import { checkLevelAcc } from "../../components/function/checkLevelAcc";

const TrashPage: React.FC = () => {
  //* Check Render and Unmount
  console.log("%cTrash Page Render", "color:green");
  useEffect(() => {
    return () => console.log("%cTrash Page Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { InboundData, disPatchInboundData } = useContext<any>(InboundDataContext);
  const { OutboundData, disPatchOutboundData } = useContext<any>(OutboundDataContext);
  const { authorLogin } = useContext<any>(AuthContext);

  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
    const childRefInbound = "InboundData/";
    firebaseGetMainData(childRefInbound, disPatchInboundData);
    const childRefOutbound = "OutboundData/";
    firebaseGetMainData(childRefOutbound, disPatchOutboundData);
  }, []);
  //TODO: get key of delete object
  const keyOfStockDataDelete = [];
  const keyOfInboundDataDelete = [];
  const keyOfOutboundDataDelete = [];
  for (const key in data) {
    if (data[key]?.status?.value == "pre-delete") {
      keyOfStockDataDelete.push(key);
    }
  }
  for (const key in InboundData) {
    if (InboundData[key]?.status?.value == "pre-delete") {
      keyOfInboundDataDelete.push(key);
    }
  }
  for (const key in OutboundData) {
    if (OutboundData[key]?.status?.value == "pre-delete") {
      keyOfOutboundDataDelete.push(key);
    }
  }
  keyOfStockDataDelete.reverse();
  keyOfInboundDataDelete.reverse();
  keyOfOutboundDataDelete.reverse();
  //TODO_END: get key of delete object

  //TODO: restore Item
  const handelRestoreItem = (item: string, ref: string) => {
    if (checkLevelAcc(authorLogin)) {
      const callbackSuccess = (result: string) => {
        if (result === "post successfully!") {
          //: lấy data từ firebase sao đó dispatch đê render lại
          const childRef = `${ref}/`;
          const disPatchFunctionTemp = ref == "MainData" ? disPatch : ref == "InboundData" ? disPatchInboundData : disPatchOutboundData;
          firebaseGetMainData(childRef, disPatchFunctionTemp);
        } else {
          Toast.show({
            text: "Something is wrong !",
          });
        }
      };
      //!
      const currentTime = Date.now();
      const status = {
        ref: `${ref}/${item}/status`,
        data: {
          value: "normal",
          timeStamp: currentTime,
        },
      };
      const logsItem: ITF_Logs = {
        ref: `${ref}/${item}/logs/${currentTime}`,
        data: {
          behavior: "restore",
          author: authorLogin.displayName,
          authorId: authorLogin.userName,
          detail: "restore",

          timeStamp: currentTime,
        },
      };
      const logsMain: ITF_Logs = {
        ref: `Logs/${currentTime}`,
        data: {
          key: item,
          description: data[item]?.description || "",
          behavior: ref == "MainData" ? "Stock restore" : ref == "InboundData" ? "Inbound restore" : "Outbound restore",
          author: authorLogin.displayName,
          authorId: authorLogin.userName,
          detail: "restore",

          timeStamp: currentTime,
        },
      };
      const uploadContainer = [status, logsItem, logsMain];
      firebasePostData(uploadContainer, callbackSuccess);
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };
  //TODO_END: restore Item
  //TODO: remove Item
  const handelRemoveItem = async (item: string, ref: string) => {
    if (checkLevelAcc(authorLogin)) {
      const result = await ActionSheet.showActions({
        title: `Delete forever ${item} item`,
        message: `Are you sure delete forever ${item} item ?`,
        options: [
          {
            title: "Delete",
            style: ActionSheetButtonStyle.Destructive,
          },
          {
            title: "Cancel",
            style: ActionSheetButtonStyle.Cancel,
          },
        ],
      });
      if (result.index === 0) {
        const callbackSuccess = async (result: string) => {
          if (result === "remove successfully!") {
            const currentTime = Date.now();
            const logsMain: ITF_Logs = {
              ref: `Logs/${currentTime}`,
              data: {
                behavior: ref == "MainData" ? "Stock remove" : ref == "InboundData" ? "Inbound remove" : "Outbound remove",
                author: authorLogin.displayName,
                authorId: authorLogin.userName,
                detail: "remove",
                key: item,
                description: data[item]?.description || "",
                timeStamp: currentTime,
              },
            };
            const uploadContainer = [logsMain];
            await firebasePostData(uploadContainer, () => {});

            //: lấy data từ firebase sao đó dispatch đê render lại
            const childRef = `${ref}/`;
            const disPatchFunctionTemp = ref == "MainData" ? disPatch : ref == "InboundData" ? disPatchInboundData : disPatchOutboundData;

            await firebaseGetMainData(childRef, disPatchFunctionTemp);
          } else {
            Toast.show({
              text: "Something is wrong !",
            });
          }
        };
        /////////////////////////////////////
        const keyCheck = item || "Error";
        const refMain = `${ref}/${keyCheck}`;
        firebaseDeleteData(refMain, callbackSuccess);
      }
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };
  //TODO_END: remove Item
  return (
    <IonPage>
      {/* <Header title="Trash"></Header> */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {/* <IonBackButton text="Home"></IonBackButton> */}
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Trash</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <p style={{ width: "100%", display: "block", textAlign: "center", fontSize: "10px", color: "gray", margin: "10px" }}>------- Stock -------</p>
        {keyOfStockDataDelete.length >= 1 ? (
          <IonList>
            {keyOfStockDataDelete.map((crrKey, index) => {
              return (
                <IonItem key={index}>
                  <div style={{ marginRight: "10px" }}>
                    <IonLabel className="fontSize-normal" color="primary">
                      {crrKey}
                    </IonLabel>
                    <IonLabel style={{ fontSize: "10px" }} color="warning">
                      {data[crrKey]?.status?.detail}
                    </IonLabel>
                  </div>
                  <IonText style={{ width: "100%" }}>{data[crrKey].description}</IonText>
                  <div>
                    <IonButtons slot="end">
                      <IonButton
                        slot="start"
                        color="success"
                        fill="solid"
                        onClick={() => {
                          handelRestoreItem(crrKey, "MainData");
                        }}
                      >
                        Restore
                      </IonButton>
                      <span style={{ width: "10px" }}></span>
                      <IonButton
                        slot="end"
                        color="danger"
                        fill="solid"
                        onClick={() => {
                          handelRemoveItem(crrKey, "MainData");
                        }}
                      >
                        Remove
                      </IonButton>
                    </IonButtons>
                    <IonLabel style={{ fontSize: "10px" }} slot="end" color="warning">
                      {timestampToTime(data[crrKey]?.status?.timeStamp)}
                    </IonLabel>
                  </div>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <h5 className="fontStyle-italic" style={{ textAlign: "center" }}>
            Stock Trash is empty !
          </h5>
        )}

        {/* Inbound */}
        <p style={{ width: "100%", display: "block", textAlign: "center", fontSize: "10px", color: "gray", margin: "10px" }}>------- Inbound -------</p>
        {keyOfInboundDataDelete.length >= 1 ? (
          <IonList>
            {keyOfInboundDataDelete.map((crrKey, index) => {
              return (
                <IonItem key={index}>
                  <div style={{ marginRight: "10px" }}>
                    <IonLabel className="fontSize-normal" color="primary">
                      {crrKey}
                    </IonLabel>
                    <IonLabel style={{ fontSize: "10px" }} color="warning">
                      {InboundData[crrKey]?.status?.detail}
                    </IonLabel>
                  </div>
                  <IonText style={{ width: "100%" }}>{InboundData[crrKey].description}</IonText>
                  <div>
                    <IonButtons slot="end">
                      <IonButton
                        slot="start"
                        color="success"
                        fill="solid"
                        onClick={() => {
                          handelRestoreItem(crrKey, "InboundData");
                        }}
                      >
                        Restore
                      </IonButton>
                      <span style={{ width: "10px" }}></span>
                      <IonButton
                        slot="end"
                        color="danger"
                        fill="solid"
                        onClick={() => {
                          handelRemoveItem(crrKey, "InboundData");
                        }}
                      >
                        Remove
                      </IonButton>
                    </IonButtons>
                    <IonLabel style={{ fontSize: "10px" }} slot="end" color="warning">
                      {timestampToTime(InboundData[crrKey]?.status?.timeStamp)}
                    </IonLabel>
                  </div>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <h5 className="fontStyle-italic" style={{ textAlign: "center" }}>
            The Inbound trash is empty Or see the "Nhập Kho" page after returning here!
          </h5>
        )}

        {/* Outbound */}
        <p style={{ width: "100%", display: "block", textAlign: "center", fontSize: "10px", color: "gray", margin: "10px" }}>------- Outbound -------</p>
        {keyOfOutboundDataDelete.length >= 1 ? (
          <IonList>
            {keyOfOutboundDataDelete.map((crrKey, index) => {
              return (
                <IonItem key={index}>
                  <div style={{ marginRight: "10px" }}>
                    <IonLabel className="fontSize-normal" color="primary">
                      {crrKey}
                    </IonLabel>
                    <IonLabel style={{ fontSize: "10px" }} color="warning">
                      {OutboundData[crrKey]?.status?.detail}
                    </IonLabel>
                  </div>
                  <IonText style={{ width: "100%" }}>{OutboundData[crrKey].description}</IonText>
                  <div>
                    <IonButtons slot="end">
                      <IonButton
                        slot="start"
                        color="success"
                        fill="solid"
                        onClick={() => {
                          handelRestoreItem(crrKey, "OutboundData");
                        }}
                      >
                        Restore
                      </IonButton>
                      <span style={{ width: "10px" }}></span>
                      <IonButton
                        slot="end"
                        color="danger"
                        fill="solid"
                        onClick={() => {
                          handelRemoveItem(crrKey, "OutboundData");
                        }}
                      >
                        Remove
                      </IonButton>
                    </IonButtons>
                    <IonLabel style={{ fontSize: "10px" }} slot="end" color="warning">
                      {timestampToTime(OutboundData[crrKey]?.status?.timeStamp)}
                    </IonLabel>
                  </div>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <h5 className="fontStyle-italic" style={{ textAlign: "center" }}>
            The Outbound trash is empty Or see the "Nhập Kho" page after returning here!
          </h5>
        )}
      </IonContent>
    </IonPage>
  );
};

export default memo(TrashPage);
