import React from 'react';

import { connect } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonCheckbox } from '@ionic/react';

const StorePage = ({ store }) => {
  return (
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
};

const mapStateToProps = (state, ownProps) => ({
  store: state.stores[ownProps.match.params.id],
});

const mapDispatchToProps = dispatch => ({
  toogleForceDarkmode: value => dispatch({ type: 'SET_FORCE_DARKMODE', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StorePage);
