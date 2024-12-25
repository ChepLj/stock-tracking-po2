import { useContext, useEffect, useState } from "react";
import { InboundDataContext } from "../../../../context/inboundDataContext";
import { MainContext } from "../../../../context/mainDataContext";
import firebaseGetMainData from "../../../../firebase/api/getData";
import excelDateToMonthYear from "../../../function/excelDateToMonthYear";
import { IonIcon, IonLabel, IonText } from "@ionic/react";
import { warning } from "ionicons/icons";

export default function ShowTable({ step, setStep }: { step: any; setStep: Function }) {
  // console.log("🚀 ~ ShowTable ~ step:", step);
  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { InboundData, disPatchInboundData } = useContext<any>(InboundDataContext);
  const [materialList, setMaterialList] = useState<any>({});
  const [state, setState] = useState(false);
  const [searchValue, setSearchValue] = useState<any>();
  const unit = ["PC", "Set", "BT", "EA", "G", "KG", "L", "M", "M2", "M3", "ML", "PAA", "TON", "Other"];
  const batch = ["none", "C1", "C2", "C3"];
  const [stockList, setStockList] = useState<any>([]);
  const [error, setError] = useState<any>("");
  const header = step.value.headerKey;
  //TODO: Lấy Material List khi load Page lần đầu
  useEffect(() => {
    const callback = (data: any) => {
      if (data.payload) {
        setMaterialList(data.payload);
      }
    };
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "AuxiliaryData/MaterialList/";
    firebaseGetMainData(childRef, callback);
  }, []);

  //TODO_END:Lấy Material List khi load Page lần đầu
  //TODO: Search Stock

  const handelSearch = (input: any) => {
    const material = input[header.material];
    const stock = input[header.sLoc];
    const condition1 = Boolean(input[header.unit]);
    const condition2 = Boolean(material?.toString().length == 9);
    const condition3 = Boolean((Number(input?.[header.quantity]) || 0) + (Number(input?.[header.quantity2]) || 0));
    const condition4 = Boolean(input[header.date]);
    let descriptionWarningMessenger = "";
    let unitWarningMessenger = "";
    if (material && stock && condition1 && condition2 && condition3 && condition4) {
      const key = `${material}-${stock}`;

      if (data[key]) {
        if (data[key].description !== input.description) {
          descriptionWarningMessenger = "Tên Vật tư khác với tên trong Stock. Sẽ lấy tên trong Stock !";
        }
        if (data[key].unit !== input.unit) {
          unitWarningMessenger = "Đơn vị Vật tư khác với đơn vị trong Stock. Sẽ lấy đơn vị  trong Stock !";
        }
        return {
          type: "found in stock",
          color: "",
          isOk: true,
          descriptionMessenger: descriptionWarningMessenger,
          unitMessenger: unitWarningMessenger,
          descriptionRaw: data[key].description,
          unitRaw: `<IonIcon icon={warning}></IonIcon>`,
          isDescriptionDiff: true,
          isUnitDiff: true,
        };
      } else if (materialList[material]) {
        if (materialList[material].description !== input.description) {
          descriptionWarningMessenger = "Tên Vật tư khác với tên trong Stock. Sẽ lấy tên trong Stock !";
        }
        if (materialList[material].unit !== input.unit) {
          unitWarningMessenger = "Đơn vị Vật tư khác với đơn vị trong Stock. Sẽ lấy đơn vị  trong Stock !";
        }
        return {
          type: "found in database",
          color: "green",
          isOk: true,
          descriptionMessenger: descriptionWarningMessenger,
          unitMessenger: unitWarningMessenger,
          descriptionRaw: data[key].description,
          unitRaw: data[key].unit,
          isDescriptionDiff: true,
          isUnitDiff: true,
        };
      } else {
        return {
          type: "not found",
          color: "violet",
          isOk: true,
        };
      }
    } else {
      // setError("Mã Vật tư hoặc Kho là không đúng !");
      return {
        type: "error",
        color: "red",
        isOk: false,
      };
    }
  };
  //TODO_END: Search Stock
  return (
    <>
      <div style={{ display: "flex", margin: "5px" }}>
        <div>Chú giải: </div>&nbsp;&nbsp;&nbsp;
        <div>
          <div style={{ fontSize: "10px", color: "red" }}>
            <i>Vật tư bị sai hoặc thiếu thông tin, không thể thêm vật tư này !</i>
          </div>
          <div style={{ fontSize: "10px", color: "green" }}>
            <i>Vật tư cùng kho không có trong Stock nhưng tìm thấy mã vật tư trong cơ sở dữ liệu !</i>
          </div>
          <div style={{ fontSize: "10px", color: "violet" }}>
            <i>Không tìm thấy vật tư, kiểm tra lại mã vật tư, hoặc vật tư này là mới tạo mã !</i>
          </div>
          <div style={{ fontSize: "10px", color: "" }}>
            <i>Tìm thấy vật tư cùng Kho trong Stock !</i>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr style={{ background: "red", color: "white", overflowX: "scroll" }}>
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
        </thead>
        <tbody>
          {step.value.data.map((crr: any, index: any) => {
            // console.log("🚀 ~ {step.value.data.map ~ header:", header)
            const checkAvailableInStock = handelSearch(crr);
            const quantityTemp = (Number(crr?.[header.quantity]) || 0) + (Number(crr?.[header.quantity2]) || 0);
            const totalPrice = isNaN(crr?.[header.price] * quantityTemp) ? 1 : crr?.[header.price] * quantityTemp;

            return (
              <tr style={{ color: checkAvailableInStock?.color }} key={"showTable-item" + index}>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px", textAlign: "center", verticalAlign: "middle" }}>
                  <input type="checkbox" id={`checkbox-${index}`} defaultChecked={checkAvailableInStock.isOk} disabled={!checkAvailableInStock.isOk} />
                </td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{excelDateToMonthYear(+crr?.[header.date])[1] || 0}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{excelDateToMonthYear(+crr?.[header.date])[0] || 0}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>
                  <strong>{crr?.[header.material]}</strong>
                </td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "250px" }}>{crr?.[header.sLoc]}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "200px", maxWidth: "550px", width: "100%" }}>{crr?.[header.description]}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "150px", color: 'objectData.quantity < 0 ? "red" : "" ' }}>
                  <strong>{quantityTemp}</strong>
                </td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "150px" }}>{checkAvailableInStock.unitRaw}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{crr?.[header.price] || 1} VNĐ</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "130px", maxWidth: "250px", textAlign: "right" }}>{totalPrice} VNĐ</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px", width: "auto" }}>{crr?.[header.note]}</td>
                <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "50px" }}>{crr?.[header.batch]}</td>
                {/* <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>{'timestampToTime(objectData.lastUpdate, "date only")'}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
