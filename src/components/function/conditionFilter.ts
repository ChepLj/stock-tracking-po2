import { ITF_FilterResult } from "../../interface/mainInterface";

function conditionFilter(dataRaw: any, keyOfDataShow: Array<string>, filterList: ITF_FilterResult, authorLogin: any) {
  console.log("🚀 ~ file: conditionFilter.ts:4 ~ conditionFilter ~ filterList:", filterList);
  return keyOfDataShow.filter((key) => {
    const objectNew = dataRaw[key];

    //:user check
    const conditionUserCheck = () => {
      if (filterList.user.length) {
        if (filterList.user.includes(objectNew.author)) {
          return true;
        }
        return false;
      }
      return true;
    };
    //:stock check
    const conditionStockCheck = () => {
      if (filterList.stock.length) {
        return objectNew.store?.reduce((result: boolean, crr: { local: string }) => {
          if (filterList.stock?.includes(crr?.local)) {
            return true;
          }
          return result;
        }, false);
      }
      return true;
    };
    //:tag check
    const conditionTagCheck = () => {
      if (filterList.tag.length) {
        return objectNew.tag?.reduce((result: boolean, crr: string) => {
          if (filterList.tag?.includes(crr)) {
            return true;
          }
          return result;
        }, false);
      }
      return true;
    };
    //:personal check
    const conditionPersonalCheck = () => {
      let isMatch = true;
      if (filterList.personal.length) {
        for (const item of filterList.personal) {
          if (item === "Favorite") {
            console.log(authorLogin)
            if (objectNew.favorite?.includes(authorLogin.userName)) {
              return (isMatch = true);
            }
            isMatch = false;
          } else if (item === "Important") {
            if (objectNew.important?.includes(authorLogin.userName)) {
              return (isMatch = true);
            }
            isMatch = false;
          } else if (item === "Private") {
            if (objectNew.private?.includes(authorLogin.userName)) {
              return (isMatch = true);
            }
            isMatch = false;
          }
        }
      }

      return isMatch;
    };

    //:field check
    //! chua lam
    return conditionUserCheck() && conditionStockCheck() && conditionTagCheck() && conditionPersonalCheck();
  });
}

//! export
export default conditionFilter;
