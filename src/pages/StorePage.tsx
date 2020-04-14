import React from 'react';

import { connect } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

interface StorePageProps {
  store: {
    name: string;
    entries: Array<{
      name: string;
      done: boolean;
    }>;
  };
}

const StorePage: React.FC<StorePageProps> = ({ store }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{store.name}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        {store.entries.map((entry, id) => <IonItem key={id}>
          <IonLabel>{entry.name}</IonLabel>
          <IonCheckbox checked={entry.done} />
        </IonItem>)}
      </IonList>
    </IonContent>
  </IonPage>
);

const mapStateToProps: any = (state: any, ownProps: any) => ({
  store: state.stores[ownProps.match.params.id],
});

const mapDispatchToProps: any = (dispatch: any) => ({
  toogleForceDarkmode: (value: boolean) => dispatch({ type: 'SET_FORCE_DARKMODE', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
