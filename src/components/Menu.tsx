import { IonAvatar, IonButton, IonButtons, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, useIonRouter } from "@ionic/react";

import {
  fileTrayFullOutline,
  fileTrayFullSharp,
  informationCircleOutline,
  informationCircleSharp,
  mailOutline,
  mailSharp,
  moon,
  paperPlaneOutline,
  paperPlaneSharp,
  qrCodeOutline,
  qrCodeSharp,
  statsChartOutline,
  statsChartSharp,
  sunny,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import { memo, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import "./Menu.css";
import { AuthContext } from "../context/loginContext";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "OverView",
    url: "/page/Main",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Dashboard",
    url: "/page/Dashboard",
    iosIcon: statsChartOutline,
    mdIcon: statsChartSharp,
  },
  {
    title: "Auxiliary ",
    url: "/page/Auxiliary",
    iosIcon: fileTrayFullOutline,
    mdIcon: fileTrayFullSharp,
  },

  {
    title: "Logs",
    url: "/page/Logs",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
  {
    title: "Trash",
    url: "/page/Trash",

    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Info",
    url: "/page/Info",
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
];

const Menu = ({ dispatch }: { dispatch: Function }) => {
  console.log("%cMenu Render", "color:green");
  const location = useLocation();
  const history = useHistory();
  const { authorLogin } = useContext<any>(AuthContext);
  const router = useIonRouter();
  const [darkMode, setDarkMode] = useState(false);
  //! Dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode") === "true";
    setDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("dark-mode", darkMode.toString());
  }, [darkMode]);

  const handelLogout = async () => {
    // const options = {
    //   url: "http://equipment.manager",
    //   key: "authorLogin",
    // };

    // await Http.clearCookies(options);
    await localStorage.removeItem("authorLogin");
    await dispatch("not logged");
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.goBack();
    } else {
      console.log("No previous route available");
    }
  };

  const routerDirection = (appPage: AppPage) => {
    if (appPage.title == "OverView") {
      history.push({
        pathname: "/page/Redirect",
      });
      // window.location.href = "/page/Main";
    } else if (appPage.title == "Create") {
      router.push(appPage.url, "root");
    } else if (appPage.title == "QRScan") {
      router.push(appPage.url, "root");
    } else {
      history.push({
        pathname: appPage.url,
      });
    }
  };
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader className="ion-no-padding">
            <IonAvatar style={{ maxWidth: "30px", maxHeight: "30px", marginRight: "5px", border: "1px solid #6ac968" }}>
              <IonImg alt="Avatar" src={authorLogin.photoURL} />
            </IonAvatar>
            <span className="menu-logout fontSize-normal" onClick={handelLogout}>
              Logout
            </span>
          </IonListHeader>

          <div className="darkModeWrap">
            <IonNote className="fontSize-normal fontStyle-italic" style={{margin: '7px'}}>{authorLogin.displayName}</IonNote>{" "}
            <IonButton onClick={() => setDarkMode(!darkMode)} shape="round" fill="outline" size="small"  className="darkMode_button">
                  <IonIcon icon={darkMode ? sunny : moon}   slot="icon-only" />
                </IonButton>
          </div>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                {/* <IonItem className={location.pathname === appPage.url ? "selected" : ""} routerLink={appPage.url} href={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem> */}
                <IonItem
                  className={location.pathname === appPage.url ? "selected" : ""}
                  style={{ cursor: "pointer", fontSize: "18px" }}
                  onClick={() => {
                    routerDirection(appPage);
                  }}
                  lines="none"
                  detail={false}
                >
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} style={{ fontSize: "20px" }} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <p style={{ color: "gray", fontStyle: "italic", fontSize: "10px", width: "100%", textAlign: "center" }}>- - - - - -Other App- - - - - - </p>

        <div className="menu-bottom">
          <div>App made for BTĐ Pomina</div>
          <div>Author Mr.Sỹ</div>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default memo(Menu);
