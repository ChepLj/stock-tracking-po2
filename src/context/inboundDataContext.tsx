import { createContext, useEffect, useReducer, useState } from "react";
import { ITF_ActionDisPatch } from "../interface/mainInterface";

const InboundDataContext = createContext({});

const InboundDataProvider = ({ children }: any) => {
  console.log("%cInboundDataProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cInboundDataProvider Unmount", "color:red");
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
  const [InboundData, disPatchInboundData]: [data: any, disPatch: Function] = useReducer<any>(handleInboundData, initData);
  const keyOfInboundDataShow = [];
  for (const key in InboundData) {
    if (InboundData[key]?.status?.value !== "pre-delete") {
      keyOfInboundDataShow.push(key);
    }
  }
  return (
    <InboundDataContext.Provider value={{ InboundData,keyOfInboundDataShow, disPatchInboundData }}>
      {/* The rest of your app */}
      {children}
    </InboundDataContext.Provider>
  );
};

export { InboundDataContext, InboundDataProvider };

