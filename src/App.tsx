import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { connect } from 'react-redux';

import Config from './pages/Config';
import Stores from './pages/Stores';

import Menu from './components/Menu';

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
}

const App: React.FC<AppProps> = ({ forceDarkmode }) => {
  document.body.classList.toggle('dark', forceDarkmode || window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <IonApp>
      <IonReactRouter>
        <Menu />
        <IonRouterOutlet id="main" animated={false}>
          <Route path="/store/:id" component={Stores} />
          <Route path="/configuration" component={Config} exact={true} />
          <Route path="/" render={() => <Redirect to="/store/0" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

const mapStateToProps = (state: AppProps): AppProps => state;

export default connect(mapStateToProps)(App);
