import { IonButton, IonButtons, IonCol, IonGrid, IonIcon, IonItem, IonItemSliding, IonLabel, IonList, IonRippleEffect, IonRow, IonSkeletonText, IonText, IonThumbnail } from "@ionic/react";
import { alertOutline, create, eyeOffOutline, heart, heartSharp, trash } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import { Virtuoso } from "react-virtuoso";
import ObjectData, { objectListRender } from "../../../components/FC_Components/initObjectData";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import { ITF_AuthorLogin, ITF_ObjectData } from "../../../interface/mainInterface";

function ListView({ data, keyOfDataRaw, disPatch, ionItemSlidingRef, authorLogin }: { data: any; keyOfDataRaw: string[]; disPatch: Function; ionItemSlidingRef: any; authorLogin: any }) {
  const virtuoso = useRef<any>(null);

  return (
    <>
      {!keyOfDataRaw.includes("A000000") ? (
        <Virtuoso
          ref={virtuoso}
          style={{ height: "100%" }}
          data={[...keyOfDataRaw]}
          overscan={{ main: 0, reverse: 2000 }}
          itemContent={(index, crrKey) => {
            objectListRender[crrKey] = new ObjectData(data[crrKey]);
            return (
              <>
                <ItemList index={index} objectData={objectListRender[crrKey]} objectKey={crrKey} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />
              </> //: Tạo riêng 1 JSX cho ITEM
            );
          }}
        />
      ) : (
        <SkeletonItem />
      )}
    </>
  );
}

