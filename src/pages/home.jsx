import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {get_weather} from "../store/weatherSlice.js";
import WeatherTime from "../components/WeatherTime.jsx";
import Loading from "../components/Loading.jsx";

const home = () => {

    const weather = useSelector(state => state.weather.weather)
    const dispatch = useDispatch()

    useEffect(() => {
        const success = (pos) => {
            dispatch(get_weather({
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
            }))
        }
        const error = (err) => console.log(err)
        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

     return (
         <div>
             {weather.length === 0?
                 <p className='text-center text-3xl text-gray-500 font-bold '>ВВЕДИТЕ НАЗВАНИЕ СТРАНЫ</p>:
                 <div className='pb-16'>
                     <WeatherTime />
                 </div>
             }
         </div>
     )
}

export default home