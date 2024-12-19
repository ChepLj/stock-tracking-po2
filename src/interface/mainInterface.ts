
export interface ITF_ImagesObject {
  image: string;
  hash: string;
  avatar?: boolean;
  webPath?: string;
}
export interface ITF_AttachmentsObject {
  fileName: string;
  URL: string;
}
export interface ITF_StoreObject {
  local: string;
  quantity: number;
  unit: "Cái" | "Bộ" | "Hộp" | "Cuộn" | "Thanh" | "Mét" | "Kg" | string;
}

//! Tạo interface cho Data
export interface ITF_ObjectData {
  id: string;
  code: number | string;
  title: string;
  subTitle: string;
  progressTag?: { [key: string]: ITF_ProgressTag };
  ref?: string;
  description: string;
  store: Array<ITF_StoreObject>;
  tag: Array<string>;
  note: string;
  icon: ITF_ImagesObject;
  images: Array<ITF_ImagesObject>;
  attachments?: Array<any>;
  author: string;
  authorId: string | number;
  dateCreated: number | string;
  logs: Array<any>;
  status: string;
  favorite: Array<string>;
  important: Array<string>;
  isPrivate: boolean;
  handelDetail?: Function;
  handelFavorite?: Function;
  handelImportant?: Function;
  handelEdit?: Function;
  handelPreDelete?: Function;
  handelUpLoad?: Function;
  handelCreate?: Function;
}
//! Tạo interface cho Data
export interface ITF_Data {
  id?: string;
  code: number;
  title: string;
  progressTag?: Array<ITF_ProgressTag>;
  ref?: string;
  subTitle: string;
  description: string;
  store: Array<ITF_StoreObject>;
  tag: Array<string>;
  note: string;
  icon: ITF_ImagesObject;
  images: Array<ITF_ImagesObject>;
  attachments?: Array<any>;
  author: string;
  authorId: string | number;
  dateCreated: number | string;
  logs?: Array<any>;
  status?: string;
  favorite?: Array<string>;
  important?: Array<string>;
  isPrivate?: boolean;
}

export interface ITF_UserPhoto {
  fileName: string;
  path?: string;
  webPath?: string;
  avatar: boolean;
}

//!
export interface ITF_UploadContainer {
  ref: string;
  data: any;
}

//!

export interface ITF_Status {
  ref: string;
  data: "pre-delete" | "lock" | "hidden" | "private" | "normal";
}
//!

export interface ITF_Logs {
  ref: string;
  data: {
    behavior: string;
    author: string;
    authorId: string | number;
    detail: string;
    item: string;
  };
}

export interface ITF_LogsPage {
  behavior: string;
  author: string;
  detail: string;
  item: string;
}

export interface ITF_State {
  type: string;
  payload: any;
}

export interface ITF_AuthorLogin {
  displayName: string;
  email: string;
  photoURL: string;
  provider: string;
  userName: any;
}

export interface ITF_FilterResult {
  user: string[];
  stock: string[];
  tag: string[];
  field: string[];
  personal: string[];
}

export interface ITF_ActionDisPatch {
  type: string;
  payload: object;
}

export interface ITF_ProgressTag {
  id: string;
  type: "Original" | "Temporary";
  ref?: string;
  area: string;
}
