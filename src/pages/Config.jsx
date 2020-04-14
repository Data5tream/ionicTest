import React from 'react';

import { connect } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonToggle } from '@ionic/react';

import './Tab1.css';

const Config = ({forceDarkmode, stores, toogleForceDarkmode}) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Force DarkMode</IonLabel>
            <IonToggle slot="end" checked={forceDarkmode} onIonChange={() => { toogleForceDarkmode(!forceDarkmode); }}></IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
  toogleForceDarkmode: value => dispatch({ type: 'SET_FORCE_DARKMODE', value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
