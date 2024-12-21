import { IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router";

import "./Main.css";
import { useContext, useState, useRef, useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import conditionFilter from "../../components/function/conditionFilter";
import conditionSearch from "../../components/function/conditionSearch";
import Header from "../../components/Header/HeaderMain";
import { AuxiliaryDataContext } from "../../context/auxiliaryDataContext";
import { AuthContext } from "../../context/loginContext";
import { MainContext } from "../../context/mainDataContext";
import firebaseGetMainData from "../../firebase/api/getData";
import { ITF_FilterResult } from "../../interface/mainInterface";
import { refreshOutline } from "ionicons/icons";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import TableView from "../../components/ViewStyle/StockView";
import ExcelToJson from "../../components/ExcelToJson/ExcelToJson";
import InboundView from "../../components/ViewStyle/InboundView";
import OutboundView from "../../components/ViewStyle/OutboundView";
import StockView from "../../components/ViewStyle/StockView";


const Main: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  console.log("%cMain Page Render", "color:green");

  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const [KeyOfDataShowFilter, setKeyOfDataShowFilter] = useState<any>(keyOfDataShow|| []);
  const { AuxiliaryData, disPatchAuxiliaryData } = useContext<any>(AuxiliaryDataContext);
  const { authorLogin } = useContext<any>(AuthContext);

  const [searchState, setSearchState] = useState<any>({ type: false, payload: [] });
  const [modalFilterOpen, setModalFilterOpen] = useState<any>(false);
  const isFilter = useRef(false);
  let searchTargetValue = useRef("");
  const [viewStyle, setViewStyle] = useState("Stock");

  let keyOfDataRaw: Array<string> = [];
  if (searchState.type) {
    keyOfDataRaw = searchState.payload;
  } else {
    keyOfDataRaw = [...KeyOfDataShowFilter];
  }
  keyOfDataRaw.reverse();
  const virtuoso = useRef<any>(null);
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  //TODO: Check Mobile Screen
  useEffect(() => {
    if (window.screen.width < 600) {
      authorLogin.isPhone = true;
      setViewStyle("Mobile");
    }
  }, []);
  //TODO_END: Check Mobile Screen
  //TODO: Lấy Main Data khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
  }, []);

  //TODO: gán key of keyOfDataShow sang setKeyOfDataShowFilter
  useEffect(() => {
    setKeyOfDataShowFilter(keyOfDataShow);
  }, [keyOfDataShow]);
  //TODO_END: gán key of keyOfDataShow sang setKeyOfDataShowFilter

  //TODO_END:Lấy Main Data khi load Page lần đầu

  //TODO: Lấy StockList khi load Page lần đầu
  useEffect(() => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "AuxiliaryData/";
    firebaseGetMainData(childRef, disPatchAuxiliaryData);
  }, []);

  //TODO_END:Lấy StockList khi load Page lần đầu

  //TODO: refresh Data
  const handelRefresh = () => {
    //: lấy data từ firebase sao đó dispatch đê render lại
    const childRef = "MainData/";
    firebaseGetMainData(childRef, disPatch);
    isFilter.current = false;
    const align = "start";
    const behavior = "smooth";
    virtuoso.current.scrollToIndex({
      //: scroll to top
      index: 0,
      align,
      behavior,
    });
  };

  //TODO_end: refresh Data

  //TODO: Search Result
  const handelSearch = (ev: Event) => {
    let query = "";
    const searchTarget = ev.target as HTMLIonSearchbarElement;
    if (searchTarget) {
      // query = target.value!.toLowerCase();
      query = searchTarget.value!;
      searchTargetValue.current = query;
      if (query) {
        setSearchState({ type: true, payload: conditionSearch(data, KeyOfDataShowFilter, query) });
      } else {
        setSearchState({ type: false, payload: [] });
      }
    }
  };
  //TODO_END: Search Result
  //TODO:  handel filter
  const handleFilter = (filterList: ITF_FilterResult) => {
    const isFilterFC = () => {
      for (const key in filterList) {
        const newKey = key as keyof ITF_FilterResult;
        if (filterList[newKey].length) {
          return true;
        }
      }
      return false;
    };
    ////////////////
    if (isFilterFC()) {
      isFilter.current = true;

      setKeyOfDataShowFilter(conditionFilter(data, keyOfDataShow, filterList, authorLogin));
    } else {
      isFilter.current = false;
      setKeyOfDataShowFilter(keyOfDataShow);
    }
    searchTargetValue.current = "";
  };
  //TODO_END:  handel filter
  return (
    <IonPage>
      <Header
        callbackResultSearch={handelSearch}
        modalFilterOpen={modalFilterOpen}
        setModalFilterOpen={setModalFilterOpen}
        isFilter={isFilter.current}
        value={searchTargetValue.current}
        countSearch={[keyOfDataRaw?.length, keyOfDataShow?.length]}
        viewStyle={viewStyle}
        setViewStyle={setViewStyle}
        data={data}
        keyOfDataRaw={keyOfDataRaw}
      />

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        {viewStyle === "Stock" && <StockView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} virtuoso={virtuoso} handelRefresh={handelRefresh} />}
        {viewStyle === "Inbound" && <InboundView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} virtuoso={virtuoso} />}
        {viewStyle === "Outbound" && <OutboundView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} virtuoso={virtuoso} />}
       
      </IonContent>
     
      <ModalFilter modalFilterOpen={modalFilterOpen} setModalFilterOpen={setModalFilterOpen} handleFilter={handleFilter} isFilter={isFilter.current} />
    </IonPage>
  );
};

export default Main;
