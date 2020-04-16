import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonMenuButton } from '@ionic/react';

import StoreList from '../components/StoreList';
import { useHistory } from 'react-router';

interface StorePageProps {
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

const StorePage: React.FC<StorePageProps> = ({ stores, id, basePath }) => {
  const [currentTitle, setCurrentTitle] = useState(stores[0].name);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slider, setSlider] = useState<any>();

  const his = useHistory();

  const sliderOptions = {
    on: {
      beforeInit(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const slider: any = this;
        setSlider(slider);
      },
      slideChange(): void {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const slider: any = this;
        setCurrentSlide(slider.activeIndex);
        his.replace(`${basePath.replace(':id', '')}${slider.activeIndex}`);
      },
    },
  };

  useEffect(() => {
    if (stores.length > currentSlide) {
      setCurrentTitle(stores[currentSlide].name);
      if (slider && currentSlide !== slider.activeIndex) {
        slider.slideTo(currentSlide);
      }
    }
  }, [currentSlide, stores, slider]);

  useEffect(() => {
    setCurrentSlide(id);
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton menu="start" slot="start" />
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

const mapStateToProps: any = (state: any, ownProps: any) => (
  { stores: state.stores, id: ownProps.match.params.id, basePath: ownProps.match.path }
);

export default connect(mapStateToProps)(StorePage);
