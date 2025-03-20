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

        const temp = item.action? item.action.split("-") : 'false';
        const stockChangeCheck = Number.isFinite(+temp[0])
        const key =  stockChangeCheck ?  `${item.material}-${temp[0]}` : `${item.material}-${item.sLoc}`;
        let rawQuantity = 0
        if (item.action != 'Ép Xuất') {
          if (+item?.quantity > 0) {
            
            const outboundQuantity = Number(item.quantity);
            if (!quantityStock[key]) {
              quantityStock[key] = stockChangeCheck? (Number(item.quantityInStockForce) || 0) - (outboundQuantity || 0): (Number(item.quantityInStock) || 0) - (outboundQuantity || 0);
              rawQuantity = stockChangeCheck? (Number(item.quantityInStockForce) || 0): (Number(item.quantityInStock) || 0) ;
            } else {
              rawQuantity = quantityStock[key]
              quantityStock[key] = quantityStock[key] - (outboundQuantity || 0);
            }
            const quantityTemp = () => {
              if (quantityStock[key] < 0) {
                throw new Error(`${item.material}-${item.sLoc} - index ${index+2}: Số lượng xuất kho lớn hơn số lượng tồn kho. Lỗi !`);
              }
              // console.log(`key: ${key} -quantityStock ${quantityStock[key]} - stockQuantity: ${stockQuantity} - outboundQuantity: ${outboundQuantity}--- ${stockChangeCheck}`)
              // return stockQuantity - outboundQuantity;
              return quantityStock[key];
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
            ref: `MainData/${key}/logs/${timeStamp}-${index}/`,
            data: {
              behavior: "Outbound Excel",
              detail:  item.action ? `Raw Quantity : ${rawQuantity} -  Outbound Quantity: ${item.quantity} - Outbound Stock: ${item.sLoc} ${stockChangeCheck ? ` - Raw Stock:${temp[0]}` : ''} - Action: ${stockChangeCheck ? 'Chuyển Kho': 'Ép Xuất'}` : `Raw Quantity : ${rawQuantity} - Outbound Quantity: ${item.quantity} - Type: ${item.searchType}`,
              timeStamp: timeStamp,
            },
          });

          if(Number.isFinite(item.action)){
            uploadContainer.push({
              ref: `MainData/${key}/action/`,
              data: item.action,
            });
          }
        }

        uploadContainer.push({
          ref: `OutboundData/${item.material}-${item.sLoc}-${timeStamp}-${index}/`,
          
          data: {
            action: item.action || '.',
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
                detail:  item.action ? `Raw Quantity : ${rawQuantity} - Outbound Quantity: ${item.quantity} - Outbound Stock: ${item.sLoc}  ${stockChangeCheck ? ` - Raw Stock:${temp[0]}` : ''}  - Action: ${stockChangeCheck ? 'Chuyển Kho': 'Ép Xuất'}` : `Raw Quantity : ${rawQuantity} - Outbound Quantity: ${item.quantity} - Type: ${item.searchType}`,
                timeStamp: timeStamp,
                action: item.action || '.',
              },
            },
            year: item.year,
            month: item.month,
          },
        })
        // uploadContainer.push({
        //   ref: `Logs/${timeStamp}`,
        //   data: {
        //     key: key,
        //     behavior: "Outbound Excel",
        //     description: `${Object.keys(object).length} vật tư được xuất tự động bằng Excel`,
        //     detail: `SLoc Outbound ${item.sLoc} --- Action ${item?.action}`,
        //     timeStamp: timeStamp,
        //   },
        // });
        index++;
      }
      uploadContainer.push({
        ref: `Logs/${timeStamp}`,
        data: {
          key: '...',
          behavior: "Outbound Excel",
          description: `${Object.keys(object).length} vật tư được xuất tự động bằng Excel`,
          detail: JSON.stringify(object),
          timeStamp: timeStamp,
        },
      });
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
