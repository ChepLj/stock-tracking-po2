import { useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
// import ObjectData, { objectListRender } from "../../../components/FC_Components/initObjectData";

// import { ITF_ObjectData } from "../../../interface/mainInterface";
import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import timestampToTime from "../function/timestampToTime";
import ModalEditStock from "../ModalEditStock/ModalEditStock";

function TableView({ data, keyOfDataRaw, disPatch, ionItemSlidingRef, authorLogin, virtuoso }: { data: any; keyOfDataRaw: string[]; disPatch: Function; ionItemSlidingRef: any; authorLogin: any; virtuoso: any }) {
  const [isModalOpen, setIsModalOpen] = useState<{isOpen: boolean, value: any}>({isOpen: false, value:{}})
  return (
    <>
      {!keyOfDataRaw.includes("A000000") ? (
        <TableVirtuoso
          ref={virtuoso}
          id="tableViewStyle"
          style={{ height: "100%", width: "100%" }}
          data={[...keyOfDataRaw]}
          // data={new Array(100000)}
          overscan={{ main: 0, reverse: 2000 }}
          fixedHeaderContent={() => (
            <tr style={{ background: "#058120", color: "white" }}>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Act</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>No.</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Material</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Material Description</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Stock Local</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Tồn kho Cty</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Price</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Total Price</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Note</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Batch</th>
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Last Update</th>
            </tr>
          )}
          itemContent={(index, crrKey) => {
            const objectDataRender = data[crrKey];
            return (
              <>
                <ItemList index={index} objectData={objectDataRender} objectKey={crrKey} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} author={authorLogin.displayName} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
              </> //: Tạo riêng 1 JSX cho ITEM
            );
          }}
        />
      ) : (
        <h2>Đang tải dữ liệu !!!</h2>
      )}
      <ModalEditStock isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
}

//JSX: JSX Item List
const ItemList = ({ objectData, index, objectKey, disPatch, ionItemSlidingRef, author, isModalOpen, setIsModalOpen }: { objectData: any; index: number; objectKey: string; disPatch: Function; ionItemSlidingRef: any; author: string , isModalOpen: any,setIsModalOpen: Function}) => {
  useEffect(() => {
    //:nothing

    //:Unmount
    //! To enhance performant set Object to null
    return () => {};

    //! end
  }, []);

  return (
    <>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>
        <IonIcon id={`test-${index}`} icon={createOutline} slot="end" size="small" color="success" onClick={()=>setIsModalOpen({isOpen: true, value: objectData})} />
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>
        <strong>{objectData.material}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "550px", width: "100%" }}>{objectData.description}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "250px" }}>{objectData.sLoc}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px" }}>
        <strong>{`${objectData.quantity}`}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{objectData.price || 1} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{objectData.price * objectData.quantity || 1} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px", width: "auto" }}>{objectData.note}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "50px" }}>{objectData.Batch}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>{timestampToTime(objectData.lastUpdate, "date only")}</td>
    </>
  );
};
//JSX_END: JSX Item List

//! export
export default TableView;
