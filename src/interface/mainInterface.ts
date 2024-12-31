





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
    key?: string;
    description?: string;
    behavior: string;
    author?: string;
    authorId?: string | number;
    detail: string;

    timeStamp: string| number;
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

export interface ITF_MaterialObject {
  material: string;
  sLoc: string | number;
  description: string;
  quantity: string | number;
  unit: string;
  price: string| number;
  note: string;
  batch?: string;
  month?: string| number;
  year?: string | number;
  searchType?: string;
  quantityInStock: string|number;

}

export interface Material {
  material: string;
  description: string;
  quantity: number;
  price: number;
  unit: string;
  sLoc: string;
}

export interface GroupedMaterial {
  material: string;
  description: string;
  quantity: number;
  price: number;
  subtotal: number;
  unit: string;
}

export interface GroupedSLoc {
  sLoc: string;
  totalQuantity: number;
  totalPrice: number;
  materials: GroupedMaterial[];
}