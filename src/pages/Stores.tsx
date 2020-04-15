import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide } from '@ionic/react';

import StoreList from '../components/StoreList';

interface StorePageProps {
  stores: [{
    name: string;
    color: string;
    entries: Array<{
      name: string;
      done: boolean;
    }>;
  }];
}

const StorePage: React.FC<StorePageProps> = ({ stores }) => {
  const [currentTitle, setCurrentTitle] = useState(stores[0].name);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderOptions = {
    on: {
      slideChange(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const slider: any = this;
        setCurrentSlide(slider.activeIndex);
      },
    },
  };

  useEffect(() => {
    setCurrentTitle(stores[currentSlide].name);
  }, [currentSlide]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{currentTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides options={sliderOptions} style={{ height: '100%' }} pager={(stores.length < 0)}>
          {stores.map(store => (
            <IonSlide key={store.name} style={{ background: store.color }}>
              <StoreList store={store} />
            </IonSlide>
          ))}
        </IonSlides>
      </IonContent>
    </IonPage>);
};

const mapStateToProps: any = (state: any, ownProps: any) => ({ stores: state.stores });

export default connect(mapStateToProps)(StorePage);
