import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, settingsSharp } from 'ionicons/icons';

import { connect } from 'react-redux';

import Config from './pages/Config';
import StorePage from './pages/StorePage';

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

const App = ({ forceDarkmode, stores }) => {
  document.body.classList.toggle('dark', forceDarkmode || window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/store/:id" component={StorePage} />
            <Route path="/configuration" component={Config} exact={true} />
            <Route path="/" render={() => <Redirect to="/store/0" />} exact={true} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {stores.map((store, id) => <IonTabButton key={id} tab="store" href={`/store/${id}`}>
              <IonIcon icon={ellipse} />
              <IonLabel>{store.name}</IonLabel>
            </IonTabButton>)}
            <IonTabButton tab="configuration" href="/configuration">
              <IonIcon icon={settingsSharp} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = state => {
  const { forceDarkmode, stores } = state;
  return { forceDarkmode, stores };
};

export default connect(mapStateToProps)(App);
