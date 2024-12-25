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
  
      setStep({
        step: 4,
        value: { headerKey, data: step.value.data },
      });
    };
  
    return (
      <IonList>
        <h4 style={{ width: "100%", textAlign: "center", color: "red" }}>Assign corresponding column headers</h4>
        <IonItem>
          <IonLabel>Material</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-material" value={"MVT"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonLabel>Stock</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-stock" value={"KHO\r\nBPSD"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonLabel>Description</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-description" value={"TÊN VT"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonLabel>Quantity</IonLabel>
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
          <IonLabel>Unit</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-unit" value={"ĐVT"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonLabel>Price</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-price" value={"GÍA SAP"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonLabel>Date</IonLabel>
          <IonSelect slot="end" name="inboundExcelImport-date" value={"NGÀY NHẬP"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
          <IonSelect slot="end" name="inboundExcelImport-note" value={"GHI CHÚ"} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
  