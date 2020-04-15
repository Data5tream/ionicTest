import React from 'react';

import { IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

interface StoreListProps {
  store: {
    name: string;
    color: string;
    entries: Array<{
      name: string;
      done: boolean;
    }>;
  };
}

const StoreList: React.FC<StoreListProps> = ({ store }) => (
  <IonCard style={{ width: '100%' }}>
    <IonCardContent>
      <IonList>
        {store.entries.map((entry, id) => <IonItem key={id}>
          <IonLabel>{entry.name}</IonLabel>
          <IonCheckbox checked={entry.done} />
        </IonItem>)}
      </IonList>
    </IonCardContent>
  </IonCard>
);

export default StoreList;
