import firebaseGetMainData from "../../firebase/api/getData";
import firebasePostData from "../../firebase/api/postData";
import { ITF_MaterialObject, ITF_UploadContainer } from "../../interface/mainInterface";
import { showActionSheet } from "./showActionSheet";

export const handleInboundExcelImportUpload = (object: any, disPatch: Function, disPatchInboundData: Function, setViewStyle: Function) => {
  try {
    if (object) {
      const uploadContainer: ITF_UploadContainer[] = [];

      const quantityStock: Record<string, any> = {};
      const timeStamp = Date.now();
      let index = 0;
      for (const itemKey in object) {
        const item: ITF_MaterialObject = object[itemKey];
        const key = `${item.material}-${item.sLoc}`;

        if (!quantityStock[key]) {
          quantityStock[key] = (Number(item.quantity) || 0) + (Number(item.quantityInStock) || 0);
        } else {
          quantityStock[key] = quantityStock[key] + (Number(item.quantity) || 0);
        }
        uploadContainer.push({
          ref: `MainData/${key}/material/`,
          data: item.material,
        });
        uploadContainer.push({
          ref: `MainData/${key}/sLoc/`,
          data: item.sLoc,
        });
        uploadContainer.push({
          ref: `MainData/${key}/description/`,
          data: item.description,
        });
        uploadContainer.push({
          ref: `MainData/${key}/quantity/`,
          data: quantityStock[key],
        });
        uploadContainer.push({
          ref: `MainData/${key}/unit/`,
          data: item.unit,
        });
        uploadContainer.push({
          ref: `MainData/${key}/price/`,
          data: item.price,
        });
        uploadContainer.push({
          ref: `MainData/${key}/note/`,
          data: item.note,
        });
        uploadContainer.push({
          ref: `MainData/${key}/batch/`,
          data: item.batch,
        });

        uploadContainer.push({
          ref: `MainData/${key}/lastUpdate/`,
          data: timeStamp,
        });

        uploadContainer.push({
          ref: `MainData/${key}/logs/${timeStamp}/`,
          data: {
            behavior: "Inbound Excel",
            detail: item.searchType,
            timeStamp: timeStamp,
          },
        });

        uploadContainer.push({
          ref: `InboundData/${key}-${timeStamp}-${index}/`,
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
                behavior: "Inbound Excel",
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
            behavior: "Inbound Excel",
            description: `${Object.keys(object).length} vật tư được nhập tự động bằng Excel`,
            detail: "nhập kho bằng file Excel",
            timeStamp: timeStamp,
          },
        });

        index++;
      }

      const handelRefresh = () => {
        //: lấy data từ firebase sao đó dispatch đê render lại
        const childRef = "MainData/";
        firebaseGetMainData(childRef, disPatch);
        const childInboundRef = "InboundData/";
        firebaseGetMainData(childInboundRef, disPatchInboundData);
        // setIsModalOpen({ isOpen: false, value: "" });
        setViewStyle("Inbound");
        alert(`Nhập thành công ${Object.keys(object).length} Vật tư `);
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
