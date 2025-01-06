import firebaseGetMainData from "../../firebase/api/getData";
import firebasePostData from "../../firebase/api/postData";
import { ITF_MaterialObject, ITF_UploadContainer } from "../../interface/mainInterface";
import { showActionSheet } from "./showActionSheet";

export const handleOutboundExcelImportUpload = (object: any, disPatch: Function, disPatchOutboundData: Function, setViewStyle: Function) => {
  try {
    if (object) {
      const uploadContainer: ITF_UploadContainer[] = [];
      const timeStamp = Date.now();
      let index = 0;
      const quantityStock: Record<string, any> = {};
      for (const itemKey in object) {
        const item: ITF_MaterialObject = object[itemKey];
        const key = `${item.material}-${item.sLoc}`;

        if (+item?.quantity > 0) {
          const stockQuantity = Number(item.quantityInStock) || 0;
          const outboundQuantity = Number(item.quantity);
          if (!quantityStock[key]) {
            quantityStock[key] =  (Number(item.quantityInStock) || 0) - (Number(item.quantity) || 0) ;
          } else {
            quantityStock[key] = quantityStock[key] - (Number(item.quantity) || 0);
          }
          const quantityTemp = () => {
            if (stockQuantity - outboundQuantity < 0) {
              throw new Error (`${item.material} Số lượng xuất kho lớn hơn số lượng tồn kho. Lỗi !`);
            }
            return stockQuantity - outboundQuantity;
          };
          uploadContainer.push({
            ref: `MainData/${key}/quantity/`,
            data: quantityTemp(),
          });
        }

        uploadContainer.push({
          ref: `MainData/${key}/unit/`,
          data: item.unit,
        });
        if (Number(item.price) > 1) {
          uploadContainer.push({
            ref: `MainData/${key}/price/`,
            data: item.price,
          });
        }

        uploadContainer.push({
          ref: `MainData/${key}/lastUpdate/`,
          data: timeStamp,
        });

        uploadContainer.push({
          ref: `MainData/${key}/logs/${timeStamp}/`,
          data: {
            behavior: "Outbound Excel",
            detail: item.searchType,
            timeStamp: timeStamp,
          },
        });

        uploadContainer.push({
          ref: `OutboundData/${key}-${timeStamp}-${index}/`,
          data: {
            material: item.material,
            description: item.description,
            sLoc: item.sLoc,
            quantity: item.quantity,
            unit: item.unit,
            price: item.price,
            note: item.note,
            batch: item.batch,
            lastUpdate: timeStamp,
            logs: {
              [timeStamp]: {
                behavior: "Outbound Excel",
                detail: item.searchType,
                timeStamp: timeStamp,
              },
            },
            year: item.year,
            month: item.month,
          },
        });
        uploadContainer.push({
          ref: `Logs/${timeStamp}`,
          data: {
            key: key,
            behavior: "Outbound Excel",
            description: `${Object.keys(object).length} vật tư được xuất tự động bằng Excel`,
            detail: "xuất kho bằng file Excel",
            timeStamp: timeStamp,
          },
        });
        index++;
      }

      const handelRefresh = () => {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
        const childOutboundRef = "OutboundData/";
        firebaseGetMainData(childOutboundRef, disPatchOutboundData);
        // setIsModalOpen({ isOpen: false, value: "" });
        setViewStyle("Outbound");
        alert(`Xuất thành công ${Object.keys(object).length} Vật tư `);
      };
      //////////////////////////////
      console.log("🚀 ~ handelUploadData ~ uploadContainer:", uploadContainer);
      if (uploadContainer.length) {
        const headerTemp = `Xác nhận Nhập Kho ${Object.keys(object).length} Vật tư`;
        const handleCallback = () => firebasePostData(uploadContainer, handelRefresh);
        showActionSheet(headerTemp, "Confirm", handleCallback);
      } else {
        throw new Error("Có lỗi xảy ra, không upload được dữ liệu !");
      }
    } else {
      throw new Error("Không Extract được dữ liệu, kiểm tra lại !!!");
    }
  } catch (error) {
    alert(error);
  }
};
