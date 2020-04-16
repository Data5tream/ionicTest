import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { connect, ConnectedProps } from 'react-redux';

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSlides, IonSlide, IonMenuButton } from '@ionic/react';

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
  getSwiper: Function;
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
    if (slider) {
      (async (): Promise<void> => {
        /* IonSlides component is bugged and doesn't allow dynamic slides.
           Add slides without content to swiper and then populate them with
           ReactDOM.render()
           https://github.com/ionic-team/ionic/issues/18784 */
        const swiper = await slider.getSwiper();
        swiper.removeAllSlides();
        swiper.appendSlide(sliderData.map(ele => ReactDOMServer.renderToString(
          <IonSlide key={ele.name} style={{ background: ele.color }} suppressHydrationWarning={true} />)));
        swiper.updateSlides();
        const slides = document.querySelectorAll('ion-slide');
        sliderData.forEach((ele, i) => {
          ReactDOM.render(<StoreList store={{ ...ele, id: i }} changeItemStatus={changeItemStatus} />, slides[i]);
        });
      })();
    }
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
            ? sliderData.map((store, i) => <IonSlide key={store.name} style={{ background: store.color }}>
              <StoreList store={{ ...store, id: i }} changeItemStatus={changeItemStatus} />
            </IonSlide>)
            : <IonSlide>No data available</IonSlide>}
        </IonSlides>
      </IonContent>
    </IonPage>);
};

export default connector(StorePage);