//JSX: JSX Function Child
const ItemList = ({ objectData, index, objectKey, disPatch, ionItemSlidingRef, authorLogin }: { objectData: ITF_ObjectData; index: number; objectKey: string; disPatch: Function; ionItemSlidingRef: any; authorLogin: ITF_AuthorLogin }) => {
  const history = useHistory(); //: lấy history
  const handleRemoveBlurhash = (id: string) => {
    const elm = document.getElementById(id);
    elm?.remove();
  };

  useEffect(() => {
    //:nothing

    //:Unmount
    //! To enhance performant set Object to null
    return () => {
      // objectListRender[objectKey] = null;
      // delete objectListRender[objectKey];
    };
    //! end
  }, []);
  return (
    <IonItemSliding key={index}>
      <IonItem
        className="ion-no-padding ion-activatable ripple-parent"
        onClick={() => {
          objectData!.handelDetail(history, objectKey);
        }}
      >
        <IonGrid fixed={true} style={{ overflow: "hidden" }}>
          <IonRow>
            <IonCol size-xs="0.5" className="ion-no-padding mainPage_column-thumbnail">
              <IonThumbnail className="mainPage_thumbnail">
                <LazyLoadImage
                  className="mainPage_img"
                  // src={array[index]}
                  src={objectData.icon.image}
                  alt="avatar"
                  width={"100%"}
                  height={"100%"}
                  afterLoad={() => {
                    handleRemoveBlurhash(`blurhash-${index}`);
                  }}
                />
                {objectData.icon.hash && <Blurhash id={`blurhash-${index}`} className="mainPage_img-blurhash" hash={objectData.icon.hash} resolutionX={32} resolutionY={32} punch={1} />}
              </IonThumbnail>
            </IonCol>
            <IonCol className="ion-align-self-stretch main_content-Col-Parent  ">
              <IonRow className="mainPage_content-ticker-father">
                <IonText color={"success"} className="fontSize-normal">
                  {objectData!.id}
                </IonText>
                <IonText color={"medium"} className="fontSize-normal padding-left-right-8px mainPage_content-ticker-father">
                  ({objectData!.code})
                </IonText>
                <div className="mainPage_content-ticker">
                  {objectData?.isPrivate && <IonIcon icon={eyeOffOutline} color="tertiary" />}
                  {objectData?.important.includes(authorLogin.userName) && <IonIcon icon={alertOutline} color="danger" />}
                  {objectData?.favorite.includes(authorLogin.userName) && <IonIcon icon={heartSharp} color="warning" />}
                </div>
              </IonRow>
              <IonRow style={{ maxWidth: "680px" }}>
                <IonLabel
                  className="fontStyle-boil "
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  {objectData!.title}
                </IonLabel>
              </IonRow>
              <IonRow style={{ maxWidth: "680px" }}>
                <IonLabel color="medium" className="fontSize-small padding-top-4px">
                  {objectData!.description.replaceAll("<br/>", " ")}
                </IonLabel>
              </IonRow>
              <div className="sy-Col-Child ion-justify-content-end fontSize-small ">
                <IonCol size="auto" className="ion-no-padding ">
                  <IonLabel className="ion-text-right" color="medium">
                    <i style={{ fontSize: "12px" }}>{objectData!.author}</i>
                  </IonLabel>
                </IonCol>
                <IonCol size="3" className="ion-no-padding">
                  <IonLabel className="ion-text-right" color="medium">
                    <i style={{ fontSize: "12px" }}>{timestampToTime(+objectData!.dateCreated, "date only")}</i>
                  </IonLabel>
                </IonCol>
              </div>
            </IonCol>
            <IonCol className="mainPage_content-behavior" size="auto">
              <IonButtons onClick={(event) => event.stopPropagation()}>
                <IonButton
                  style={{ fontSize: "10px" }}
                  fill="outline"
                  color="warning"
                  onClick={() => {
                    objectData!.handelEdit(history, objectKey, objectData.authorId, authorLogin);
                  }}
                >
                  <IonIcon slot="start" icon={create} style={{ fontSize: "10px" }}></IonIcon>
                  Edit
                </IonButton>
                <IonButton
                  style={{ fontSize: "10px" }}
                  fill="outline"
                  color="secondary"
                  onClick={() => {
                    objectData!.handelImportant(authorLogin, disPatch);
                  }}
                >
                  <IonIcon slot="start" icon={alertOutline} style={{ fontSize: "10px" }}></IonIcon>
                  Important
                </IonButton>
                <IonButton
                  style={{ fontSize: "10px" }}
                  fill="outline"
                  onClick={() => {
                    objectData!.handelFavorite(authorLogin, disPatch);
                  }}
                >
                  <IonIcon slot="start" icon={heart} style={{ fontSize: "10px" }} />
                  Favorite
                </IonButton>
                <IonButton
                  style={{ fontSize: "10px" }}
                  fill="outline"
                  color="danger"
                  onClick={() => {
                    objectData!.handelPreDelete(authorLogin, disPatch);
                  }}
                >
                  <IonIcon slot="start" icon={trash} style={{ fontSize: "10px" }} />
                  Delete
                </IonButton>
              </IonButtons>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonRippleEffect></IonRippleEffect>
      </IonItem>
    </IonItemSliding>
  );
};
//JSX_END: JSX Function Child

//JSX: skeleton item
function SkeletonItem() {
  const itemArray = Array(10).fill(1);
  return (
    <IonList>
      <div>
        {itemArray.map((crr, index) => {
          return (
            <IonItem style={{ minHeight: "50px", heigh: "60px" }} key={index}>
              <IonThumbnail slot="start">
                <IonSkeletonText animated={true}></IonSkeletonText>
              </IonThumbnail>
              <IonLabel>
                <h3>
                  <IonSkeletonText animated={true} style={{ width: "80%" }}></IonSkeletonText>
                </h3>
                <p>
                  <IonSkeletonText animated={true} style={{ width: "60%" }}></IonSkeletonText>
                </p>
                <p>
                  <IonSkeletonText animated={true} style={{ width: "30%" }}></IonSkeletonText>
                </p>
              </IonLabel>
            </IonItem>
          );
        })}
      </div>
    </IonList>
  );
}

//JSX_END: skeleton item
//! export
export default ListView;
