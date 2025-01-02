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
} from "@ionic/react";
import { ITF_AuthorLogin, ITF_UploadContainer } from "../../interface/mainInterface";
import firebasePostData from "../../firebase/api/postData";
import { MainContext } from "../../context/mainDataContext";
import firebaseGetMainData from "../../firebase/api/getData";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
function ModalEditStock({ isModalOpen, setIsModalOpen }: { isModalOpen: any; setIsModalOpen: Function }) {
  const { disPatch } = useContext<any>(MainContext);
  const [state, setState] = useState(false);
  const unit = ["BT", "EA", "G", "KG", "L", "M", "M2", "M3", "ML", "PAA", "PC", "Set", "TON", "Other"];
  const batch = ["none", "C1", "C2", "C3"];
  //TODO: Assign value when action is Edit
  useEffect(() => {
    setState((pre) => !pre);
  }, [isModalOpen.isOpen]);

  useEffect(() => {
    if (isModalOpen.value) {
      const descriptionElm = document.querySelector('[name="edit-stockModal-description"]') as HTMLInputElement;
      const quantityElm = document.querySelector('[name="editStockModal-quantity"]') as HTMLInputElement;
      const unitElm = document.querySelector('[name="editStockModal-unit"]') as HTMLInputElement;
      const priceElm = document.querySelector('[name="editStockModal-price"]') as HTMLInputElement;
      const batchElm = document.querySelector('[name="editStockModal-batch"]') as HTMLInputElement;
      const noteElm = document.querySelector('[name="editStockModal-note"]') as HTMLInputElement;
      // Ensure elements exist before accessing properties
      if (descriptionElm) {
        descriptionElm.value = isModalOpen.value?.description || "";
      }
      if (quantityElm) {
        quantityElm.value = isModalOpen.value?.quantity || "";
      }
      if (unitElm) {
        unitElm.value = isModalOpen.value?.unit || "";
      }
      if (priceElm) {
        priceElm.value = isModalOpen.value?.price || "";
      }
      if (batchElm) {
        batchElm.value = isModalOpen.value?.batch || "";
      }
      if (noteElm) {
        noteElm.value = isModalOpen.value?.note || "";
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
    console.log("🚀 ~ handelUploadData ~ batchElm:", batchElm.value);
    console.log("🚀 ~ handelUploadData ~ batchElm:", isModalOpen?.value?.batch);
    const noteElm = document.querySelector('[name="editStockModal-note"]') as HTMLInputElement;

    const uploadContainer: ITF_UploadContainer[] = [];

    if (descriptionElm?.value !== isModalOpen?.value?.description) {
      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/description/`,
        data: descriptionElm.value,
      });
    }
    if (quantityElm?.value !== isModalOpen?.value?.quantity) {
      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/quantity/`,
        data: quantityElm.value,
      });
    }
    if (priceElm?.value !== isModalOpen?.value?.price) {
      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/price/`,
        data: priceElm.value,
      });
    }
    if (noteElm?.value !== isModalOpen?.value?.note) {
      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/note/`,
        data: noteElm.value,
      });
    }
    if (unitElm?.value !== isModalOpen?.value?.unit) {
      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/unit/`,
        data: unitElm.value,
      });
    }
    if (batchElm?.value && batchElm?.value !== isModalOpen?.value?.batch ) {

      uploadContainer.push({
        ref: `MainData/${isModalOpen.key}/batch/`,
        data: batchElm.value,
      });
    }
    const timeStamp = Date.now();
    uploadContainer.push(
      {
        ref: `MainData/${isModalOpen.key}/lastUpdate/`,
        data: timeStamp,
      },
      {
        ref: `MainData/${isModalOpen.key}/logs/${timeStamp}/`,
        data: {
          behavior: "Stock Edit",
          detail: `Old Data : ${JSON.stringify(isModalOpen?.value)}`,
          timeStamp: timeStamp,
        },
      },
      {
        ref: `Logs/${timeStamp}`,
        data: {
          key: isModalOpen.key,
          behavior: "Stock Edit",
          description: descriptionElm.value,
          detail: "Stock Edit",
          timeStamp: timeStamp,
        },
      }
    );

    //////////////////////////////
    const handelRefresh = () => {
      //: lấy data từ firebase sao đó dispatch đê render lại
      const childRef = "MainData/";
      firebaseGetMainData(childRef, disPatch);
      setIsModalOpen({ isOpen: false, value: "" });
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
    const userConfirmed = confirm(`Are you sure you want to delete ${isModalOpen.key}?`);

    if (userConfirmed) {
      const key = Date.now();
      const uploadContainer: ITF_UploadContainer[] = [
        {
          ref: `MainData/${isModalOpen.key}/logs/${key}/`,
          data: {
            behavior: "Stock pre-delete",
            timeStamp: key,
          },
        },
        {
          ref: `Logs/${key}`,
          data: {
            behavior: "Stock pre-delete",
            detail: "pre-delete",
            item: "JSON.stringify(isModalOpen.value)",
            timeStamp: key,
            description: isModalOpen.value.description,
            key: isModalOpen.key,
          },
        },
        {
          ref: `MainData/${isModalOpen.key}/status/`,
          data: {
            value: "pre-delete",
            detail: "Stock pre-delete",
            timeStamp: key,
          },
        },
      ];

      //////////////////////////////
      const handelRefresh = () => {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
        setIsModalOpen({ isOpen: false, value: "" });
      };
      //////////////////////////////

      if (uploadContainer.length) {
        firebasePostData(uploadContainer, handelRefresh);
      }
    }
  };
  //TODO_END:

  return (
    <IonModal isOpen={isModalOpen.isOpen} onWillDismiss={() => setIsModalOpen({ isOpen: false, value: "" })}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <i>Edit</i> <strong>{isModalOpen?.value?.material}</strong> <i>Stock</i> <strong>{isModalOpen?.value?.sLoc}</strong>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen({ isOpen: false, value: "" })}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
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

export default ModalEditStock;
