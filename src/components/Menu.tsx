import React from 'react';

import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuToggle, IonList, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { pricetag, settingsSharp } from 'ionicons/icons';

import { useLocation } from 'react-router';
import { connect } from 'react-redux';

import './Menu.css';

interface MenuProps {
  stores: Array<{name: string; color: string;}>;
}

const Menu: React.FC<MenuProps> = ({ stores }) => {
  const loc = useLocation();

  const checkRoute = (route: string): string => loc.pathname === route ? 'active' : '';

  return (
    <IonMenu contentId="main" side="start">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Shopping Lists</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          {stores.map((store: {name: string; color: string;}, id: number) => (
            <IonMenuToggle key={id} autoHide={false}>
              <IonItem routerLink={`/store/${id}`} className={checkRoute(`/store/${id}`)} style={{ '--store-color': store.color }}>
                <IonIcon icon={pricetag} slot="start" />
                <IonLabel>{store.name}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
          <IonMenuToggle autoHide={false}>
            <IonItem routerLink="/configuration" className={checkRoute('/configuration')}>
              <IonIcon icon={settingsSharp} slot="start" />
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>);
};

const mapStateToProps = (state: MenuProps): MenuProps => state;

export default connect(mapStateToProps)(Menu);
