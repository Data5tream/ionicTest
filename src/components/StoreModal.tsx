import React, { useState } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import {
  IonModal, IonInput, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonButton, IonGrid, IonRow, IonCol,
} from '@ionic/react';

interface RootState {
  showModal: boolean;
  setShowModal: Function;
}

const mapState = (state: unknown, ownProps: RootState): {} => ({
  showModal: ownProps.showModal,
  setShowModal: ownProps.setShowModal,
});
const mapDispatch = {
  addNewStore: (value: string): {} => ({ type: 'ADD_NEW_STORE', value }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootState

const StoreModal: React.FC<Props> = (props: Props) => {
  const [storeName, setStoreName] = useState<string>('');

  const saveNewStore: Function = () => {
    props.setShowModal(false);
    props.addNewStore(storeName);
    setStoreName('');
  };

  return (
    <IonModal isOpen={props.showModal}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Add a new store</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput value={storeName} placeholder="Store name" onIonChange={(e): void => setStoreName(e.detail.value!)} />
          <IonGrid>
            <IonRow class="ion-justify-content-between">
              <IonCol>
                <IonButton color="danger" fill="outline" onClick={(): void => props.setShowModal(false)}>Close</IonButton>
              </IonCol>
              <IonCol class="ion-text-end">
                <IonButton color="success" onClick={(): void => saveNewStore()}>Save</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </IonModal>
  );
};

export default connector(StoreModal);
