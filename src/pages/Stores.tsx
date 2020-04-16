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

interface SliderDataInterface {
  name: string;
  color: string;
  entries: Array<{
    name: string;
    done: boolean;
  }>;
}


interface SliderInterface {
  slideTo: Function;
  update: Function;
  getActiveIndex: Function;
}

const StorePage: React.FC<StorePageProps> = ({ stores, id, basePath }) => {
  const [currentTitle, setCurrentTitle] = useState(stores[0].name);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderData, setSliderData] = useState<Array<SliderDataInterface>>([]);
  const [slider, setSlider] = useState<SliderInterface>();

  const his = useHistory();

  const initSlider = function(this: SliderInterface): void {
    setSlider(this);
  };

  const slideChange = async function(this: SliderInterface): Promise<void> {
    const slide = await this.getActiveIndex();
    setCurrentSlide(slide);
    his.replace(`${basePath.replace(':id', '')}${slide}`);
  };

  useEffect(() => {
    if (sliderData.length > currentSlide) {
      setCurrentTitle(sliderData[currentSlide].name);
      (async (): Promise<void> => {
        if (slider && currentSlide !== await slider.getActiveIndex()) {
          slider.slideTo(currentSlide);
        }
      })();
    }
  }, [currentSlide, sliderData, slider]);

  useEffect(() => {
    setSliderData(stores);
  }, [stores, slider]);

  useEffect(() => {
    setCurrentSlide(id);
  }, [id]);

  useEffect(() => {
    if (slider) { slider.update(); }
  }, [slider, sliderData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton menu="start" slot="start" />
          <IonTitle>{currentTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSlides style={{ height: '100%' }} onIonSlidesDidLoad={initSlider} onIonSlideDidChange={slideChange}>
          {sliderData
            ? sliderData.map(store => <IonSlide key={store.name} style={{ background: store.color }}>
              <StoreList store={store} />
            </IonSlide>)
            : <IonSlide>No data available</IonSlide>}
        </IonSlides>
      </IonContent>
    </IonPage>);
};

interface OwnPropInterface {
  match: {
    params: {
      id: number;
    };
    path: string;
  };
}

const mapStateToProps = (state: StorePageProps, ownProps: OwnPropInterface): {} => (
  { stores: state.stores, id: ownProps.match.params.id, basePath: ownProps.match.path }
);

export default connect(mapStateToProps)(StorePage);
