import { createContext, useEffect, useReducer, useState } from "react";
import { ITF_ActionDisPatch } from "../interface/mainInterface";

const OutboundDataContext = createContext({});

const OutboundDataProvider = ({ children }: any) => {
  console.log("%cOutboundDataProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cOutboundDataProvider Unmount", "color:red");
    };
  }, []);

  const initData = {
    StockList:[],
    UserList:[],
    TagList:[]
  }
  const handleInboundData = (state: any, action: ITF_ActionDisPatch) => {  
    switch (action.type) {
      case "SUCCESSFUL":
        return action.payload;
      default:
        return state;
    }
  }
  const [OutboundData, disPatchOutboundData]: [data: any, disPatch: Function] = useReducer<any>(handleInboundData, initData);
  const keyOfOutboundDataShow = [];
  for (const key in OutboundData) {
    if (OutboundData[key]?.status?.value !== "pre-delete") {
      keyOfOutboundDataShow.push(key);
    }
  }
  return (
    <OutboundDataContext.Provider value={{ OutboundData,keyOfOutboundDataShow, disPatchOutboundData }}>
      {/* The rest of your app */}
      {children}
    </OutboundDataContext.Provider>
  );
};

export { OutboundDataContext, OutboundDataProvider };

