import { IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton } from "@ionic/react";

export default function SelectHeader({ step, setStep }: { step: any; setStep: Function }) {
    const handelAssignHeader = () => {
      const materialElm = document.querySelector("[name=inboundExcelImport-material]") as HTMLInputElement;
      const stockElm = document.querySelector("[name=inboundExcelImport-stock]") as HTMLInputElement;
      const descriptionElm = document.querySelector("[name=inboundExcelImport-description]") as HTMLInputElement;
      const quantityElm = document.querySelector("[name=inboundExcelImport-quantity]") as HTMLInputElement;
      const quantity2Elm = document.querySelector("[name=inboundExcelImport-quantity2]") as HTMLInputElement;
      const unitElm = document.querySelector("[name=inboundExcelImport-unit]") as HTMLInputElement;
      const priceElm = document.querySelector("[name=inboundExcelImport-price]") as HTMLInputElement;
      const dateElm = document.querySelector("[name=inboundExcelImport-date]") as HTMLInputElement;
      const noteElm = document.querySelector("[name=inboundExcelImport-note]") as HTMLInputElement;
      const batchElm = document.querySelector("[name=inboundExcelImport-batch]") as HTMLInputElement;
      const headerKey = {
        material: materialElm.value,
        sLoc: stockElm.value,
        description: descriptionElm.value,
        quantity: quantityElm.value,
        quantity2: quantity2Elm.value,
        unit: unitElm.value,
        price: priceElm.value,
        date: dateElm.value,
        note: noteElm.value,
        batch: batchElm.value,
      };
      const conditionQuantity = headerKey.quantity || headerKey.quantity2
      if(headerKey.material && headerKey.sLoc && headerKey.description && headerKey.date && conditionQuantity){
        setStep({
          step: 4,
          value: { headerKey, data: step.value.data },
        });
      }
      else{
        alert('Vui lòng chọn Tiêu đề tương ứng !!!')
      }
      
    };
  
    return (
      <IonList style={{width:  '1000px'}}>
        <h4 style={{ width: "100%", textAlign: "center", color: "red" }}>Assign corresponding column headers</h4>
        <IonItem>
          <IonLabel>Material* <i>(Mã vật tư)</i></IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-material" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Stock* <i>(Kho lưu)</i></IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-stock"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Description* <i>(Tên vật tư)</i></IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-description"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Quantity*</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-quantity" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
          <IonSelect slot="end" name="inboundExcelImport-quantity2" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Unit*</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-unit"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Price*</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-price"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Date* <i>(Ngày xuất kho)</i></IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-date"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Note</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-note"  style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Batch</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-batch" style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
            {step.value.key.map((crr: any, index: number) => {
              return (
                <IonSelectOption value={crr} key={index}>
                  {crr}
                </IonSelectOption>
              );
            })}
          </IonSelect>
        </IonItem>
        <br />
        <IonButton expand="block" onClick={handelAssignHeader}>
          Confirm
        </IonButton>
      </IonList>
    );
  }
  