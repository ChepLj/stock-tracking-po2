import { IonAvatar, IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonNote, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { memo, useContext, useEffect } from "react";
import { AuthContext } from "../../context/loginContext";


const HelpsPage: React.FC = () => {
  console.log("%cHelps Page Render", "color:green");
  useEffect(() => {
    //: Unmount
    return () => {
      console.log("%cHelps Page Unmount", "color:red");
    };
  }, []);

  const { authorLogin } = useContext<any>(AuthContext);
  return (
    <IonPage>
      {/* <Header title="Helps"></Header> */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
          <IonMenuButton />
          </IonButtons>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel>Account Level: </IonLabel>
          <IonText>{authorLogin.level}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>App Level: </IonLabel>
          <IonText>{authorLogin?.app.equipmentManager.appLevel}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Avatar: </IonLabel>
          <IonAvatar style={{ padding: "3px", border: "1px solid #ccc" }}>
            <img src={authorLogin.photoURL} />
          </IonAvatar>
        </IonItem>
        <IonItem>
          <IonLabel>Name: </IonLabel>
          <IonText>{authorLogin.displayName}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>UserName: </IonLabel>
          <IonText>{authorLogin.userName}</IonText>
        </IonItem>
        <IonItem>
          <IonLabel>Email: </IonLabel>
          <IonText>{authorLogin.email}</IonText>
        </IonItem>

        <IonNote color="medium" style={{ fontSize: "10px", fontStyle: "italic", margin: "10px" }}>
          for change information ,please contact Mr.Sy
        </IonNote>
      </IonContent>
    </IonPage>
  );
};

export default memo(HelpsPage);
