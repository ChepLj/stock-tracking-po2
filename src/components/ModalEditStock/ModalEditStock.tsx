import React, { useState } from 'react';
import { IonButtons, IonButton, IonModal, IonHeader, IonContent, IonToolbar, IonTitle, IonPage, IonItem, IonLabel, IonList, IonText, IonNote } from '@ionic/react';

function ModalEditStock({isModalOpen, setIsModalOpen}:{isModalOpen:any; setIsModalOpen:Function}) {


  return (
    <IonModal isOpen={isModalOpen.isOpen} onWillDismiss={()=>setIsModalOpen({isOpen: false, value: ''})}>
        
          <IonHeader>
            <IonToolbar>
              <IonTitle><i>Edit</i> <strong>{isModalOpen?.value?.material}</strong> <i>Stock</i> <strong>{isModalOpen?.value?.sLoc}</strong></IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setIsModalOpen({isOpen: false, value: ''})}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
                <IonItem>
                    <IonLabel>Description</IonLabel>
                    <IonText>{isModalOpen?.value?.description}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel>Quantity</IonLabel>
                    <IonText>{isModalOpen?.value?.quantity}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel>Unit</IonLabel>
                    <IonText>{isModalOpen?.value?.unit}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel>Price</IonLabel>
                    <IonText>{isModalOpen?.value?.price} VNĐ</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel>Batch</IonLabel>
                    <IonText>{isModalOpen?.value?.batch}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel>Note</IonLabel>
                    <IonText>{isModalOpen?.value?.note}</IonText>
                </IonItem>
            </IonList>
            <IonToolbar>
                <IonButton color='danger'>Xóa vật tư này</IonButton>
                {/* <IonButton color='medium' fill='outline'>Hủy bỏ</IonButton> */}
                <IonButton slot='end' color='success'>Cập Nhật</IonButton>
            </IonToolbar>
            <br/>
            <IonNote>ở tác vụ xóa, vật tư sẽ không được xóa hoàn toàn mà sẽ chuyển vào thùng rác !!!</IonNote>
          </IonContent>
        </IonModal>
  );
}

export default ModalEditStock;