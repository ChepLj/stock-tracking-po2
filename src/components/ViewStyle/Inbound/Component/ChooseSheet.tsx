import { IonList, IonItem, IonChip } from "@ionic/react";

export default function ChooseSheet({ step, setStep }: { step: any; setStep: Function }) {
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
  