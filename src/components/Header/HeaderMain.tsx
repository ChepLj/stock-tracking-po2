import { IonButton, IonButtons, IonCol, IonHeader, IonIcon, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from "@ionic/react";
import { downloadOutline, filterCircleOutline } from "ionicons/icons";
import { ITF_Data } from "../../interface/mainInterface";
import { exportFileFix, exportFileRaw } from "../function/exportFileExcel";

const HeaderMain = ({
  modalFilterOpen,
  setModalFilterOpen,
  callbackResultSearch,
  isFilter,
  value,
  countSearch,
  viewStyle,
  setViewStyle,
  data,
  keyOfDataRaw,
  isPhone,
  setTitle,
}: {
  modalFilterOpen?: boolean;
  setModalFilterOpen?: Function;
  callbackResultSearch?: Function;
  isFilter: boolean;
  value: any;
  countSearch: number[];
  viewStyle: string;
  setViewStyle: Function;
  data: ITF_Data;
  keyOfDataRaw: string[];
  isPhone: boolean;
  setTitle: Function;
}) => {
  console.log("%cHeader  Render", "color:green");

  //TODO: handle view style
  const handleViewStyle = (style: string) => {
    setViewStyle(style);
  };
  //TODO_END: handle view style
  return (
    <IonToolbar>
      <IonButtons slot="start">
        <IonMenuButton />
      </IonButtons>
      <IonRow style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IonCol>
          <div>
            <IonButtons>
              <IonButton
                fill="outline"
                color={viewStyle === "Stock" ? "primary" : "medium"}
                onClick={() => {
                  handleViewStyle("Stock");
                  setTitle("Danh sách Vật tư tồn thực tế theo Kho");
                }}
              >
                Stock
              </IonButton>
              <IonButton
                fill="outline"
                color={viewStyle === "Inbound" ? "primary" : "medium"}
                onClick={() => {
                  handleViewStyle("Inbound");
                  setTitle("Danh sách Vật tư Nhập Kho");
                }}
              >
                Nhập Kho
              </IonButton>
              <IonButton
                fill="outline"
                color={viewStyle === "Outbound" ? "primary" : "medium"}
                onClick={() => {
                  handleViewStyle("Outbound");
                  setTitle("Danh sách Vật tư Xuất Kho");
                }}
              >
                Xuất Kho
              </IonButton>
            </IonButtons>
          </div>
        </IonCol>
        {!isPhone && (
          <IonCol size="auto">
            <IonButtons>
              {/* <IonButton style={{ fontSize: "10px" }} onClick={() => exportFileRaw(data, keyOfDataRaw)}>
                Export Raw
                <IonIcon icon={downloadOutline} style={{ paddingLeft: "4px" }} />
              </IonButton> */}
              <IonButton style={{ fontSize: "10px" }} onClick={exportFileFix}>
                Export Excel
                <IonIcon icon={downloadOutline} style={{ paddingLeft: "4px" }} />
              </IonButton>
              <IonButton style={{ fontSize: "10px" }} color="medium">
                Backup JSON
                <IonIcon icon={downloadOutline} style={{ paddingLeft: "4px" }} />
              </IonButton>
            </IonButtons>
          </IonCol>
        )}

        <IonCol>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minWidth: "100px" }}>
            <div style={{ fontSize: "8px", fontStyle: "italic", padding: "2px", color: "gray" }}>
              {countSearch[0]}/{countSearch[1]} item
            </div>
            <IonSearchbar style={{ padding: "0 5px 0 0", height: "30px" }} debounce={500} showClearButton="never" onIonChange={(ev) => callbackResultSearch!(ev)} value={value}></IonSearchbar>
            <IonIcon icon={filterCircleOutline} slot="end" size="large" color={isFilter ? "danger" : "medium"} onClick={() => setModalFilterOpen!(!modalFilterOpen)} />
          </div>
        </IonCol>
      </IonRow>
    </IonToolbar>
  );
};

//TODO: Export
export default HeaderMain;
