import React, { useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem,
  IonLabel, IonToggle, IonItemDivider, IonReorderGroup, IonReorder, IonFab,
  IonFabButton, IonIcon, IonMenuButton,
} from '@ionic/react';
import { ItemReorderEventDetail } from '@ionic/core';
import { addOutline } from 'ionicons/icons';

import StoreModal from '../components/StoreModal';

interface ConfigProps {
  forceDarkmode: boolean;
  stores: Array<{name: string;}>;
  toogleForceDarkmode: Function;
  changeStoreOrder: Function;
}

interface RootState {
  forceDarkmode: boolean;
  stores: Array<{name: string;}>;
}

const mapState = (state: RootState): {} => state;
const mapDispatch = {
  toogleForceDarkmode: (value: boolean): {} => ({ type: 'SET_FORCE_DARKMODE', value }),
  changeStoreOrder: (value: Array<number>): {} => ({ type: 'CHANGE_STORE_ORDER', value }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootState;

const Config: React.FC<Props> = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { forceDarkmode, stores, toogleForceDarkmode, changeStoreOrder } = props;

  const toggleDarkmode: Function = () => {
    toogleForceDarkmode(!forceDarkmode);
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
            <IonToggle slot="end" checked={forceDarkmode} onIonChange={(): void => toggleDarkmode()}></IonToggle>
          </IonItem>
          <IonItemDivider>
            <IonLabel>Stores</IonLabel>
          </IonItemDivider>
          <IonReorderGroup disabled={false} onIonItemReorder={(e): void => onReorder(e)}>
            {stores.map(store => (
              <IonItem key={store.name}>
                <IonLabel>{store.name}</IonLabel>
                <IonReorder slot="end" />
              </IonItem>
            ))}
          </IonReorderGroup>
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={(): void => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
        <StoreModal showModal={showModal} setShowModal={setShowModal} />
      </IonContent>
    </IonPage>
  );
};

export default connector(Config);
