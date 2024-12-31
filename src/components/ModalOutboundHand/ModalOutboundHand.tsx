import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/mainDataContext";
import firebaseGetMainData from "../../firebase/api/getData";
import firebasePostData from "../../firebase/api/postData";
import { ITF_UploadContainer } from "../../interface/mainInterface";
import { InboundDataContext } from "../../context/inboundDataContext";
import { OutboundDataContext } from "../../context/outboundDataContext";

function ModalOutboundHand({ isModalOpen, setIsModalOpen }: { isModalOpen: any; setIsModalOpen: Function }) {
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { OutboundData, disPatchOutboundData } = useContext<any>(OutboundDataContext);
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState<any>({});
  const unit = ["PC", "Set", "BT", "EA", "G", "KG", "L", "M", "M2", "M3", "ML", "PAA", "TON", "Other"];
  const batch = ["none", "C1", "C2", "C3"];
  const [stockList, setStockList] = useState<any>([]);
  const [error, setError] = useState<any>("");
  // Get today's date in "YYYY-MM" format
  const today = new Date().toISOString().slice(0, 7);

  //TODO: Lấy StockList khi load Page lần đầu
  useEffect(() => {
    const callback = (data: any) => {
      setStockList(data.payload);
    };
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "AuxiliaryData/StockList/";
    firebaseGetMainData(childRef, callback);
  }, []);

  //TODO_END:Lấy StockList khi load Page lần đầu

  //TODO: Assign value when action is Edit
  useEffect(() => {
    setState((pre) => !pre);
  }, [isModalOpen.isOpen]);

  useEffect(() => {
    if (searchValue?.value?.material) {
      const materialElm = document.querySelector('[name="inbound-Modal-material"]') as HTMLInputElement;
      const stockElm = document.querySelector('[name="inbound-Modal-stock"]') as HTMLInputElement;
      const descriptionElm = document.querySelector('[name="inbound-Modal-description"]') as HTMLInputElement;
      const quantityElm = document.querySelector('[name="inbound-Modal-quantity"]') as HTMLInputElement;
      const unitElm = document.querySelector('[name="inbound-Modal-unit"]') as HTMLInputElement;
      const priceElm = document.querySelector('[name="inbound-Modal-price"]') as HTMLInputElement;
      const batchElm = document.querySelector('[name="inbound-Modal-batch"]') as HTMLInputElement;
      const noteElm = document.querySelector('[name="inbound-Modal-note"]') as HTMLInputElement;

      // Ensure elements exist before accessing properties
      const dataTemp = searchValue.value;

      if (descriptionElm) {
        descriptionElm.value = dataTemp?.description || "";
      }
      if (materialElm) {
        materialElm.value = dataTemp?.material || "";
      }
      if (stockElm) {
        stockElm.value = dataTemp?.sLoc || "";
      }
      if (quantityElm) {
        // quantityElm.value = dataTemp?.quantity || "";
      }
      if (unitElm) {
        unitElm.value = dataTemp?.unit || "";
      }
      if (priceElm) {
        priceElm.value = dataTemp?.price || 1;
      }
      if (batchElm) {
        batchElm.value = dataTemp?.batch || "";
      }
      if (noteElm) {
        noteElm.value = dataTemp?.note || "";
      }
    }
  }, [state]);

  //TODO_END: Assign value when action is Edit

  //TODO: Search Stock

  const handelSearch = () => {
    const searchElm = (document.querySelector('[name="inbound-stockModal-materialSearch"]') as HTMLInputElement).value;
    const stockElm = (document.querySelector('[name="inbound-stockModal-stockSearch"]') as HTMLInputElement).value;
    if (searchElm && stockElm && searchElm.length == 9) {
      const key = `${searchElm}-${stockElm}`;

      if (data[key]) {
        console.log("🚀 ~ handelSearch ~ data[key]):", data[key]);
        setSearchValue({ value: data[key], messenger: "" });
        setState((pre) => !pre);
        setError("");
      } else {
        setSearchValue({ value: "", messenger: "Không tìm thấy Vật tư cùng Kho này trong Stock . Hành động sẽ là thêm mới !" });
        setState((pre) => !pre);
        setError("Không tìm thấy Vật tư cùng Kho này trong Stock . Kiểm tra lại Vật tư và Kho !");
      }
    } else {
      setError("Điền đầy đủ Mã Vật Tư và Kho ! (MVT = 9 ký tự)");
    }
  };
  //TODO_END: Search Stock

  //TODO: Update data
  const handelUploadData = () => {
    const searchElm = (document.querySelector('[name="inbound-Modal-material"]') as HTMLInputElement).value;
    const stockElm = (document.querySelector('[name="inbound-Modal-stock"]') as HTMLInputElement).value;
    const descriptionElm = document.querySelector('[name="inbound-Modal-description"]') as HTMLInputElement;
    const quantityElm = document.querySelector('[name="inbound-Modal-quantity"]') as HTMLInputElement;
    const unitElm = document.querySelector('[name="inbound-Modal-unit"]') as HTMLInputElement;
    const dateElm = document.getElementById("datetime-inbound-hand") as HTMLInputElement;
    const priceElm = document.querySelector('[name="inbound-Modal-price"]') as HTMLInputElement;
    const batchElm = document.querySelector('[name="inbound-Modal-batch"]') as HTMLInputElement;
    const noteElm = document.querySelector('[name="inbound-Modal-note"]') as HTMLInputElement;
    const key = `${searchElm}-${stockElm}`;
    const uploadContainer: ITF_UploadContainer[] = [];

    try {
      const dataTemp = searchValue.value;
      console.log("🚀 ~ handelUploadData ~ dataTemp:", dataTemp);
      
      if (+quantityElm?.value > 0) {
        const stockQuantity = Number(dataTemp?.quantity) || 0
        const outboundQuantity = Number(quantityElm.value)
        const quantityTemp = ()=>{
          if(stockQuantity -  outboundQuantity < 0){
            throw new Error ('Số lượng xuất kho lớn hơn số lượng tồn kho. Lỗi !')
          }
          return stockQuantity -  outboundQuantity
        }
        uploadContainer.push({
          ref: `MainData/${key}/quantity/`,
          data: quantityTemp(),
        });
      } else {
        throw new Error(`Số lượng không hợp lệ !`);
      }
      if (+priceElm?.value <= 0) {
        throw new Error("Giá không hợp lệ !");
      }
      if (priceElm?.value > dataTemp?.price) {
        uploadContainer.push({
          ref: `MainData/${key}/price/`,
          data: priceElm.value,
        });
      }
      
      if (!unitElm?.value) {
        throw new Error("Chưa chọn đơn vị !");
      }
      if (unitElm?.value !== dataTemp?.unit && !dataTemp?.unit) {
        uploadContainer.push({
          ref: `MainData/${key}/unit/`,
          data: unitElm.value,
        });
      }
 

      const timeStamp = Date.now(); // Current timestamp in milliseconds

      uploadContainer.push(
        {
          ref: `MainData/${key}/lastUpdate/`,
          data: timeStamp,
        },
        {
          ref: `MainData/${key}/logs/${timeStamp}/`,
          data: {
            behavior: "Outbound",
            detail: 'Xuất kho thủ công',
            timeStamp: timeStamp,
          },
        },
        {
          ref: `Logs/${timeStamp}`,
          data: {
            key: key,
            behavior: "Outbound",
            description: descriptionElm.value,
            detail: 'Xuất kho thủ công',
            timeStamp: timeStamp,
          },
        }
      );
      ///////////////////////
      const monthYear = dateElm.value.split("-");

      uploadContainer.push({
        ref: `OutboundData/${key}-${timeStamp}/`,
        data: {
          material: searchElm,
          description: descriptionElm.value,
          sLoc: stockElm,
          quantity: quantityElm.value,
          unit: unitElm.value,
          price: priceElm.value,
          note: noteElm.value,
          batch: batchElm.value,
          lastUpdate: timeStamp,
          logs: "",
          year: monthYear[0],
          month: monthYear[1],
        },
      });

      //////////////////////////////
      const handelRefresh = () => {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
        const childOutboundRef = "OutboundData/";
        firebaseGetMainData(childOutboundRef, disPatchOutboundData);
        // setIsModalOpen({ isOpen: false, value: "" });
        setSearchValue({ value: "", messenger: "" });
        setError("");
        alert(`Xuất thành công ${quantityElm.value} ${unitElm.value} Vật tư ${searchElm}  Kho ${stockElm}`);
      };
      //////////////////////////////
      console.log("🚀 ~ handelUploadData ~ uploadContainer:", uploadContainer);
      if (uploadContainer.length) {
        firebasePostData(uploadContainer, handelRefresh);
      } else {
        alert("Cập nhật bị từ chối vì dữ liệu không thay đổi !");
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };
  //TODO_END: Update data

  return (
    <IonModal isOpen={isModalOpen.isOpen} onWillDismiss={() => setIsModalOpen({ isOpen: false, value: "" })}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <i>Xuất Kho </i>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsModalOpen({ isOpen: false, value: "" })}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!searchValue?.value?.material ? (
          <>
            <IonList>
              <IonItem>
                <IonInput
                  name="inbound-stockModal-materialSearch"
                  label="Nhập Mã Vật Tư :"
                  type="number"
                  placeholder="Enter text"
                  color="success"
                  style={{ fontSize: "20px", color: "red" }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel>Kho xuất:</IonLabel>
                <IonSelect name="inbound-stockModal-stockSearch" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
                  {stockList.map((crr: any, index: number) => {
                    return (
                      <IonSelectOption value={crr?.Sloc} key={index}>
                        {crr?.Sloc} - {crr?.Description}
                      </IonSelectOption>
                    );
                  })}
                </IonSelect>
              </IonItem>
              <br />
              <IonButton expand="block" onClick={handelSearch}>
                Search
              </IonButton>
            </IonList>
            {error && <IonText color="danger">{error}</IonText>}
          </>
        ) : (
          <>
            {" "}
            <IonText color="danger">{searchValue.messenger}</IonText>
            <IonList>
              <IonItem>
                <IonLabel color="tertiary">Material</IonLabel>
                <IonInput name="inbound-Modal-material" style={{ textAlign: "end", marginLeft: "10px", fontWeight: "500", fontSize: "20px", color: "red" }} readonly></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel color="tertiary">Stock</IonLabel>
                <IonInput name="inbound-Modal-stock" style={{ textAlign: "end", marginLeft: "10px", fontWeight: "500", fontSize: "20px", color: "green" }} readonly></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel color="tertiary">Description</IonLabel>
                <IonInput name="inbound-Modal-description" placeholder="Enter text" style={{ textAlign: "end", marginLeft: "10px" }} readonly={searchValue.value.isNew ? false : true}></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary">Unit:</IonLabel>
                <IonSelect slot="end" name="inbound-Modal-unit" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
                <IonInput type="number" name="inbound-Modal-price" style={{ textAlign: "end", marginLeft: "10px", marginRight: "2px" }}></IonInput>
                <span> VNĐ</span>
              </IonItem>
              <IonItem>
                <IonLabel color="tertiary">Batch</IonLabel>

                <IonSelect slot="end" name="inbound-Modal-batch" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
                <IonLabel color="tertiary">Date</IonLabel>
                <IonDatetimeButton datetime="datetime-inbound-hand"></IonDatetimeButton>
                <IonModal keepContentsMounted={true}>
                  <IonDatetime id="datetime-inbound-hand" presentation="month-year" value={today} yearValues="2024,2025,2026,2027,2028,2029,2030,2031,2032,2033"></IonDatetime>
                </IonModal>
              </IonItem>

              <IonItem>
                <IonLabel color="tertiary">Note</IonLabel>
                <IonTextarea autoGrow={true} name="inbound-Modal-note" style={{ textAlign: "end", marginLeft: "10px" }}></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel style={{ fontSize: "20px" }} color="danger">
                  Quantity<i style={{ color: "gray", fontSize: "smaller" }}>({searchValue?.value.quantity})</i>
                </IonLabel>
                <IonInput type="number" name="inbound-Modal-quantity" placeholder="Enter value" style={{ textAlign: "end", marginLeft: "10px", fontSize: "28px", color: "green" }}></IonInput>
              </IonItem>
            </IonList>
            {error && <IonNote style={{ textAlign: "end", width: "100%", color: "red" }}>{error}</IonNote>}
            <br />
            <IonToolbar>
              <IonButton
                fill="outline"
                slot="end"
                color="medium"
                onClick={() => {
                  setSearchValue({});
                  setError("");
                }}
              >
                Reset
              </IonButton>
              <IonButton slot="end" color="secondary" onClick={handelUploadData}>
                Tạo Lệnh Xuất Kho
              </IonButton>
            </IonToolbar>
          </>
        )}
      </IonContent>
    </IonModal>
  );
}

export default ModalOutboundHand;
