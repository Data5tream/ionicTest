import React from 'react';

import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

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
}

const StoreList: React.FC<RootState> = ({ store, changeItemStatus }) => {
  const changeStatus = (entry: number, status: boolean): void => {
    changeItemStatus({ storeId: store.id, itemId: entry, itemValue: !status });
  };

  return (
    <IonCard style={{ width: '100%' }}>
      <IonCardContent>
        <IonList>
          {store.entries.map((entry, id) => <IonItem key={id}>
            <IonLabel>{entry.name}</IonLabel>
            <IonCheckbox checked={entry.done} onClick={(): void => changeStatus(id, entry.done)} />
          </IonItem>)}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
};

export default StoreList;
