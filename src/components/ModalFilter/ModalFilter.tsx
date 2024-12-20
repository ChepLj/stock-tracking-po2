import { IonButton, IonContent, IonHeader, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useContext, useEffect, useState } from "react";
import { ITF_FilterResult } from "../../interface/mainInterface";
import { AuxiliaryDataContext } from "../../context/auxiliaryDataContext";


function ModalFilter({ modalFilterOpen, setModalFilterOpen, handleFilter, isFilter }: { modalFilterOpen: boolean; setModalFilterOpen: Function; handleFilter: Function; isFilter: boolean }) {
  console.log("%cModalFilter  Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cModalFilter Page Unmount", "color:red");
    };
  }, []);
  const initResult: ITF_FilterResult = {
    user: [],
    stock: [],
    tag: [],
    field: [],
    personal: [],
  };
  const { AuxiliaryData } = useContext<any>(AuxiliaryDataContext);
  const [resultObj, setResultObj] = useState(initResult);
  const userList = [...AuxiliaryData.UserList];
  const stockList = [...AuxiliaryData.StockList];
  const tagList = [...AuxiliaryData.TagList];
  const fieldList = ["Equipment name", "Equipment code", "Progress Tag", "Equipment description", "Equipment note"];
  const personalList = ["Favorite", "Important", "Private"];

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

  //TODO: handle all select
  const handleAllSelect = () => {
    setResultObj(initResult);
  };

  //TODO_END: handle all select

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
              <IonLabel>User</IonLabel>
            </IonItemDivider>
            {userList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr, "user");
                }}
              >
                <IonLabel color={resultObj.user.includes(crr) ? "secondary" : ""}>{crr}</IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Stock</IonLabel>
            </IonItemDivider>
            {stockList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr, "stock");
                }}
              >
                <IonLabel color={resultObj.stock.includes(crr) ? "secondary" : ""}>{crr}</IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>

          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Group</IonLabel>
            </IonItemDivider>
            {tagList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr, "tag");
                }}
              >
                <IonLabel color={resultObj.tag.includes(crr) ? "secondary" : ""}>{crr}</IonLabel>
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
                <IonLabel color={resultObj.personal.includes(crr) ? "secondary" : ""}>{crr}</IonLabel>
              </IonItem>
            ))}
          </IonItemGroup>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Field</IonLabel>
            </IonItemDivider>
            {fieldList.map((crr, index) => (
              <IonItem
                style={{ cursor: "pointer" }}
                disabled={true}
                key={index}
                onClick={() => {
                  handleToggleSelect(crr, "field");
                }}
              >
                <IonLabel color={resultObj.field.includes(crr) ? "secondary" : ""}>{crr}</IonLabel>
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
