import { ITF_AuthorLogin } from "../../interface/mainInterface";

export function checkLevelAcc(authorLogin: ITF_AuthorLogin) {
  if (authorLogin?.level === "admin") {
    return true;
  }
  return false;
}
