import React, { useState } from 'react';

import {
  IonModal, IonInput, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonButton, IonGrid, IonRow, IonCol,
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
    <IonModal isOpen={showModal}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Add a new item</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput value={itemName} placeholder="Item name..." onIonChange={(e): void => setItemName(e.detail.value!)} />
          <IonGrid>
            <IonRow class="ion-justify-content-between">
              <IonCol>
                <IonButton color="danger" fill="outline" onClick={(): void => setShowModal(false)}>Close</IonButton>
              </IonCol>
              <IonCol class="ion-text-end">
                <IonButton color="success" onClick={(): void => saveNewItem()}>Save</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default AddItemModal;
