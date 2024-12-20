import styled from "@emotion/styled";
import { IonButton, IonIcon, IonLabel, IonPopover, IonThumbnail } from "@ionic/react";
import { alertOutline, create, eyeOffOutline, heart, heartSharp, trash } from "ionicons/icons";
import { useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router";
import { VirtuosoGrid } from "react-virtuoso";
import ObjectData, { objectListRender } from "../../../components/FC_Components/initObjectData";
import timestampToTime from "../../../components/FC_Components/timestampToTime";
import { ITF_AuthorLogin, ITF_ObjectData } from "../../../interface/mainInterface";
const ItemContainer = styled.div`
  // padding: 0.5rem;
  width: 150px;
  height: 170px;
  max-height: 170px;
  max-width: 150px;
  display: flex;
  // flex: 2;
  // justify-content: center;
  box-sizing: border-box;
  border: 1px solid gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-shadow: 1px 1px 5px #ccc;
  margin: 5px;
  overflow: hidden;
  // cursor: pointer;
  background-color: white;
  &:hover {
    box-shadow: 1px 2px 10px gray;
  }
`;

const ItemWrapper = styled.div`
  flex: 1;
  text-align: center;
  font-size: 80%;
  padding: 1rem 1rem;
  border: 1px solid var(gray);
  white-space: nowrap;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #e9e9e9;
`;

const AuthorStyle = styled.div`
  width: 100%;
  over-flow: hidden;
  white-space: nowrap;
  text-over-flow: ellipsis;
  padding-left: 2px;
  height: 12px;
  align-items: center;
  display: flex;
  font-style: italic;
  color: #333;
  font-size: 8px;
`;

export default function CardView({ data, keyOfDataRaw, disPatch, ionItemSlidingRef, authorLogin }: { data: any; keyOfDataRaw: string[]; disPatch: Function; ionItemSlidingRef: any; authorLogin: any }) {
  return (
    <>
      {" "}
      {!keyOfDataRaw.includes("A000000") ? (
        <VirtuosoGrid
          style={{ height: "98%" }}
          // totalCount={keyOfDataRaw.length}
          data={[...keyOfDataRaw]}
          overscan={{ main: 0, reverse: 9000 }}
          components={{
            List: ListContainer,
            Item: ItemContainer,
            ScrollSeekPlaceholder: ({ height, width, index }) => (
              <ItemContainer>
                <ItemWrapper>{"--"}</ItemWrapper>
              </ItemContainer>
            ),
          }}
          itemContent={(index, crrKey) => {
            objectListRender[crrKey] = new ObjectData(data[crrKey]);
            return (
              <>
                <ItemList index={index} objectData={objectListRender[crrKey]} objectKey={crrKey} disPatch={disPatch} ionItemSlidingRef={ionItemSlidingRef} authorLogin={authorLogin} />
              </> //: Tạo riêng 1 JSX cho ITEM
            );
          }}
          scrollSeekConfiguration={{
            enter: (velocity) => Math.abs(velocity) > 2000,
            exit: (velocity) => Math.abs(velocity) < 30,
          }}
        />
      ) : (
        "không tải được dữ liệu !"
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
    <div
      style={{ width: "100%", position: "relative" }}
      onClick={() => {
        objectData!.handelDetail(history, objectKey);
      }}
    >
      <IonThumbnail style={{ width: "150px", height: "100px", position: "relative" }}>
        <LazyLoadImage
          style={{ objectFit: "cover", position: "absolute" }}
          // src={array[index]}
          src={objectData.icon.image}
          alt="avatar"
          width={"100%"}
          height={"100%"}
          afterLoad={() => {
            handleRemoveBlurhash(`blurhash-${index}`);
          }}
        />
        {objectData.icon.hash && <Blurhash id={`blurhash-${index}`} className="viewStyle_img-blurhash" hash={objectData.icon.hash} resolutionX={32} resolutionY={32} punch={1} />}
      </IonThumbnail>
      <div style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingLeft: "2px" }}>
        <IonLabel style={{ fontSize: "11px", color: "green" }}>{objectData.id}</IonLabel>
        <IonLabel style={{ fontSize: "11px", color: "gray", paddingLeft: "2px" }}>({objectData.code})</IonLabel>
      </div>
      <div style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingLeft: "2px" }}>
        <IonLabel style={{ fontSize: "14px", color: "" }}>{objectData.title}</IonLabel>
      </div>
      <AuthorStyle>
        <IonLabel>{objectData.author}</IonLabel>
      </AuthorStyle>
      <AuthorStyle>
        <IonLabel>{timestampToTime(+objectData.dateCreated, "date only")}</IonLabel>
      </AuthorStyle>
      <div className="viewStyle_content-ticker">
        {objectData?.isPrivate && <IonIcon icon={eyeOffOutline} color="tertiary" />}
        {objectData?.important.includes(authorLogin.userName) && <IonIcon icon={alertOutline} color="danger" />}
        {objectData?.favorite.includes(authorLogin.userName) && <IonIcon icon={heartSharp} color="warning" />}
      </div>
      <div className="viewStyle_content-behavior">
        <IonButton style={{ fontSize: "8px" }} fill="clear" color="tertiary" id={`viewStyle-behavior_click-trigger-${index}`} onClick={(event) => event.stopPropagation()}>
          Actions
        </IonButton>
        <IonPopover trigger={`viewStyle-behavior_click-trigger-${index}`} triggerAction="click" onClick={(event) => event.stopPropagation()} dismissOnSelect={true} >
          <IonButton
            style={{ fontSize: "8px" }}
            fill="solid"
            color="warning"
            onClick={() => {
              objectData!.handelEdit(history, objectKey, objectData.authorId, authorLogin);
            }}
          >
            <IonIcon slot="start" icon={create} style={{ fontSize: "8px" }}></IonIcon>
            Edit
          </IonButton>
          <IonButton
            style={{ fontSize: "8px" }}
            fill="solid"
            color="secondary"
            onClick={() => {
              objectData!.handelImportant(authorLogin, disPatch);
            }}
          >
            <IonIcon slot="start" icon={alertOutline} style={{ fontSize: "8px" }}></IonIcon>
            Important
          </IonButton>
          <IonButton
            style={{ fontSize: "8px" }}
            fill="solid"
            onClick={() => {
              objectData!.handelFavorite(authorLogin, disPatch);
            }}
          >
            <IonIcon slot="start" icon={heart} style={{ fontSize: "8px" }} />
            Favorite
          </IonButton>
          <IonButton
            style={{ fontSize: "8px" }}
            fill="solid"
            color="danger"
            onClick={() => {
              objectData!.handelPreDelete(authorLogin, disPatch);
            }}
          >
            <IonIcon slot="start" icon={trash} style={{ fontSize: "8px" }} />
            Delete
          </IonButton>
        </IonPopover>
      </div>
    </div>
  );
};
//JSX_END: JSX Function Child
