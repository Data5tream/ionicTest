import React from 'react';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { pricetag, settingsSharp } from 'ionicons/icons';

import { useLocation } from 'react-router';
import { connect } from 'react-redux';

import './Menu.css';

interface MenuProps {
  stores: Array<{name: string;}>;
}

const Menu: React.FC<MenuProps> = ({ stores }) => {
  const loc = useLocation();

  return (
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
              <IonItem routerLink={`/store/${id}`} key={id} className={loc.pathname === `/store/${id}` ? 'active' : ''}>
                <IonIcon icon={pricetag} slot="start" />
                <IonLabel>{store.name}</IonLabel>
              </IonItem>
            ))}
            <IonItem routerLink="/configuration" className={loc.pathname === '/configuration' ? 'active' : ''}>
              <IonIcon icon={settingsSharp} slot="start" />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonList>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>);
};

const mapStateToProps: any = (state: any) => ({ stores: state.stores });

export default connect<MenuProps>(mapStateToProps)(Menu);
