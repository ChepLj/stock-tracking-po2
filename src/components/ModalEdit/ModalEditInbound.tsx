import React, { useContext, useEffect, useState } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonNote,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
} from "@ionic/react";
import { ITF_AuthorLogin, ITF_UploadContainer } from "../../interface/mainInterface";
import firebasePostData from "../../firebase/api/postData";
import { MainContext } from "../../context/mainDataContext";
import firebaseGetMainData from "../../firebase/api/getData";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { InboundDataContext } from "../../context/inboundDataContext";

function ModalEditInbound({ isModalEditOpen, setIsModalEditOpen }: { isModalEditOpen: any; setIsModalEditOpen: Function }) {
  const { InboundData, disPatchInboundData } = useContext<any>(InboundDataContext);
  const [state, setState] = useState(false);
  const unit = ["BT", "EA", "G", "KG", "L", "M", "M2", "M3", "ML", "PAA", "PC", "Set", "TON", "Other"];
  const batch = ["none", "C1", "C2", "C3"];
  const today = new Date().toISOString().slice(0, 7);

  //TODO: Assign value when action is Edit
  useEffect(() => {
    setState((pre) => !pre);
  }, [isModalEditOpen.isOpen]);

  useEffect(() => {
    if (isModalEditOpen.value) {
      const descriptionElm = document.querySelector('[name="edit-stockModal-description"]') as HTMLInputElement;
      const quantityElm = document.querySelector('[name="editStockModal-quantity"]') as HTMLInputElement;
      const unitElm = document.querySelector('[name="editStockModal-unit"]') as HTMLInputElement;
      const priceElm = document.querySelector('[name="editStockModal-price"]') as HTMLInputElement;
      const batchElm = document.querySelector('[name="editStockModal-batch"]') as HTMLInputElement;
      const noteElm = document.querySelector('[name="editStockModal-note"]') as HTMLInputElement;
      // Ensure elements exist before accessing properties
      if (descriptionElm) {
        descriptionElm.value = isModalEditOpen.value?.description || "";
      }
      if (quantityElm) {
        quantityElm.value = isModalEditOpen.value?.quantity || "";
      }
      if (unitElm) {
        unitElm.value = isModalEditOpen.value?.unit || "";
      }
      if (priceElm) {
        priceElm.value = isModalEditOpen.value?.price || "";
      }
      if (batchElm) {
        batchElm.value = isModalEditOpen.value?.batch || "";
      }
      if (noteElm) {
        noteElm.value = isModalEditOpen.value?.note || "";
      }
    }
  }, [state]);
  //TODO_END: Assign value when action is Edit

  //TODO: Update data
  const handelUploadData = () => {
    const descriptionElm = document.querySelector('[name="edit-stockModal-description"]') as HTMLInputElement;
    const quantityElm = document.querySelector('[name="editStockModal-quantity"]') as HTMLInputElement;
    const unitElm = document.querySelector('[name="editStockModal-unit"]') as HTMLInputElement;

    const priceElm = document.querySelector('[name="editStockModal-price"]') as HTMLInputElement;
    const batchElm = document.querySelector('[name="editStockModal-batch"]') as HTMLInputElement;
    const dateElm = document.getElementById("editStockModal-date") as HTMLInputElement;
    const noteElm = document.querySelector('[name="editStockModal-note"]') as HTMLInputElement;

    const uploadContainer: ITF_UploadContainer[] = [];

    if (descriptionElm?.value !== isModalEditOpen?.value?.description) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/description/`,
        data: descriptionElm.value,
      });
    }
    if (quantityElm?.value !== isModalEditOpen?.value?.quantity) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/quantity/`,
        data: quantityElm.value,
      });
    }
    if (priceElm?.value !== isModalEditOpen?.value?.price) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/price/`,
        data: priceElm.value,
      });
    }
    if (noteElm?.value !== isModalEditOpen?.value?.note) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/note/`,
        data: noteElm.value,
      });
    }
    if (unitElm?.value !== isModalEditOpen?.value?.unit) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/unit/`,
        data: unitElm.value,
      });
    }
    if (batchElm?.value && batchElm?.value !== isModalEditOpen?.value?.batch && batchElm?.value !== "none") {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/batch/`,
        data: batchElm.value,
      });
    }


    const monthYear = dateElm?.value.split("-");
    if (monthYear?.[1] !== isModalEditOpen?.value?.month) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/month/`,
        data: monthYear[1],
      });
    }
    if (monthYear?.[0] !== isModalEditOpen?.value?.year) {
      uploadContainer.push({
        ref: `InboundData/${isModalEditOpen.key}/year/`,
        data: monthYear[0],
      });
    }
    const timeStamp = Date.now();
    uploadContainer.push(
      {
        ref: `InboundData/${isModalEditOpen.key}/lastUpdate/`,
        data: timeStamp,
      },
      {
        ref: `InboundData/${isModalEditOpen.key}/logs/${timeStamp}/`,
        data: {
          behavior: "Inbound Edit",
          detail: `Old Data : ${JSON.stringify(isModalEditOpen?.value)}`,
          timeStamp: timeStamp,
        },
      },
      {
        ref: `Logs/${timeStamp}`,
        data: {
          key: isModalEditOpen.key,
          item: `${isModalEditOpen.value.material}-${isModalEditOpen.value.sLoc}`,
          behavior: "Inbound Edit",
          description: descriptionElm.value,
          detail: "Inbound Edit",
          timeStamp: timeStamp,
        },
      }
    );

    //////////////////////////////
    const handelRefresh = () => {
      //: lấy data từ firebase sao đó dispatch đê render lại
      const childRef = "InboundData/";
      firebaseGetMainData(childRef, disPatchInboundData);
      setIsModalEditOpen({ isOpen: false, value: "" });
    };
    //////////////////////////////
    console.log("🚀 ~ handelUploadData ~ uploadContainer:", uploadContainer);
    if (uploadContainer.length) {
      firebasePostData(uploadContainer, handelRefresh);
    } else {
      alert("Cập nhật bị từ chối vì dữ liệu không thay đổi !");
    }
  };
  //TODO_END: Update data

  //TODO: Xóa đối tượng
  const handelPreDelete = async () => {
    const userConfirmed = confirm(`Are you sure you want to delete ${isModalEditOpen.key}?`);

    if (userConfirmed) {
      const key = Date.now();
      const uploadContainer: ITF_UploadContainer[] = [
        {
          ref: `InboundData/${isModalEditOpen.key}/logs/${key}/`,
          data: {
            behavior: "pre-delete",
            timeStamp: key,
          },
        },
        {
          ref: `Logs/${key}`,
          data: {
            behavior: "Inbound pre-delete",
            detail: "pre-delete",
            item: `${isModalEditOpen.value.material}-${isModalEditOpen.value.sLoc}`,
            timeStamp: key,
            description: isModalEditOpen.value.description,
            key: isModalEditOpen.key,
          },
        },
        {
          ref: `InboundData/${isModalEditOpen.key}/status/`,
          data: {
            value: "pre-delete",
            detail: "Inbound pre-delete",
            timeStamp: key,
          },
        },
      ];

      //////////////////////////////
      const handelRefresh = () => {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "InboundData/";
        firebaseGetMainData(childRef, disPatchInboundData);
        setIsModalEditOpen({ isOpen: false, value: "" });
      };
      //////////////////////////////

      if (uploadContainer.length) {
        firebasePostData(uploadContainer, handelRefresh);
      }
    }
  };
  //TODO_END:
  const dateEditTemp = () => {
    if (isModalEditOpen.value.month && isModalEditOpen.value.year) {
      const month = isModalEditOpen.value.month < 10 ? `0${isModalEditOpen.value.month}` : isModalEditOpen.value.month;
      return `${isModalEditOpen.value.year}-${month}`;
    }
    return today;
  };
  return (
    <IonModal isOpen={isModalEditOpen.isOpen} onWillDismiss={() => setIsModalEditOpen({ isOpen: false, value: "" })}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <i>(Nhập Kho) Edit</i> <strong>{isModalEditOpen?.value?.material}</strong> <i>Stock</i> <strong>{isModalEditOpen?.value?.sLoc}</strong>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalEditOpen({ isOpen: false, value: "" })}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLabel color="danger">Lưu Ý: Thông tin chỉnh sửa ở trang này sẽ KHÔNG được cập nhật bên STOCK</IonLabel>
        <IonList>
          <IonItem>
            <IonLabel color="tertiary">Description</IonLabel>
            <IonInput name="edit-stockModal-description" style={{ textAlign: "end", marginLeft: "10px" }}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Quantity</IonLabel>
            <IonInput type="number" name="editStockModal-quantity" style={{ textAlign: "end", marginLeft: "10px" }}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Unit:</IonLabel>
            <IonSelect slot="end" name="editStockModal-unit" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
              {unit.map((crr, index) => {
                return (
                  <IonSelectOption value={crr} key={index}>
                    {crr}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Price</IonLabel>
            <IonInput type="number" name="editStockModal-price" style={{ textAlign: "end", marginLeft: "10px", marginRight: "2px" }}></IonInput>
            <span> VNĐ</span>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Batch</IonLabel>

            <IonSelect slot="end" name="editStockModal-batch" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
              {batch.map((crr, index) => {
                return (
                  <IonSelectOption value={crr} key={index}>
                    {crr}
                  </IonSelectOption>
                );
              })}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Date {isModalEditOpen.value.month ? "":" (lấy ngày hôm nay)"}</IonLabel>
            <IonDatetimeButton color='danger'  datetime="editStockModal-date"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime id="editStockModal-date" presentation="month-year"  value={dateEditTemp()} yearValues="2024,2025,2026,2027,2028,2029,2030,2031,2032,2033"></IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonLabel color="tertiary">Note</IonLabel>
            <IonTextarea autoGrow={true} name="editStockModal-note" style={{ textAlign: "end", marginLeft: "10px" }}></IonTextarea>
          </IonItem>
        </IonList>
        <IonToolbar>
          <IonButton color="danger" onClick={handelPreDelete}>
            Xóa vật tư này
          </IonButton>
          {/* <IonButton color='medium' fill='outline'>Hủy bỏ</IonButton> */}
          <IonButton slot="end" color="success" onClick={handelUploadData}>
            Cập Nhật
          </IonButton>
        </IonToolbar>
        <br />
        <IonNote>ở tác vụ xóa, vật tư sẽ không được xóa hoàn toàn mà sẽ chuyển vào thùng rác !!!</IonNote>
      </IonContent>
    </IonModal>
  );
}

export default ModalEditInbound;
