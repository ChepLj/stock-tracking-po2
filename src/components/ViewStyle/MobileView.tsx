import { IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonItem, IonGrid, IonRow, IonCol, IonThumbnail, IonText, IonLabel, IonRippleEffect, IonList, IonSkeletonText } from "@ionic/react";

import { alertOutline, eyeOffOutline, heartSharp, heart, create } from "ionicons/icons";
import { useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import { Virtuoso } from "react-virtuoso";
import ObjectData, { objectListRender } from "../../../components/FC_Components/initObjectData";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import { ITF_ObjectData, ITF_AuthorLogin } from "../../../interface/mainInterface";
import './MobileView.css'
export default function MobileView({ keyOfDataRaw, virtuoso, data, disPatch, ionItemSlidingRef, authorLogin }) {

  //TODO: Close All sliding
  const handelCloseSliding = () => {
    ionItemSlidingRef.current?.closeOpened();
  };
  handelCloseSliding(); //: action every time render
  //TODO_end: Close All sliding
  return (
    <>
      {" "}
      <div style={{ fontSize: "10px", fontStyle: "italic", padding: "2px" }}>{keyOfDataRaw.length} item</div>
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
const ItemList = ({
  objectData,
  index,
  objectKey,
  disPatch,
  ionItemSlidingRef,
  authorLogin,
}: {
  objectData: ITF_ObjectData;
  index: number;
  objectKey: string;
  disPatch: Function;
  ionItemSlidingRef: any;
  authorLogin: ITF_AuthorLogin;
}) => {
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
    <IonItemSliding key={index} style={{ minHeight: "95px" }} ref={ionItemSlidingRef}>
      <IonItemOptions side="start">
        <IonItemOption
          color="warning"
          onClick={() => {
            objectData!.handelEdit(history, objectKey, objectData.authorId, authorLogin);
          }}
        >
          <IonIcon slot="start" icon={create}></IonIcon>
          Edit
        </IonItemOption>
        <IonItemOption
          color="secondary"
          onClick={() => {
            objectData!.handelImportant(authorLogin, disPatch);
          }}
        >
          <IonIcon slot="start" icon={alertOutline}></IonIcon>
          Important
        </IonItemOption>
      </IonItemOptions>

      <IonItem
        className="ion-no-padding ion-activatable ripple-parent"
        onClick={() => {
          objectData!.handelDetail(history, objectKey);
        }}
      >
        <IonGrid fixed={true}>
          <IonRow>
            <IonCol size-xs="3" className="ion-no-padding">
              <IonThumbnail className="mobileView_thumbnail">
                <LazyLoadImage
                  className="mobileView_img"
                  // src={array[index]}
                  src={objectData.icon.image}
                  alt="avatar"
                  width={"100%"}
                  height={"100%"}
                  afterLoad={() => {
                    handleRemoveBlurhash(`blurhash-${index}`);
                  }}
                />
                {objectData.icon.hash && <Blurhash id={`blurhash-${index}`} className="mobileView_img-blurhash" hash={objectData.icon.hash} resolutionX={32} resolutionY={32} punch={1} />}
              </IonThumbnail>
            </IonCol>
            <IonCol size-xs="9" className="ion-align-self-stretch mobileView_content-Col-Parent  ">
              <IonRow>
                <IonText color={"success"} className="fontSize-normal">
                  {objectData!.id}
                </IonText>
                <IonText color={"medium"} className="fontSize-normal padding-left-right-8px">
                  ({objectData!.code})
                </IonText>
              </IonRow>
              <IonRow>
                <IonLabel
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                  }}
                >
                  {objectData!.title}
                </IonLabel>
              </IonRow>
              <IonRow>
                <IonLabel color="medium" className="fontSize-normal padding-top-4px">
                  {objectData!.description.replaceAll("<br/>", " ")}
                </IonLabel>
              </IonRow>
              <IonRow className="mobileView_sy-Col-Child ion-justify-content-end fontSize-normal ">
                <IonCol size="auto" className="ion-no-padding ">
                  <IonLabel className="ion-text-right" color="medium">
                    <i style={{ fontSize: "0.7em" }}>{objectData!.author}</i>
                  </IonLabel>
                </IonCol>
                <IonCol size="3" className="ion-no-padding">
                  <IonLabel className="ion-text-right" color="medium">
                    <i style={{ fontSize: "0.7em" }}>{timestampToTime(+objectData!.dateCreated, "date only")}</i>
                  </IonLabel>
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <div className="mobileView_content-ticker">
            {objectData?.isPrivate && <IonIcon icon={eyeOffOutline} color="tertiary" />}
            {objectData?.important.includes(authorLogin.userName) && <IonIcon icon={alertOutline} color="danger" />}
            {objectData?.favorite.includes(authorLogin.userName) && <IonIcon icon={heartSharp} color="warning" />}
          </div>
        </IonGrid>
        <IonRippleEffect></IonRippleEffect>
      </IonItem>

      <IonItemOptions slot="end">
        <IonItemOption
          onClick={() => {
            objectData!.handelFavorite(authorLogin, disPatch);
          }}
        >
          <IonIcon slot="start" icon={heart} />
          Favorite
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => {
            objectData!.handelPreDelete(authorLogin, disPatch);
          }}
        >
          Delete
        </IonItemOption>
      </IonItemOptions>
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
            <IonItem style={{ minHeight: "95px" }} key={index}>
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
