import { IonButton, IonButtons, IonHeader, IonText, IonToolbar } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import ChooseSheet from "./Component/ChooseSheet";
import ChooseTable from "./Component/ChooseTable";
import SelectHeader from "./Component/SelectHeader";
import ShowTable from "./Component/ShowTable";
import { handleInboundExcelExtract } from "../../../../components/function/handleInboundExcelExtract";
import { handleInboundExcelImportUpload } from "../../../../components/function/handleInboundExcelImportUpload";
import { InboundDataContext } from "../../../../context/inboundDataContext";
import { MainContext } from "../../../../context/mainDataContext";
import { inboundCautionImg } from "../../../../source/img";
import { backspaceOutline } from "ionicons/icons";
import { backupDataActionSheet } from "../../../../components/function/backupDataActionSheet";

const InboundExcelImport = ({ setViewStyle }: { setViewStyle: Function }) => {
  const [step, setStep] = useState<{ step: number; value: any }>({ step: 0, value: null });
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { InboundData, disPatchInboundData } = useContext<any>(InboundDataContext);
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
  //TODO: Backup Data before update
  useEffect(() => {
    backupDataActionSheet();
  }, []);
  //TODO_END: Backup Data before update
  console.log("🚀 ~ handleFileChange ~ step:", step)
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
                setViewStyle("Inbound");
              }}
            >
              Cancel
            </IonButton>
            &nbsp;&nbsp;&nbsp;
            {step.step == 4 && (
              <IonButton fill="solid" onClick={() => handleInboundExcelImportUpload(handleInboundExcelExtract(), disPatch, disPatchInboundData, setViewStyle)}>
                &nbsp;&nbsp;&nbsp;Extract&nbsp;&nbsp;&nbsp;
              </IonButton>
            )}{" "}
            &nbsp;&nbsp;&nbsp;
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <section style={{ overflowX: "auto" }}>
        {step.step == 1 && <ChooseSheet step={step} setStep={setStep} />}
        {step.step == 2 && <ChooseTable step={step} setStep={setStep} />}
        {step.step == 3 && <SelectHeader step={step} setStep={setStep} />}
        {step.step == 4 && <ShowTable step={step} setStep={setStep} />}
        {step.step == 0 && <img src={inboundCautionImg} />}
      </section>
    </div>
  );
};

export default InboundExcelImport;
