import React, { useState } from 'react';

import { connect } from 'react-redux';

import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonToggle, IonItemDivider, IonReorderGroup, IonReorder, IonFab,
  IonFabButton, IonIcon, IonModal, IonInput, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonButton, IonGrid, IonRow, IonCol, IonMenuButton,
} from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { addOutline } from 'ionicons/icons';

interface ConfigProps {
  forceDarkmode: boolean;
  stores: Array<{name: string;}>;
  toogleForceDarkmode: Function;
  addNewStore: Function;
  changeStoreOrder: Function;
}

const Config: React.FC<ConfigProps> = ({ forceDarkmode, stores, toogleForceDarkmode, addNewStore, changeStoreOrder }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string>('');

  const toggleDarkmode: Function = () => {
    toogleForceDarkmode(!forceDarkmode);
  };

  const saveNewStore: Function = () => {
    setShowModal(false);
    addNewStore(storeName);
    setStoreName('');
  };

  const onReorder: Function = (event: CustomEvent<ItemReorderEventDetail>) => {
    changeStoreOrder([event.detail.from, event.detail.to]);
    event.detail.complete();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton menu="start" slot="start" />
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Force DarkMode</IonLabel>
            <IonToggle slot="end" checked={forceDarkmode} onIonChange={() => toggleDarkmode()}></IonToggle>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Stores</IonLabel>
          </IonItemDivider>
          <IonReorderGroup disabled={false} onIonItemReorder={e => onReorder(e)}>
            {stores.map(store => (
              <IonItem key={store.name}>
                <IonLabel>{store.name}</IonLabel>
                <IonReorder slot="end" />
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <IonModal isOpen={showModal}>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Add a new store</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput value={storeName} placeholder="Store name" onIonChange={e => setStoreName(e.detail.value!)} />
              <IonGrid>
                <IonRow class="ion-justify-content-between">
                  <IonCol>
                    <IonButton color="danger" fill="outline" onClick={() => setShowModal(false)}>Close</IonButton>
                  </IonCol>
                  <IonCol class="ion-text-end">
                    <IonButton color="success" onClick={() => saveNewStore()}>Save</IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps: any = (state: any) => state;
const mapDispatchToProps: any = (dispatch: any) => ({
  toogleForceDarkmode: (value: boolean) => dispatch({ type: 'SET_FORCE_DARKMODE', value }),
  addNewStore: (value: string) => dispatch({ type: 'ADD_NEW_STORE', value }),
  changeStoreOrder: (value: Array<number>) => dispatch({ type: 'CHANGE_STORE_ORDER', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
