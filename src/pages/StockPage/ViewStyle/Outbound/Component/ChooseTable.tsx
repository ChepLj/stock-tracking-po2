import { IonList, IonButton } from "@ionic/react";
import * as XLSX from "xlsx";
export default function ChooseTable({ step, setStep }: { step: any; setStep: Function }) {
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
          <div key={"sheet-inbound-chooseTable" + index} style={{display: 'flex', margin: '10px'}}>
            <IonButton onClick={() => handleSelectSheet(index)}>Choose</IonButton>&nbsp;&nbsp;&nbsp;
            <table>
      
              <thead>
                <tr style={{ margin: "10px", backgroundColor: "red" ,}} onClick={() => handleSelectSheet(index)}>
                  {headerList[index].map((item: any, i: number) => {
                    return (
                      <th key={"sheet-chooseTable-child" + index + i} style={{ padding: "5px 10px", border: "2px solid gray", fontSize: "12px" }}>
                        {item}
                      </th>
                    );
                  })}
                </tr>
              </thead>
            </table>
          </div>
        );
      })}
    </IonList>
  );
}
