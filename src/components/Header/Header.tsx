import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";
import { useContext } from "react";

import HeaderMain from "./HeaderMain";
import HeaderMobile from "./HeaderMobile";
import { AuthContext } from "../../context/loginContext";
import { ITF_Data } from "../../interface/mainInterface";


const Header = ({
  modalFilterOpen,
  setModalFilterOpen,
  callbackResultSearch,
  isFilter,
  value,
  countSearch,
  viewStyle,
  setViewStyle,
  data,
  keyOfDataRaw,
}: {
  modalFilterOpen?: boolean;
  setModalFilterOpen?: Function;
  callbackResultSearch?: Function;
  isFilter: boolean;
  value: any;
  countSearch: number[];
  viewStyle: string;
  setViewStyle: Function;
  data: ITF_Data;
  keyOfDataRaw: string[];
} ) => {
  console.log("%cHeader  Render", "color:green");
  const { authorLogin } = useContext<any>(AuthContext);

  return (
    <IonHeader>
      {!authorLogin.isPhone ? (
        <HeaderMain
          callbackResultSearch={callbackResultSearch}
          modalFilterOpen={modalFilterOpen}
          setModalFilterOpen={setModalFilterOpen}
          isFilter={isFilter}
          value={value}
          countSearch={countSearch}
          viewStyle={viewStyle}
          setViewStyle={setViewStyle}
          data={data}
          keyOfDataRaw={keyOfDataRaw}
        ></HeaderMain>
      ) : (
        <HeaderMobile
          title="Main"
          callbackResultSearch={callbackResultSearch}
          modalFilterOpen={modalFilterOpen}
          setModalFilterOpen={setModalFilterOpen}
          isFilter={isFilter}
          value={value}
        ></HeaderMobile>
      )}
      {/* //: Content */}
    </IonHeader>
  );
};

//TODO: Export
export default Header;
