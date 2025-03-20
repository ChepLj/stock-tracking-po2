import { useContext, useEffect, useState } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonItem, IonLabel, IonPopover, IonText } from "@ionic/react";
import { chevronUpCircle, codeDownloadOutline, createOutline, handRightOutline } from "ionicons/icons";
import timestampToTime from "../../../../components/function/timestampToTime";
import ModalEditInbound from "../../../../components/ModalEdit/ModalEditInbound";
import ModalInboundHand from "../../../../components/ModalInboundHand/ModalInboundHand";
import { InboundDataContext } from "../../../../context/inboundDataContext";
import firebaseGetMainData from "../../../../firebase/api/getData";
import ModalOutboundHand from "../../../../components/ModalOutboundHand/ModalOutboundHand";
import { OutboundDataContext } from "../../../../context/outboundDataContext";
import ModalEditOutbound from "../../../../components/ModalEdit/ModalEditOutbound";
import { AuthContext } from "../../../../context/loginContext";
import { checkLevelAcc } from "../../../../components/function/checkLevelAcc";
import { toLocalStringOfPrice } from "../../../../components/function/toLocalStringOfPrice";
import { MainContext } from "../../../../context/mainDataContext";

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

  // const { disPatch } = useContext<any>(MainContext);
  const { disPatchOutboundData } = useContext<any>(OutboundDataContext);

  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "OutboundData/";
    firebaseGetMainData(childRef, disPatchOutboundData);
  }, []);
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
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
      setViewStyle("OutboundExcelImport");
      setTitle("Xuất Kho tự động bằng file Excel");
    } else {
      alert("Tài khoản không đủ quyền thực hiện hành động này !. Liên hệ Mr.Sỹ để biết thêm thông tin");
    }
  };

  //TODO_END: handle ExcelImport

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
              <th style={{ padding: "5px 10px", border: "2px solid #ccc", fontSize: "12px" }}>Action</th>
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
  const priceTemp = toLocalStringOfPrice(objectData?.price || 1);
  const totalPriceTemp = toLocalStringOfPrice(objectData.price * objectData.quantity || 1);
  return (
    <>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", width: "auto", maxWidth: "50px" }}>
        <IonIcon id={`test-${index}`} icon={createOutline} slot="end" size="small" color="success" onClick={handleShowEditModal} />
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
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{priceTemp} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "250px", textAlign: "right" }}>{totalPriceTemp} VNĐ</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px", width: "auto" }}>{objectData.note}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "100px", maxWidth: "350px", width: "auto" }}>{objectData.action}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "30px", maxWidth: "50px" }}>{objectData.batch}</td>
      <td style={{ padding: "2px 5px", border: "1px solid gray", fontSize: "12px", minWidth: "60px", maxWidth: "100px" , cursor: "pointer"}} id={`outbound-log-${index}`}>
        {timestampToTime(objectData.lastUpdate, "date only")}
      </td>
      <IonPopover trigger={`outbound-log-${index}`} triggerAction="click" side="end" size="auto" className="custom-popover">
        <IonContent className="ion-padding">
          {Object.values(objectData?.logs || { 1: { detail: "Không có thông tin !" } })
            ?.reverse()
            .map((value: any, indexPopover: number) => {
              return <PopoverItem value={value} indexPopover={indexPopover} key={`${indexPopover}-popoverList`} />;
            })}
        </IonContent>
      </IonPopover>
    </>
  );
};
//JSX_END: JSX Item List

//! export
export default OutboundView;

//JSX: Popover

const PopoverItem = ({ value, indexPopover }: { value: any; indexPopover: number }) => {
  return (
    <IonItem key={`${indexPopover}-popoverItem`}>
      <div style={{ marginRight: "10px" }}>
        <IonLabel style={{ fontSize: "10px" }} color="warning">
          {value?.behavior}
        </IonLabel>
        <IonLabel style={{ fontSize: "10px" }} color="gray">
          {" "}
          {timestampToTime(+value?.timeStamp)}
        </IonLabel>
      </div>
      <IonText style={{ fontSize: "12px" }}>{value?.detail}</IonText>
      <IonLabel className="fontSize-normal no-margin-top-bottom"></IonLabel>
    </IonItem>
  );
};
//JSX_END: Popover
