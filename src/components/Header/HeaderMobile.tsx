import { IonAvatar, IonButtons, IonHeader, IonIcon, IonImg, IonMenuButton, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { filterCircleOutline } from "ionicons/icons";
import { useContext } from "react";
import { AuthContext } from "../../context/loginContext";


const Header = ({
  title,
  modalFilterOpen,
  setModalFilterOpen,
  callbackResultSearch,
  isFilter,
  value,
}: {
  title: string;
  modalFilterOpen?: boolean;
  setModalFilterOpen?: Function;
  callbackResultSearch?: Function;
  isFilter: boolean;
  value: any;
}) => {
  console.log("%cHeader  Render", "color:green");
  const { authorLogin } = useContext<any>(AuthContext);
  return (
    <>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <IonAvatar slot="end" style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "5px", border: "1px solid #6ac968" }}>
          <IonImg alt="Avatar" src={authorLogin.photoURL} />
        </IonAvatar>
      </IonToolbar>
      {title === "Main" && (
        <IonToolbar>
          <IonSearchbar debounce={500} onIonChange={(ev) => callbackResultSearch!(ev)} value={value}></IonSearchbar>
          <IonIcon icon={filterCircleOutline} slot="end" size="large" color={isFilter ? "danger" : "medium"} onClick={() => setModalFilterOpen!(!modalFilterOpen)} />
        </IonToolbar>
      )}
    </>
  );
};

//TODO: Export
export default Header;
