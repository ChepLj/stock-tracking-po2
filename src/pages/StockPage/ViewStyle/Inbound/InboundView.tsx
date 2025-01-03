import { useContext, useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { chevronUpCircle, codeDownloadOutline, createOutline, handRightOutline } from "ionicons/icons";
import timestampToTime from "../../../../components/function/timestampToTime";
import ModalEditInbound from "../../../../components/ModalEdit/ModalEditInbound";
import ModalInboundHand from "../../../../components/ModalInboundHand/ModalInboundHand";
import { InboundDataContext } from "../../../../context/inboundDataContext";
import firebaseGetMainData from "../../../../firebase/api/getData";
import { checkLevelAcc } from "../../../../components/function/checkLevelAcc";
import { AuthContext } from "../../../../context/loginContext";
import { toLocalStringOfPrice } from "../../../../components/function/toLocalStringOfPrice";

function InboundView({
  data,
  keyOfInboundDataRaw,
  disPatch,
  ionItemSlidingRef,
  authorLogin,
  virtuoso,
  setTitle,
  setViewStyle,
}: {
  data: any;
  keyOfInboundDataRaw: string[];
  disPatch: Function;
  ionItemSlidingRef: any;
  authorLogin: any;
  virtuoso: any;
  setTitle: Function;
  setViewStyle: Function;
}) {
  const [isModalOpen, setIsModalOpen] = useState<{ isOpen: boolean; value: any; key?: string }>({ isOpen: false, value: {} });
  const [isModalEditOpen, setIsModalEditOpen] = useState<{ isOpen: boolean; value: any; key: string }>({ isOpen: false, value: {}, key: "" });

  const { disPatchInboundData } = useContext<any>(InboundDataContext);

  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "InboundData/";
    firebaseGetMainData(childRef, disPatchInboundData);
  }, []);
  //TODO_END: Lấy Main Data khi load Page lần đầu

  // Sort the keyOfInboundDataRaw array by month and year
  const sortedKeyOfInboundDataRaw = [...keyOfInboundDataRaw].sort((a, b) => {
    const dataA = data[a];
    const dataB = data[b];
    if (dataA.year !== dataB.year) {
      return dataA.year - dataB.year;
    }
    return dataA.month - dataB.month;
  });

  //TODO: handle handImport
  const handleHandImport = () => {
    if (checkLevelAcc(authorLogin)) {
      setIsModalOpen({ isOpen: true, value: "" });
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };

  //TODO_END: handle ExcelImport
  //TODO: handle ExcelImport
  const handleExcelImport = () => {
    if (checkLevelAcc(authorLogin)) {
      setViewStyle("InboundExcelImport");
      setTitle("Nhập Kho tự động bằng file Excel");
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };

  //TODO_END: handle ExcelImport

  return (
    <>
      {!keyOfInboundDataRaw.includes("A000000") ? (
        <TableVirtuoso
          ref={virtuoso}
          id="tableViewStyle"
          style={{ height: "100%", width: "100%" }}
          data={sortedKeyOfInboundDataRaw.reverse()}
          // data={new Array(100000)}
          overscan={{ main: 0, reverse: 2000 }}
          fixedHeaderContent={() => (
            <tr style={{ background: "blue", color: "white" }}>
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
          <IonFabButton onClick={handleHandImport}>
            <IonIcon icon={handRightOutline}></IonIcon>
          </IonFabButton>
          <IonFabButton onClick={handleExcelImport}>
            <IonIcon icon={codeDownloadOutline}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
      <ModalInboundHand isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <ModalEditInbound isModalEditOpen={isModalEditOpen} setIsModalEditOpen={setIsModalEditOpen} />
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
  const { authorLogin, setAuthorLogin } = useContext<any>(AuthContext);

  useEffect(() => {
    //:nothing

    //:Unmount
    //! To enhance performant set Object to null

    return () => {};

    //! end
  }, []);

  //TODO: handle Show Edit Modal
  const handleShowEditModal = () => {
    if (checkLevelAcc(authorLogin)) {
      setIsModalEditOpen({ isOpen: true, value: objectData, key: objectKey });
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };

  //TODO_END: handle Show Edit Modal
const priceTemp = toLocalStringOfPrice(objectData?.price || 1)
  const totalPriceTemp = toLocalStringOfPrice(objectData.price * objectData.quantity  || 1)
  return (
    <>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>
        <IonIcon id={`test-${index}`} icon={createOutline} slot="end" size="small" color="success" onClick={handleShowEditModal} />
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{index + 1}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{objectData?.year}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>{objectData?.month}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", width: "150px", maxWidth: "200px" }}>
        <strong>{objectData.material}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "100px" }}>{objectData.sLoc}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "250px", maxWidth: "500px", width: "100%" }}>{objectData.description}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px", color: objectData.quantity < 0 ? "red" : "" }}>
        <strong>{`${objectData.quantity}`}</strong>
      </td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "50px", maxWidth: "150px" }}>{objectData.unit}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{priceTemp} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{totalPriceTemp} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px" }}>{objectData.note}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "50px" }}>{objectData.batch}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" }}>{timestampToTime(objectData.lastUpdate, "date only")}</td>
    </>
  );
};
//JSX_END: JSX Item List

//! export
export default InboundView;
