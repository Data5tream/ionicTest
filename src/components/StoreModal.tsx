import React, { useState, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import {
  IonModal, IonInput, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonButton, IonGrid, IonRow, IonCol,
} from '@ionic/react';

interface StoreData {
  id: number;
  name: string;
  color: string;
}

interface RootState {
  showModal: boolean;
  setShowModal: Function;
  store: StoreData;
}

const mapState = (state: unknown, ownProps: RootState): {} => ({
  showModal: ownProps.showModal,
  setShowModal: ownProps.setShowModal,
  store: ownProps.store,
});
const mapDispatch = {
  saveStoreData: (value: StoreData): {} => ({ type: 'SAVE_STORE', value }),
  removeStoreData: (value: number): {} => ({ type: 'REMOVE_STORE', value }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootState

const StoreModal: React.FC<Props> = (props: Props) => {
  const [storeData, setStoreData] = useState<StoreData>(props.store);

  useEffect(() => {
    setStoreData(props.store);
  }, [props.store]);

  const saveStore: Function = () => {
    props.setShowModal(false);
    props.saveStoreData(storeData);
  };

  const removeStore: Function = (id: number) => {
    props.setShowModal(false);
    props.removeStoreData(id);
  };

  const changeName: Function = (name: string) => {
    setStoreData({ ...storeData, name });
  };

  return (
    <IonModal isOpen={props.showModal}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Edit store</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput value={storeData.name} placeholder="Store name" onIonChange={(e): void => changeName(e.detail.value!)} />
          <IonGrid>
            <IonRow class="ion-justify-content-between">
              <IonCol>
                <IonButton color="danger" onClick={(): void => removeStore(storeData.id)}>Delete</IonButton>
              </IonCol>
              <IonCol class="ion-text-end">
                <IonButton color="success" onClick={(): void => saveStore()}>Save</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default connector(StoreModal);
