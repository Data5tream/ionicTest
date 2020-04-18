import React, { useState } from 'react';

import {
  IonModal, IonInput, IonButton, IonGrid, IonRow, IonCol, IonHeader, IonTitle, IonContent, IonToolbar,
} from '@ionic/react';

interface RootState {
  showModal: boolean;
  setShowModal: Function;
  storeId: number;
  addItem: Function;
}

const AddItemModal: React.FC<RootState> = ({ showModal, setShowModal, storeId, addItem }) => {
  const [itemName, setItemName] = useState<string>('');

  const saveNewItem: Function = () => {
    setShowModal(false);
    addItem({ storeId, itemName });
    setItemName('');
  };

  return (
    <IonModal isOpen={showModal} onWillDismiss={() => setShowModal(false)}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add a new item</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonInput value={itemName} placeholder="Item name..." onIonChange={(e): void => setItemName(e.detail.value!)} />
            </IonCol>
          </IonRow>
          <IonRow class="ion-justify-content-between">
            <IonCol>
              <IonButton color="danger" fill="outline" onClick={(): void => setShowModal(false)}>Close</IonButton>
            </IonCol>
            <IonCol class="ion-text-end">
              <IonButton color="success" onClick={(): void => saveNewItem()}>Save</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
};

export default AddItemModal;
