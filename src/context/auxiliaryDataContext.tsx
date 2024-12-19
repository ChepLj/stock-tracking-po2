import { createContext, useEffect, useReducer, useState } from "react";
import { ITF_ActionDisPatch } from "../interface/mainInterface";

const AuxiliaryDataContext = createContext({});

const AuxiliaryDataProvider = ({ children }: any) => {
  console.log("%cAuxiliaryDataProvider Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cAuxiliaryDataProvider Unmount", "color:red");
    };
  }, []);

  const initData = {
    StockList:[],
    UserList:[],
    TagList:[]
  }
  const handleAuxiliaryData = (state: any, action: ITF_ActionDisPatch) => {  
    switch (action.type) {
      case "SUCCESSFUL":
        return action.payload;
      default:
        return state;
    }
  }
  const [AuxiliaryData, disPatchAuxiliaryData]: [data: any, disPatch: Function] = useReducer<any>(handleAuxiliaryData, initData);
 
  return (
    <AuxiliaryDataContext.Provider value={{ AuxiliaryData, disPatchAuxiliaryData }}>
      {/* The rest of your app */}
      {children}
    </AuxiliaryDataContext.Provider>
  );
};

export { AuxiliaryDataContext, AuxiliaryDataProvider };

