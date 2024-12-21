import { createContext, useReducer } from "react";
import { ITF_ActionDisPatch } from "../interface/mainInterface";
export const MainContext = createContext({});
const initData: any = {
  //: khởi tạo dữ liệu ban đầu
  A000000: {
    id: 1000000,
    code: 1000000,
    title: "Title",
    subTitle: "Sub Title",
    description: "Description",
    store: [],
    tag:[],
    note: "Note",
    icon: { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Z0jXOorrrZ_6NXJXhCg5Y3Xrxk035ze4mQ&usqp=CAU", hash: "" },
    images: [],
    author: "Author",
    dateCreated: "2023-02-24",
    logs: [],
    status: [],
  },
};

const MainDataContext = ({ children }: any) => {
  const [data, disPatch]: [data: any, disPatch: Function] = useReducer<any>(handelData, initData);
  const keyOfDataShow = [];
  for (const key in data) {
    if (data[key]?.status?.value !== "pre-delete") {
      keyOfDataShow.push(key);
    }
  }


  return <MainContext.Provider value={{ data, keyOfDataShow, disPatch }}>{children}</MainContext.Provider>;
};

//TODO: Function Children

const handelData = (state: any, action: ITF_ActionDisPatch) => {
  switch (action.type) {
    case "SUCCESSFUL":
      return action.payload;
    default:
      return state;
  }
};
//TODO_END:

//TODO: Export
export default MainDataContext;
