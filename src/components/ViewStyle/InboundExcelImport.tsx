import * as XLSX from "xlsx";
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonItem, IonLabel, IonText, IonChip, IonList, IonNote, IonInput, IonSelect, IonSelectOption } from "@ionic/react";
import { useState } from "react";
import excelDateToMonthYear from "../function/excelDateToMonthYear";

const InboundExcelImport = ({ setIsImportFromExcel, setTitle }: { setIsImportFromExcel: Function; setTitle: Function }) => {
  const [step, setStep] = useState<{ step: number; value: any }>({ step: 0, value: null });
  //TODO: Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        // console.log("🚀 ~ handleFileChange ~ workbook:", workbook);

        setStep({ step: 1, value: workbook });
      };
      reader.readAsArrayBuffer(file);
    }
  };
  //TODO_END: Handle file input change
//   console.log(step);
  return (
    <div id="check">
      <IonHeader>
        <IonToolbar>
          &nbsp;&nbsp;&nbsp;
          <IonText color="secondary">Chọn File Excel </IonText>
          <input type="file" accept=".xlsx, .xls" style={{ paddingLeft: "10px", color: "red", width: "500px" }} onChange={handleFileChange} />
          {/* <IonButton fill="solid" slot="end">
            Extract
          </IonButton> */}
          <IonButtons slot="end">
            <IonButton
              fill="outline"
              color="medium"
              onClick={() => {
                setIsImportFromExcel(false);
                setTitle("Danh sách Vật tư Nhập Kho");
              }}
            >
              Cancel
            </IonButton>
            &nbsp;&nbsp;&nbsp;
            <IonButton fill="outline">Extract</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <section>
        {step.step == 1 && <ChooseSheet step={step} setStep={setStep} />}
        {step.step == 2 && <ChooseTable step={step} setStep={setStep} />}
        {step.step == 3 && <SelectHeader step={step} setStep={setStep} />}
        {step.step == 4 && <ShowTable step={step} setStep={setStep} />}
      </section>
    </div>
  );
};

export default InboundExcelImport;

function ChooseSheet({ step, setStep }: { step: any; setStep: Function }) {
  const handleSelectSheet = (sheet: string) => {
    setStep({
      step: 2,
      value: step.value.Sheets[sheet],
    });
  };

  return (
    <IonList>
      <h4 style={{ width: "100%", textAlign: "center", color: "red" }}>Select Sheet in below</h4>
      {step?.value?.SheetNames?.map((crr: any, index: number) => {
        return (
          <IonItem key={"sheet-inbound" + index}>
            <IonChip color="primary" onClick={() => handleSelectSheet(crr)}>
              {crr}
            </IonChip>
          </IonItem>
        );
      })}
    </IonList>
  );
}

function ChooseTable({ step, setStep }: { step: any; setStep: Function }) {
  const handleSelectSheet = (header: any) => {
    setStep({
      step: 3,
      value: { key: headerList[header], data: XLSX.utils.sheet_to_json(step.value, { range: header }) },
    });

    /////////
  };
  const headerList: any[] = XLSX.utils.sheet_to_json(step.value, { header: 1 }) || [];

//   console.log("🚀 ~ headerList ~ headerList:", headerList);
  return (
    <IonList>
      <h4 style={{ width: "100%", textAlign: "center", color: "red" }}>Select Which Row is the Header</h4>
      {[1, 2, 3, 4].map((crr: any, index: number) => {
        return (
          <div key={"sheet-inbound-chooseTable" + index}>
            <IonButton onClick={() => handleSelectSheet(index)}>Choose</IonButton>
            <tr style={{ margin: "10px", backgroundColor: "#ccc" }} onClick={() => handleSelectSheet(index)}>
              {headerList[index].map((item: any, i: number) => {
                return (
                  <th key={"sheet-chooseTable-child" + index + i} style={{ padding: "5px 10px", border: "2px solid gray", fontSize: "12px" }}>
                    {item}
                  </th>
                );
              })}
            </tr>
          </div>
        );
      })}
    </IonList>
  );
}

