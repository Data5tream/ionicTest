import React, { useState, useEffect } from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton } from '@ionic/react';
import SwipeableViews from 'react-swipeable-views';

import StoreList from '../components/StoreList';
import { useHistory } from 'react-router';

interface RootState {
  stores: [{
    name: string;
    color: string;
    entries: Array<{
      name: string;
      done: boolean;
    }>;
  }];
  id: number;
  basePath: string;
}

interface OwnPropInterface {
  match: {
    params: {
      id: number;
    };
    path: string;
  };
}

const mapState = (state: RootState, ownProps: OwnPropInterface): {} => (
  { stores: state.stores, id: ownProps.match.params.id, basePath: ownProps.match.path }
);
const mapDispatch = {
  changeItemStatus: (value: {storeId: number; itemId: number; itemValue: boolean;}): {} => ({ type: 'CHANGE_ITEM_STATUS', value }),
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & RootState;

const StorePage: React.FC<Props> = (props: Props) => {
  const { stores, id, basePath, changeItemStatus } = props;
  const [currentTitle, setCurrentTitle] = useState(stores[0].name);
  const [currentSlide, setCurrentSlide] = useState(id);

  const his = useHistory();

  useEffect(() => {
    if (stores.length > currentSlide) {
      setCurrentTitle(stores[currentSlide].name);
    }
  }, [currentSlide, stores]);

  useEffect(() => {
    setCurrentSlide(Number(id));
  }, [id]);

  const updateIndex = (index: number): void => {
    setCurrentSlide(index);
    his.replace(`${basePath.replace(':id', '')}${index}`);
  };

  const storeContainer = (color: string): {} => ({
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    background: color,
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton menu="start" slot="start" />
          <IonTitle>{currentTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <SwipeableViews index={currentSlide} onChangeIndex={updateIndex} style={{ height: '100%' }} containerStyle={{ height: '100%' }}>
          {stores
            ? stores.map((store, i) => <div key={store.name} style={storeContainer(store.color)}>
              <StoreList store={{ ...store, id: i }} changeItemStatus={changeItemStatus} />
            </div>)
            : <div>No data available</div>}
        </SwipeableViews>
      </IonContent>
    </IonPage>);
};

export default connector(StorePage);
