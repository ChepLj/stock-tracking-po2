import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import { saveObjectAsJson } from "./objectToJsonSave";

export const backupDataActionSheet = async () => {
  const result = await ActionSheet.showActions({
    title: `Bạn có muốn tải 1 bản sao dữ liệu trước khi cập nhật không ?`,
    message: `Bạn có muốn tải 1 bản sao dữ liệu trước khi cập nhật không ?`,
    options: [
      {
        title: "Có ! Tải 1 bản sao",
        style: ActionSheetButtonStyle.Destructive,
      },
      {
        title: "Không cần",
        style: ActionSheetButtonStyle.Cancel,
      },
    ],
  });
  if (result.index === 0) {
    saveObjectAsJson();
  }
};
