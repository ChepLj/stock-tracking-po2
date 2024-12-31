import { useContext, useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { chevronUpCircle, codeDownloadOutline, createOutline, handRightOutline } from "ionicons/icons";
import timestampToTime from "../../../../components/function/timestampToTime";
import ModalEditInbound from "../../../../components/ModalEdit/ModalEditInbound";
import ModalInboundHand from "../../../../components/ModalInboundHand/ModalInboundHand";
import { InboundDataContext } from "../../../../context/inboundDataContext";
import firebaseGetMainData from "../../../../firebase/api/getData";
import ModalOutboundHand from "../../../../components/ModalOutboundHand/ModalOutboundHand";
import { OutboundDataContext } from "../../../../context/outboundDataContext";
import ModalEditOutbound from "../../../../components/ModalEdit/ModalEditOutbound";

function OutboundView({
  data,
  keyOfOutboundDataRaw,
  disPatch,
  ionItemSlidingRef,
  authorLogin,
  virtuoso,
  setTitle,
  setViewStyle,
}: {
  data: any;
  keyOfOutboundDataRaw: string[];
  disPatch: Function;
  ionItemSlidingRef: any;
  authorLogin: any;
  virtuoso: any;
  setTitle: Function;
  setViewStyle: Function;
}) {

  const [isModalOpen, setIsModalOpen] = useState<{ isOpen: boolean; value: any; key?: string }>({ isOpen: false, value: {} });
  const [isModalEditOpen, setIsModalEditOpen] = useState<{ isOpen: boolean; value: any; key: string }>({ isOpen: false, value: {}, key: "" });

  const { disPatchOutboundData } = useContext<any>(OutboundDataContext);

  
  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "OutboundData/";
    firebaseGetMainData(childRef, disPatchOutboundData);
  }, []);
  //TODO_END: Lấy Main Data khi load Page lần đầu

  // Sort the keyOfInboundDataRaw array by month and year
  const sortedKeyOfOutboundDataRaw = [...keyOfOutboundDataRaw].sort((a, b) => {
    const dataA = data[a];
    const dataB = data[b];
    if (dataA.year !== dataB.year) {
      return dataA.year - dataB.year;
    }
    return dataA.month - dataB.month;
  });

  return (
    <>
      {!keyOfOutboundDataRaw.includes("A000000") ? (
        <TableVirtuoso
          ref={virtuoso}
          id="tableViewStyle"
          style={{ height: "100%", width: "100%" }}
          data={sortedKeyOfOutboundDataRaw.reverse()}
          // data={new Array(100000)}
          overscan={{ main: 0, reverse: 2000 }}
          fixedHeaderContent={() => (
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
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>LastUpdate</th>
            </tr>
          )}
          itemContent={(index, item) => {
           
            const objectDataRender = data[item];

            return (
              <>
                <ItemList
                  index={index}
                  objectData={objectDataRender}
                  objectKey={item}
                  disPatch={disPatch}
                  ionItemSlidingRef={ionItemSlidingRef}
                  author={authorLogin.displayName}
                  isModalOpen={isModalOpen}
                  setIsModalEditOpen={setIsModalEditOpen}
                />
              </> //: Tạo riêng 1 JSX cho ITEM
            );
          }}
        />
      ) : (
        <h2>Đang tải dữ liệu !!!</h2>
      )}
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={chevronUpCircle}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton onClick={() => setIsModalOpen({ isOpen: true, value: "" })}>
            <IonIcon icon={handRightOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton
            onClick={() => {
              setViewStyle("OutboundExcelImport");
              setTitle("Xuất Kho tự động bằng file Excel");
            }}
          >
            <IonIcon icon={codeDownloadOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <ModalOutboundHand isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ModalEditOutbound isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen} />
    </>
  );
}

//JSX: JSX Item List
const ItemList = ({
  objectData,
  index,
  objectKey,
  disPatch,
  ionItemSlidingRef,
  author,
  isModalOpen,
  setIsModalEditOpen,
}: {
  objectData: any;
  index: number;
  objectKey: string;
  disPatch: Function;
  ionItemSlidingRef: any;
  author: string;
  isModalOpen: any;
  setIsModalEditOpen: Function;
}) => {
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
        <IonIcon id={`test-${index}`} icon={createOutline} slot="end" size="small" color="success" onClick={() => setIsModalEditOpen({ isOpen: true, value: objectData, key: objectKey })} />
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{objectData?.year}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{objectData?.month}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>
        <strong>{objectData.material}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "250px" }}>{objectData.sLoc}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "260px", maxWidth: "550px", width: "100%" }}>{objectData.description}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px", color: objectData.quantity < 0 ? "red" : "" }}>
        <strong>{`${objectData.quantity}`}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px" }}>{objectData.unit}</td>
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
export default OutboundView;
