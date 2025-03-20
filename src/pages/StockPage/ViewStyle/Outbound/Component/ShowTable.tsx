import { IonButton, IonChip, IonIcon, IonPopover, IonSelect, IonSelectOption } from "@ionic/react";
import { warning } from "ionicons/icons";
import { useContext, useState } from "react";
import excelDateToMonthYear from "../../../../../components/function/excelDateToMonthYear";
import { handleInboundShowTableSearch } from "../../../../../components/function/handleInboundShowTableSearch";
import { MainContext } from "../../../../../context/mainDataContext";
import { handleOutboundShowTableSearch } from "../../../../../components/function/handleOutboundShowTableSearch";

export default function ShowTable({ step, setStep }: { step: any; setStep: Function }) {
  // console.log("🚀 ~ ShowTable ~ step:", step);
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);

  const [materialList, setMaterialList] = useState<any>({});
  const [chipStates, setChipStates] = useState<Record<number, boolean>>({});

  const header = step.value.headerKey;
  const commonsStyle = { padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto" };
  const commonsStyleTd = { padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" };

  const handleChipClick = (index: number, active: boolean) => {
    const checkBoxElm = document.getElementById(`checkbox-${index}`) as HTMLIonCheckboxElement;
    // checkBoxElm.checked = !chipStates[index];
    checkBoxElm.checked = active;
    setChipStates((prev) => ({
      ...prev,
      [index]: active, // Toggle the state
    }));
  };

  return (
    <>
      <div style={{ display: "flex", margin: "5px" }}>
        <div>Chú giải: </div>&nbsp;&nbsp;&nbsp;
        <div>
          <div style={{ fontSize: "10px", color: "red" }}>
            <i>Vật tư bị sai , thiếu thông tin , không thể xuất vật tư này !</i>
          </div>
          <div style={{ fontSize: "10px", color: "violet" }}>
            <i>Không thấy vật tư cùng Kho trong Stock !, không thể xuất vật tư này !</i>
          </div>
          <div style={{ fontSize: "10px", color: "#f89807" }}>
            <i>Số lượng xuất nhiều hơn số lượng trong Stock !, không thể xuất vật tư này !</i>
          </div>
          <div style={{ fontSize: "10px", color: "" }}>
            <i>Tìm thấy vật tư cùng Kho trong Stock !</i>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr style={{ background: "red", color: "white", overflowX: "scroll" }}>
            <th style={{ ...commonsStyleTd }}>OK</th>
            <th style={{ ...commonsStyleTd }}>Act</th>
            <th style={{ ...commonsStyleTd }}>No.</th>
            <th style={{ ...commonsStyleTd }}>Year</th>
            <th style={{ ...commonsStyleTd }}>Month</th>
            <th style={{ ...commonsStyleTd }}>Material</th>
            <th style={{ ...commonsStyleTd }}>Stock Local</th>
            <th style={{ ...commonsStyleTd }}>Material Description</th>
            <th style={{ ...commonsStyleTd }}>Quantity</th>
            <th style={{ ...commonsStyleTd }}>Unit</th>
            <th style={{ ...commonsStyleTd }}>Price</th>
            <th style={{ ...commonsStyleTd }}>Total Price</th>
            <th style={{ ...commonsStyleTd }}>Note</th>
            <th style={{ ...commonsStyleTd }}>Batch</th>
            {/* <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>LastUpdate</th> */}
          </tr>
        </thead>
        <tbody id="outboundExcelImportShowTable">
          {step.value.data.map((crr: any, index: any) => {
            // console.log("🚀 ~ {step.value.data.map ~ header:", header)
            const checkAvailableInStock = handleOutboundShowTableSearch(crr, header, data, materialList);
            const quantityTemp = (Number(crr?.[header.quantity]) || 0) + (Number(crr?.[header.quantity2]) || 0);
            const price = isNaN(crr?.[header.price]) ? 1 : crr[header.price];

            const totalPrice = isNaN(price * quantityTemp) ? 1 : price * quantityTemp;

            return (
              <tr style={{ color: checkAvailableInStock?.color }} key={"showTable-item" + index}>
                <td className="check" style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px", textAlign: "center", verticalAlign: "middle" }}>
                  <input className="checkInput" type="checkbox" id={`checkbox-${index}`} defaultChecked={checkAvailableInStock.isOk} disabled={!checkAvailableInStock.isOk} />
                </td>
                <td className="forceOutboundTd" style={{ ...commonsStyle, maxWidth: "150px", whiteSpace: "nowrap", fontSize: "12px", color: "red" }}>
                
                  {!checkAvailableInStock.isOk && !checkAvailableInStock.lostInfo &&(
                    <IonSelect
                      aria-label="action"
                      placeholder="Action"
                      onIonChange={(e) => {
                        if (e.detail.value === "Hủy bỏ" || e.detail.value === undefined) {
                          handleChipClick(index, false);
                        } else {
                          handleChipClick(index, true);
                        }
                      }}
                    >
                      <IonSelectOption value="Ép Xuất">Ép Xuất</IonSelectOption>
                      {checkAvailableInStock?.foundItems?.map((crr: any, foundItemIndex) => (
                        <IonSelectOption key={`act-${foundItemIndex}`} value={`${crr.sLoc}-${crr.quantity}`} disabled={crr.quantity < quantityTemp}>{`CK ${crr.sLoc} (${crr.quantity})`}</IonSelectOption>
                      ))}
                      <IonSelectOption value="Hủy bỏ">Hủy bỏ</IonSelectOption>
                    </IonSelect>
                  )}
                </td>
                <td className="index" style={{ ...commonsStyle, maxWidth: "50px" }}>
                  {index + 1}
                </td>
                <td className="year" style={{ ...commonsStyle, maxWidth: "50px" }}>
                  {excelDateToMonthYear(+crr?.[header.date])[1] || 0}
                </td>
                <td className="month" style={{ ...commonsStyle, maxWidth: "50px" }}>
                  {excelDateToMonthYear(+crr?.[header.date])[0] || 0}
                </td>
                <td className="material" style={{ ...commonsStyle, maxWidth: "100px" }}>
                  {+crr?.[header.material] || "error"}
                </td>
                <td className="sLoc" style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "250px" }}>
                  {crr?.[header.sLoc]}
                </td>
                <td
                  className="description"
                  style={{
                    ...commonsStyle,
                    minWidth: "100px",
                    maxWidth: "300px",
                    whiteSpace: "nowrap", // Prevent line breaks
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center" }}>
                    <p className="description" style={{ color: checkAvailableInStock.color }}>
                      {checkAvailableInStock.descriptionRaw}
                    </p>
                    {checkAvailableInStock.isDescriptionDiff && (
                      <>
                        <IonIcon
                          color="warning"
                          icon={warning}
                          id={"warning-icon showTable-item" + index} // Assign an ID for triggering the popover
                          style={{ cursor: "pointer" }}
                        />
                        <IonPopover
                          trigger={"warning-icon showTable-item" + index} // Use the ID of the IonIcon as the trigger
                          triggerAction="click" // Show popover on click
                        >
                          <div style={{ padding: "10px", maxWidth: "500px" }}>
                            <p>{checkAvailableInStock.descriptionMessenger}</p>
                          </div>
                        </IonPopover>
                      </>
                    )}
                  </span>
                </td>
                <td className="quantity" style={{ ...commonsStyle, minWidth: "30px", maxWidth: "150px", fontWeight: 600 }}>
                  {quantityTemp}
                </td>
                <td
                  className="unit"
                  style={{
                    ...commonsStyle,
                    minWidth: "30px",
                    maxWidth: "100px",
                    whiteSpace: "nowrap", // Prevent line breaks
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: checkAvailableInStock.color }}>
                    <strong>{checkAvailableInStock.unitRaw}</strong>
                    {checkAvailableInStock.isUnitDiff && (
                      <>
                        <IonIcon
                          color="warning"
                          icon={warning}
                          id={"warning-icon showTable-item" + index} // Assign an ID for triggering the popover
                          style={{ cursor: "pointer" }}
                        />
                        <IonPopover
                          trigger={"warning-icon showTable-item" + index} // Use the ID of the IonIcon as the trigger
                          triggerAction="click" // Show popover on click
                        >
                          <div style={{ padding: "10px", maxWidth: "500px" }}>
                            <p>{checkAvailableInStock.unitMessenger}</p>
                          </div>
                        </IonPopover>
                      </>
                    )}
                  </span>
                </td>
                <td className="price" style={{ ...commonsStyle, minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>
                  {price} VNĐ
                </td>
                <td className="totalPrice" style={{ ...commonsStyle, minWidth: "130px", maxWidth: "250px", textAlign: "right" }}>
                  {totalPrice} VNĐ
                </td>
                <td className="note" style={{ ...commonsStyle, minWidth: "100px", maxWidth: "350px", width: "auto" }}>
                  {crr?.[header.note]}
                </td>
                <td className="batch" style={{ ...commonsStyle, minWidth: "30px", maxWidth: "50px" }}>
                  {crr?.[header.batch]}
                </td>
                <td className="quantityInStock" style={{ display: "none" }}>
                  {checkAvailableInStock.quantityInStock}
                </td>
                <td className="searchType" style={{ display: "none" }}>
                  {checkAvailableInStock.type}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
