import { actionSheetController } from '@ionic/core';
import '../../App.css'

export async function showActionSheet(header: string,textCommand: string, handlerConfirm: Function) {
  const actionSheet = await actionSheetController.create({
    header: header,
    buttons: [
     
      {
        text: textCommand,
        role: 'destructed', 
        
        handler: () => {
            handlerConfirm()
        },
      },
      {
        text: 'Cancel',
        role: 'cancel', // Automatically dismisses the action sheet
      },
    ],
  });

  await actionSheet.present();
}
