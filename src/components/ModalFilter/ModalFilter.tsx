import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useContext, useEffect, useState } from "react";
import { ITF_FilterResult } from "../../interface/mainInterface";

import firebaseGetMainData from "../../firebase/api/getData";

function ModalFilter({
  modalFilterOpen,
  setModalFilterOpen,
  handleFilter,
  isFilter,
  viewStyle,
}: {
  modalFilterOpen: boolean;
  setModalFilterOpen: Function;
  handleFilter: Function;
  isFilter: any;
  viewStyle: string;
}) {
  console.log("%cModalFilter  Render", "color:green");

  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cModalFilter Page Unmount", "color:red");
    };
  }, []);

  // //TODO: Lấy StockList khi load Page lần đầu
  
  //TODO: handle all select
  const handleAllSelect = () => {
    setResultObj(initResult);
  };

  //TODO_END: handle all select
  //TODO: refresh Filter
  useEffect(() => {
    handleAllSelect();
    isFilter.current = false;
  },[viewStyle]);

  //TODO_END: refresh Filter

  // //TODO_END:Lấy StockList khi load Page lần đầu
  const initResult: ITF_FilterResult = {
    user: [],
    stock: [],
    tag: [],
    field: [],
    personal: [],
  };

  const [resultObj, setResultObj] = useState(initResult);

  interface ITF_StockList {
    Sloc: string;
    Description: string;

  }
  const [stockList, setStockList] = useState<ITF_StockList[]>([]);

  const personalList = ["Favorite", "Important", "Private"];

  useEffect(() => {
    const callback = (result: any) => {
      if (result.payload) {
        setStockList(result.payload);
      }
    };
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "AuxiliaryData/StockList/";
    firebaseGetMainData(childRef, callback);
  }, []);
  //TODO: handle toggle select
  const handleToggleSelect = (item: string, group: string) => {
    const key = group as keyof ITF_FilterResult;

    let newArr: string[] = [];
    if (resultObj[key].includes(item)) {
      newArr = resultObj[key].filter((value) => value !== item);
    } else {
      newArr = [...resultObj[key]];
      newArr.push(item);
    }
    const newResultTemp = { ...resultObj };
    newResultTemp[key] = newArr;
    setResultObj(newResultTemp);
  };
  //TODO_END: handle toggle select


  //TODO: handle filterResult
  const handleFilterResult = () => {
    handleFilter(resultObj);
  };

  //TODO_END: handle filterResult
  //TODO: handle refresh

  //TODO_END: handle refresh

  return (
    <IonModal
      isOpen={modalFilterOpen}
      initialBreakpoint={0.85}
      // breakpoints={[0.85]}
      onIonModalDidDismiss={() => {
        setModalFilterOpen!(false);
        handleFilterResult();
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter by</IonTitle>
          <IonButton
            fill="clear"
            slot="end"
            onClick={() => {
              setModalFilterOpen!(false);
              handleFilterResult();
            }}
          >
            confirm
          </IonButton>
          <IonButton fill="clear" slot="start" color="danger" onClick={handleAllSelect}>
            all
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Stock</IonLabel>
            </IonItemDivider>
            {stockList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr.Sloc, "stock");
                }}
              >
                <IonLabel color={resultObj.stock.includes(crr.Sloc) ? "danger" : ""}>
                  {crr.Sloc} - {crr.Description}
                </IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Personal</IonLabel>
            </IonItemDivider>
            {personalList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr, "personal");
                }}
              >
                <IonLabel color={resultObj.personal.includes(crr) ? "danger" : ""}>{crr}</IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel></IonLabel>
            </IonItemDivider>
            <IonItem lines="none"></IonItem>
            <IonItem lines="none"></IonItem>
            <IonItem lines="none"></IonItem>
            <IonItem lines="none"></IonItem>
          </IonItemGroup>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

//! export
export default memo(ModalFilter);
