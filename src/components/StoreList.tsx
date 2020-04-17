import React, { useState } from 'react';

import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton } from '@ionic/react';
import { trash, addOutline } from 'ionicons/icons';
import TouchIsolator from './TouchIsolator';
import AddItemModal from './AddItemModal';

interface RootState {
  store: {
    id: number;
    name: string;
    color: string;
    entries: Array<{
      name: string;
      done: boolean;
    }>;
  };
  changeItemStatus: Function;
  deleteItem: Function;
  addItem: Function;
}

const StoreList: React.FC<RootState> = ({ store, changeItemStatus, deleteItem, addItem }) => {
  const [showModal, setShowModal] = useState(false);

  const changeStatus = (entry: number, status: boolean): void => {
    changeItemStatus({ storeId: store.id, itemId: entry, itemValue: !status });
  };

  const deleteEntry = (entry: number): void => {
    deleteItem({ storeId: store.id, itemId: entry });
  };

  return (
    <IonCard style={{ width: '100%' }}>
      <IonCardContent style={{ marginBottom: '60px' }}>
        <TouchIsolator>
          <IonList>
            {store.entries.map((entry, id) => <IonItemSliding key={id}>
              <IonItem>
                <IonLabel>{entry.name}</IonLabel>
                <IonCheckbox checked={entry.done} onClick={(): void => changeStatus(id, entry.done)} />
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption color="danger">
                  <IonIcon slot="icon-only" icon={trash} onClick={(): void => deleteEntry(id)} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>)}
          </IonList>
        </TouchIsolator>
        <IonFab horizontal="center">
          <IonFabButton size="small" color="secondary" onClick={(): void => setShowModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonCardContent>
      <AddItemModal storeId={store.id} addItem={addItem} showModal={showModal} setShowModal={setShowModal} />
    </IonCard>
  );
};

export default StoreList;
