import { ref, remove } from "firebase/database";
import { database } from "../firebaseConfig";


function firebaseDeleteData (childRef:any, disPatch:any){
   const mainRef = ref(database, childRef)
   remove(mainRef).then((snapshot) => {
    console.log(snapshot);
    disPatch('remove successfully!')
  }).catch((error) => {
    console.error(error);
    disPatch('remove failure!')

  });
}

export default firebaseDeleteData