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


const TrashPage: React.FC = () => {
  //* Check Render and Unmount
  console.log("%cTrash Page Render", "color:green");
  useEffect(() => {
    return () => console.log("%cTrash Page Unmount", "color:red");
  }, []);
  //* END Check Render and Unmount
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { authorLogin } = useContext<any>(AuthContext);
  //TODO: get key of delete object
  const keyOfDataDelete = [];
  for (const key in data) {
    if (data[key]?.status?.value == "pre-delete" ) {
      keyOfDataDelete.push(key);
    }
  }
  keyOfDataDelete.reverse();
  //TODO_END: get key of delete object

  //TODO: restore Item
  const handelRestoreItem = (item: string) => {
    const callbackSuccess = (result: string) => {
      if (result === "post successfully!") {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
      } else {
        Toast.show({
          text: "Something is wrong !",
        });
      }
    };
    //!
    const currentTime = Date.now();
    const status = {
      ref: `MainData/${item}/status`,
      data: {
        value: "normal",
        timeStamp: currentTime
      },
    };
    const logsItem: ITF_Logs = {
      ref: `MainData/${item}/logs/${currentTime}`,
      data: {
        behavior: "restore",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,
        detail: "restore",
        item: item,
        timeStamp: currentTime,
      },
    };
    const logsMain: ITF_Logs = {
      ref: `Logs/${currentTime}`,
      data: {
        behavior: "restore",
        author: authorLogin.displayName,
        authorId: authorLogin.userName,
        detail: "restore",
        item: item,
        timeStamp: currentTime,
      },
    };
    const uploadContainer = [status, logsItem, logsMain];
    firebasePostData(uploadContainer, callbackSuccess);
  };
  //TODO_END: restore Item
  //TODO: remove Item
  const handelRemoveItem = async (item: string) => {
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
              behavior: "remove",
              author: authorLogin.displayName,
              authorId: authorLogin.userName,
              detail: "remove",
              item: item,
              timeStamp: currentTime
            },
          };
          const uploadContainer = [logsMain];
          await firebasePostData(uploadContainer, () => {});

          //: lấy data từ firebase sao đó dispatch đê render lại
          const childRef = "MainData/";
          await firebaseGetMainData(childRef, disPatch);
        } else {
          Toast.show({
            text: "Something is wrong !",
          });
        }
      };
      /////////////////////////////////////
      const keyCheck = item || 'Error'
      const ref = `MainData/${keyCheck}`;
      firebaseDeleteData(ref, callbackSuccess);
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
        {keyOfDataDelete.length >= 1 ? (
          <IonList>
            {keyOfDataDelete.map((crrKey, index) => {
              return (
                <IonItem key={index}>
                  
                  <div style={{marginRight: '10px'}}>
                    <IonLabel className="fontSize-normal" color="primary">
                      {crrKey}
                    </IonLabel>
                    <IonLabel style={{fontSize: '10px'}} color="warning">
                      {timestampToTime(data[crrKey]?.status?.timeStamp)}
                    </IonLabel>
                  </div>
                  <IonText>{data[crrKey].description}</IonText>
                  <IonButtons slot="end">
                    <IonButton
                      slot="start"
                      color="success"
                      fill="solid"
                      onClick={() => {
                        handelRestoreItem(crrKey);
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
                        handelRemoveItem(crrKey);
                      }}
                    >
                      Remove
                    </IonButton>
                  </IonButtons>
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <h5 className="fontStyle-italic" style={{ textAlign: "center" }}>
            Trash is empty !
          </h5>
        )}
      </IonContent>
    </IonPage>
  );
};

export default memo(TrashPage);