function SelectHeader({ step, setStep }: { step: any; setStep: Function }) {
    const handelAssignHeader = ()=>{
        const materialElm = document.querySelector('[name=inboundExcelImport-material]') as HTMLInputElement
        const stockElm = document.querySelector('[name=inboundExcelImport-stock]') as HTMLInputElement
        const descriptionElm = document.querySelector('[name=inboundExcelImport-description]') as HTMLInputElement
        const quantityElm = document.querySelector('[name=inboundExcelImport-quantity]') as HTMLInputElement
        const quantity2Elm = document.querySelector('[name=inboundExcelImport-quantity2]') as HTMLInputElement
        const unitElm = document.querySelector('[name=inboundExcelImport-unit]') as HTMLInputElement
        const priceElm = document.querySelector('[name=inboundExcelImport-price]') as HTMLInputElement
        const dateElm = document.querySelector('[name=inboundExcelImport-date]') as HTMLInputElement
        const noteElm = document.querySelector('[name=inboundExcelImport-note]') as HTMLInputElement
        const batchElm = document.querySelector('[name=inboundExcelImport-batch]') as HTMLInputElement
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
            batch: batchElm.value
        }

        setStep({
            step: 4,
            value: {headerKey, data: step.value.data}
        })
    }
        
    
  return (

    <IonList>
         <h4 style={{ width: "100%", textAlign: "center", color: "red" }}>Assign corresponding column headers</h4>
      <IonItem>
        <IonLabel>Material</IonLabel>
        <IonSelect slot="end" name="inboundExcelImport-material" value={'MVT' } style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-stock" value={'KHO\r\nBPSD'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-description" value={'TÊN VT'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-unit" value={'ĐVT'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-price" value={'GIÁ SAP'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-date" value={'NGÀY NHẬP'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <IonSelect slot="end" name="inboundExcelImport-note" value={'GHI CHÚ'} style={{ textAlign: "end", marginLeft: "10px" }} interface="popover" placeholder="Select">
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
        <br/>
        <IonButton  expand="block" onClick={handelAssignHeader}>Confirm</IonButton>
    </IonList>
  );
}

function ShowTable({ step, setStep }: { step: any; setStep: Function }) {
  console.log("🚀 ~ ShowTable ~ step:", step);

  return (
    <>
      <tr style={{ background: "red", color: "white" }}>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Act</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>No.</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Year</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Month</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Material</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Stock Local</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Material Description</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Quantity</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Unit</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Price</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Total Price</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Note</th>
        <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Batch</th>
        {/* <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>LastUpdate</th> */}
      </tr>
      {step.value.data.map((crr: any, index: any) => {
        const header = step.value.headerKey
        // console.log("🚀 ~ {step.value.data.map ~ header:", header)

        console.log(excelDateToMonthYear(45566))
        
        return (
          <tr>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>
              {/* <IonIcon id={`test-${index}`} icon={createOutline} slot="end" size="small" color="success" onClick={() => setIsModalOpen({ isOpen: true, value: objectData, key: objectKey })} /> */}
            </td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{excelDateToMonthYear(+(crr?.[header.date]))[1]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{excelDateToMonthYear(+(crr?.[header.date]))[0]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>
              <strong>{crr?.[header.material]}</strong>
            </td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "250px" }}>{crr?.[header.sLoc]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "550px", width: "100%" }}>{crr?.[header.description]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px", color: 'objectData.quantity < 0 ? "red" : "" ' }}>
              <strong>{ (Number(crr?.[header.quantity]) ||0) + (Number(crr?.[header.quantity2] ) ||0)}</strong>
            </td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px" }}>{crr?.[header.unit]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{crr?.[header.price] || 1} VNĐ</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{"objectData.price * objectData.quantity || 1"} VNĐ</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px", width: "auto" }}>{crr?.[header.note]}</td>
            <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "50px" }}>{crr?.[header.batch]}</td>
            {/* <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>{'timestampToTime(objectData.lastUpdate, "date only")'}</td> */}
          </tr>
        );
      })}
    </>
  );
}
