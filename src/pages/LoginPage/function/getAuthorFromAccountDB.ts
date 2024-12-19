import { get, ref } from "firebase/database";
import { databaseAccount } from './firebaseAccountConfig';

function getAuthorFromAccountDB (childRef:any, disPatch?:any){
   const mainRef = ref(databaseAccount, childRef)
   get(mainRef).then((snapshot) => {
    if (snapshot.exists()) {
      disPatch({type: "SUCCESSFUL", payload: snapshot.val()}) //: disPatch đẻ render lại
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export default getAuthorFromAccountDB