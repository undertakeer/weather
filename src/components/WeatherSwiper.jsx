import {useSelector} from "react-redux";

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import 'swiper/css/autoplay'
import {Autoplay, Navigation, Virtual} from "swiper/modules";
import SwiperItem from "./SwiperItem.jsx";
// register Swiper custom elements
register();
const WeatherSwiper = () => {

    const coords = useSelector(state => state.weather.randomCoords)
    const randomIndex = useSelector(state => state.weather.random_index)

    return (
        <div className='py-10'>
            <div className='text-white p-2'>
                <swiper-container
                    modules={[Autoplay, Navigation]}
                    slides-per-view="1"
                    speed="1000"
                    className='w-[70dvw]'
                    autoplay-delay="4500"
                    loop="true"
                    css-mode="true"
                >
                    {randomIndex.map( (el, id) => {
                        return (
                            <swiper-slide key={id} >
                                <SwiperItem key={id} id={id} lat={coords[el].lat} lon={coords[el].lon} />
                            </swiper-slide>

                        )
                    })}
                </swiper-container>
            </div>
        </div>
    )
}

export default WeatherSwiper;