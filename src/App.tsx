import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";
//! Import
import { useContext, useEffect, useState } from "react";
import "./App.css";
import { decryptCrypto } from "./components/function/crypto";
import { InboundDataProvider } from "./context/inboundDataContext";
import { AuthContext } from "./context/loginContext";
import MainDataContext from "./context/mainDataContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import Menu from "./components/Menu";

import LoadingPage from "./pages/LoadingPage/LoadingPage";
import Main from "./pages/StockPage/Main";
import TrashPage from "./pages/TrashPage/TrashPage";
import HelpsPage from "./pages/HelpsPage/HelpsPage";
import LogsPage from "./pages/LogsPage/LogsPage";
import { OutboundDataProvider } from "./context/outboundDataContext";
import Dashboard from "./pages/Dashboard/Dashboard";
import Auxiliary from "./pages/AuxiliaryPage/AuxiliaryPage";
import { checkLevelAcc } from "./components/function/checkLevelAcc";
import ExcelToJson from "./components/ExcelToJson/ExcelToJson";
import excelDateToMonthYear from "./components/function/excelDateToMonthYear";

//! end
setupIonicReact();

const App: React.FC = () => {
  console.log("%cApp Render", "color:green");
  const { authorLogin, setAuthorLogin } = useContext<any>(AuthContext);
  console.log("🚀 ~ authorLogin:", authorLogin)
  const [loading, setLoading] = useState<"loading" | "logged" | "not logged">("loading");
  const date = new Date();





  useEffect(() => {
    if (authorLogin) {
      setLoading("logged");
    } else {
      //TODO: Get authorLogin cookie
      // const getCookie = async () => {
      //   const cookie: HttpCookie = await Http.getCookie({
      //     url: "http://equipment.manager",
      //     key: "authorLogin",
      //   });
      //   if (cookie.value) {
      //     const auth = JSON.parse(cookie.value);
      //     if (auth.expiresTime === date.getDate()) {
      //       console.log("🚀 ~ file: App.tsx:55 ~ getCookie ~ auth:", auth);
      //       setAuthorLogin(auth);
      //     } else {
      //       setLoading("not logged");
      //     }
      //   } else {
      //     setLoading("not logged");
      //   }
      // };
      // getCookie();
      /////////////////////////////////////////////////////////
      const authorTemp = localStorage.getItem("authorLogin");
      if (authorTemp) {
        const now = new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000; // 1 day in milliseconds
        const authorDecryptTemp = decryptCrypto(authorTemp);
        if (now.getTime() - authorDecryptTemp?.timestamp >= oneDayInMs) {
          localStorage.removeItem("authorLogin"); // Remove data if it's older than 1 day
          setLoading("not logged");
        } else {
          setAuthorLogin(authorDecryptTemp);
        }
      } else {
        setLoading("not logged");
      }
      //TODO_END: Get authorLogin cookie
    }
  }, [authorLogin]);




  return (
    <MainDataContext>
      <InboundDataProvider>
        <OutboundDataProvider>
          <IonApp>
            <IonReactRouter>
              {loading === "loading" && <h3 style={{ textAlign: "center", height: "100%", paddingTop: "90%" }}>Loading ...</h3>}
              {loading === "not logged" && (
                <IonRouterOutlet>
                  <Switch>
                    {/* <Route path="/page/Detail/QRCode/" exact={true}>
                    <DetailPage />
                  </Route> */}

                    <Route path="*">
                      <LoginPage />
                    </Route>
                  </Switch>
                </IonRouterOutlet>
              )}
              {loading === "logged" && authorLogin && (
                <IonSplitPane contentId="main" when="(min-width: 800px)">
                  <Menu dispatch={setLoading} />

                  <IonRouterOutlet id="main">
                    <Route path="/" exact={true}>
                      <Redirect to="/page/Main" />
                    </Route>
                    <Route path="/page/Main" exact={true}>
                      <Main />
                    </Route>
                    <Route path="/page/Dashboard" exact={true}>
                      <Dashboard />
                    </Route>
                    <Route path="/page/Auxiliary" exact={true}>
                      <Auxiliary />
                    </Route>
                    <Route path="/page/Redirect" exact={true}>
                      <LoadingPage />
                    </Route>
                    <Route path="/page/Trash" exact={true}>
                      <TrashPage />
                    </Route>
                    <Route path="/page/Info" exact={true}>
                      <HelpsPage />
                    </Route>
                    <Route path="/page/Logs" exact={true}>
                      <LogsPage />
                    </Route>
                  </IonRouterOutlet>
                </IonSplitPane>
              )}
            </IonReactRouter>
          </IonApp>
        </OutboundDataProvider>
      </InboundDataProvider>
    </MainDataContext>
  );
};
  console.log("🚀 ~ excelDateToMonthYear(45596):", excelDateToMonthYear(45596))

export default App;
