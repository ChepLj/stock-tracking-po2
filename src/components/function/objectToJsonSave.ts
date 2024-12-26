import { saveAs } from "file-saver";
import firebaseGetMainData from "../../firebase/api/getData";

export function saveObjectAsJson() {
  const callback = (result: any) => {
    if (result.payload) {
      const jsonBlob = new Blob([JSON.stringify(result.payload, null, 2)], { type: "application/json" });
      const date = new Date();
      saveAs(jsonBlob, `Pomina3 Stock Tracking-${date.toDateString()}.json`);
    }
  };
  firebaseGetMainData("/", callback);
}
