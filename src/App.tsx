import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonToolbar,
  IonMenuToggle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { pricetag, settingsSharp } from 'ionicons/icons';

import { connect } from 'react-redux';

import Config from './pages/Config';
import Stores from './pages/Stores';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

interface AppProps {
  forceDarkmode: boolean;
  stores: Array<{name: string;}>;
  route: string;
}

const App: React.FC<AppProps> = ({ forceDarkmode, stores, route }) => {
  document.body.classList.toggle('dark', forceDarkmode || window.matchMedia('(prefers-color-scheme: dark)').matches);

  const checkColor = (routes: string) => routes === route ? 'tertiary' : '';

  return (
    <IonApp>
      <IonReactRouter>
        <IonMenu contentId="main" side="start">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Shopping Lists</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonMenuToggle>
              <IonList>
                {stores.map((store: {name: string;}, id: number) => (
                  <IonItem routerLink={`/store/${id}`} key={id} color={checkColor(`/store/${id}`)}>
                    <IonIcon icon={pricetag} slot="start" />
                    <IonLabel>{store.name}</IonLabel>
                  </IonItem>
                ))}
                <IonItem routerLink="/configuration" color={checkColor('/configuration')}>
                  <IonIcon icon={settingsSharp} slot="start" />
                  <IonLabel>Settings</IonLabel>
                </IonItem>
              </IonList>
            </IonMenuToggle>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route path="/store/:id" component={Stores} />
          <Route path="/configuration" component={Config} exact={true} />
          <Route path="/" render={() => <Redirect to="/store/0" />} exact={true} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps: any = (state: any) => state;

export default connect<AppProps>(mapStateToProps)(App);
