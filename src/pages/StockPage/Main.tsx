import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import "./Main.css";

import { useContext, useEffect, useRef, useState } from "react";
import conditionFilter from "../../components/function/conditionFilter";
import conditionSearch from "../../components/function/conditionSearch";
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import { InboundDataContext } from "../../context/inboundDataContext";
import { AuthContext } from "../../context/loginContext";
import { MainContext } from "../../context/mainDataContext";
import { OutboundDataContext } from "../../context/outboundDataContext";
import firebaseGetMainData from "../../firebase/api/getData";
import { ITF_FilterResult } from "../../interface/mainInterface";
import Header from "./Header/HeaderMain";
import InboundExcelImport from "./ViewStyle/Inbound/InboundExcelImport";
import InboundView from "./ViewStyle/Inbound/InboundView";
import OutboundExcelImport from "./ViewStyle/Outbound/OutboundExcelImport";
import OutboundView from "./ViewStyle/Outbound/OutboundView";
import StockView from "./ViewStyle/StockView";

const Main: React.FC = () => {
  console.log("%cMain Page Render", "color:green");

  const { data, keyOfDataShow, disPatch } = useContext<any>(MainContext);
  const { InboundData, keyOfInboundDataShow, disPatchInboundData } = useContext<any>(InboundDataContext);
  const { OutboundData, keyOfOutboundDataShow, disPatchOutboundData } = useContext<any>(OutboundDataContext);
  const [KeyOfDataShowFilter, setKeyOfDataShowFilter] = useState<any>(keyOfDataShow || []);
  const [KeyOfInboundDataShowFilter, setKeyOfInboundDataShowFilter] = useState<any>(keyOfInboundDataShow || []);
  const [KeyOfOutboundDataShowFilter, setKeyOfOutboundDataShowFilter] = useState<any>(keyOfOutboundDataShow || []);
  const { authorLogin } = useContext<any>(AuthContext);
  const [title, setTitle] = useState("Danh sách Vật tư tồn thực tế theo Kho");
  const [searchState, setSearchState] = useState<any>({ type: false, payload: [] });
  const [modalFilterOpen, setModalFilterOpen] = useState<any>(false);
  const isFilter = useRef(false);
  let searchTargetValue = useRef("");
  const [viewStyle, setViewStyle] = useState("Stock");

  let keyOfDataRaw: Array<string> = [];
  let keyOfInboundDataRaw: Array<string> = [];
  let keyOfOutboundDataRaw: Array<string> = [];
  if (searchState.type) {
    keyOfDataRaw = searchState.payload.stock || [];
    keyOfInboundDataRaw = searchState.payload.inbound || [];
    keyOfOutboundDataRaw = searchState.payload.outbound || [];
  } else {
    keyOfDataRaw = [...KeyOfDataShowFilter];
    keyOfInboundDataRaw = [...KeyOfInboundDataShowFilter];
    keyOfOutboundDataRaw = [...KeyOfOutboundDataShowFilter];
  }

  keyOfDataRaw.reverse();
  keyOfInboundDataRaw.reverse();
  keyOfOutboundDataRaw.reverse();

  const virtuoso = useRef<any>(null);
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  //TODO: Check Mobile Screen
  useEffect(() => {
    if (window.screen.width < 600) {
      authorLogin.isPhone = true;
      // setViewStyle("Mobile");
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
  useEffect(() => {
    setKeyOfInboundDataShowFilter(keyOfInboundDataShow);
  }, [keyOfInboundDataShow]);
  useEffect(() => {
    setKeyOfOutboundDataShowFilter(keyOfOutboundDataShow);
  }, [keyOfOutboundDataShow]);
  //TODO_END: gán key of keyOfDataShow sang setKeyOfDataShowFilter

  //TODO_END:Lấy Main Data khi load Page lần đầu

  //TODO_end: refresh Data

  //TODO: Search Result
  const handelSearch = (ev: Event) => {

    let query = "";
    const searchTarget = ev.target as HTMLIonSearchbarElement;
    if (searchTarget) {
      query = searchTarget.value?.trim() || ""; // Get the search query
      searchTargetValue.current = query;

      if (query) {
        // Perform search on all datasets
        const filteredKeyOfDataRaw = viewStyle === "Stock" ? conditionSearch(data, KeyOfDataShowFilter, query) : [];
        const filteredKeyOfInboundDataRaw = viewStyle === "Inbound" ? conditionSearch(InboundData, KeyOfInboundDataShowFilter, query) : [];
        const filteredKeyOfOutboundDataRaw = viewStyle === "Outbound" ? conditionSearch(OutboundData, KeyOfOutboundDataShowFilter, query) : [];

        // Update the state with the filtered results
        setSearchState({
          type: true,
          payload: {
            stock: filteredKeyOfDataRaw,
            inbound: filteredKeyOfInboundDataRaw,
            outbound: filteredKeyOfOutboundDataRaw,
          },
        });
      } else {
        // Reset search state when query is empty
        setSearchState({
          type: false,
          payload: {
            data: [],
            inbound: [],
            outbound: [],
          },
        });
      }
    }
  };

  //TODO_END: Search Result
  //TODO:  handel filter
  const handleFilter = (filterList: ITF_FilterResult) => {
    console.log("🚀 ~ handleFilter ~ filterList:", filterList);
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
    const updateFilterState = (dataInput: any, setKeyOfDataFn: Function, keyOfDataShowInput: string[]) => {
      if (isFilterFC()) {
        isFilter.current = true;
        setKeyOfDataFn(conditionFilter(dataInput, keyOfDataShowInput, filterList, authorLogin));
      } else {
        isFilter.current = false;
        setKeyOfDataFn(keyOfDataShowInput);
      }
    };

    switch (viewStyle) {
      case "Stock":
        updateFilterState(data, setKeyOfDataShowFilter, keyOfDataShow);
        break;
      case "Inbound":
        updateFilterState(InboundData, setKeyOfInboundDataShowFilter, keyOfInboundDataShow);
        break;
      case "Outbound":
        updateFilterState(OutboundData, setKeyOfOutboundDataShowFilter, keyOfOutboundDataShow);
        break;
      default:
        console.warn(`Unhandled viewStyle: ${viewStyle}`);
    }

    searchTargetValue.current = "";
  };
  //TODO_END:  handel filter

  return (
    <IonPage>
      {viewStyle !== "InboundExcelImport" && viewStyle !== "OutboundExcelImport" && (
        <Header
          callbackResultSearch={handelSearch}
          modalFilterOpen={modalFilterOpen}
          setModalFilterOpen={setModalFilterOpen}
          isFilter={isFilter.current}
          value={searchTargetValue.current}
          countSearch={[keyOfDataRaw?.length, keyOfDataShow?.length]}
          countInboundSearch={[keyOfInboundDataRaw?.length, keyOfInboundDataShow?.length]}
          countOutboundSearch={[keyOfOutboundDataRaw?.length, keyOfOutboundDataShow?.length]}
          viewStyle={viewStyle}
          setViewStyle={setViewStyle}
          data={data}
          inboundData={InboundData}
          outboundData={OutboundData}
          isPhone={authorLogin.isPhone || false}
          setTitle={setTitle}
        />
      )}
      <IonToolbar>
        <h3 style={{ color: "green", width: "100%", textAlign: "center", marginTop: "4px", marginBottom: "0px" }}>{title}</h3>
      </IonToolbar>

      <IonContent fullscreen>
        {viewStyle === "Stock" && (
          <StockView data={data} keyOfDataRaw={keyOfDataRaw} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} virtuoso={virtuoso} isFilter={isFilter} />
        )}
        {viewStyle === "Inbound" && (
          <InboundView
            data={InboundData}
            setViewStyle={setViewStyle}
            keyOfInboundDataRaw={keyOfInboundDataRaw}
            disPatch={disPatch}
            ionItemSlidingRef={ionItemSlidingRef}
            authorLogin={authorLogin}
            virtuoso={virtuoso}
            setTitle={setTitle}
          />
        )}
        {viewStyle === "Outbound" && (
          <OutboundView
            data={OutboundData}
            setViewStyle={setViewStyle}
            keyOfOutboundDataRaw={keyOfOutboundDataRaw}
            disPatch={disPatch}
            ionItemSlidingRef={ionItemSlidingRef}
            authorLogin={authorLogin}
            virtuoso={virtuoso}
            setTitle={setTitle}
          />
        )}
        {viewStyle === "InboundExcelImport" && <InboundExcelImport setViewStyle={setViewStyle} />}
        {viewStyle === "OutboundExcelImport" && <OutboundExcelImport setViewStyle={setViewStyle} />}
      </IonContent>

      <ModalFilter modalFilterOpen={modalFilterOpen} setModalFilterOpen={setModalFilterOpen} handleFilter={handleFilter} isFilter={isFilter} viewStyle={viewStyle} />
    </IonPage>
  );
};

export default Main;
