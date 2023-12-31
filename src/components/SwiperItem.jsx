import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    change_day,
    get_weather,
    IMG_URL,
    oneDay_weather,
    set_active,
    weather_current_info
} from "../store/weatherSlice.js";
import Loading from "./Loading.jsx";
const SwiperItem = ({lat, lon, id}) => {



    const dispatch = useDispatch()
    const randomWeather = useSelector((state) => state.weather.randomWeather)

    const weather = useSelector(state => state.weather.weather)


    useEffect(() => {
        if (randomWeather.length >= 5) return
        dispatch(oneDay_weather({lat: lat, lon: lon}))
    }, []);

    const swiperClick = () => {
        dispatch(set_active({id: 0, search: true}))
        dispatch(get_weather({lat: lat, lon: lon}))
        setTimeout(() => {
            dispatch(change_day({dt: weather.list[0].dt_txt.match(/\d\d\d\d-\d\d-\d\d/)[0]}))
            dispatch(weather_current_info({data: null}))
        }, 1000)
    }

    const get_Time = (str) => {
        const dateObject = new Date(str);
        return [
            dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            dateObject.toLocaleDateString('en-US', { weekday: 'short' })
        ].join(', ');
    }

    return (
        <div onClick={swiperClick}>
            {randomWeather[id]?
                <div className='flex justify-center'>
                    <div className=' rounded-3xl gradient_pink p-4 flex w-[44dvw] flex-col gap-14'>
                        <div className='flex flex-col gap-7'>
                            <div className='flex gap-2 items-start text-xl'>
                                <p>{randomWeather[id].name}</p>
                                <img className='w-4 h-7' src="/location-icon.svg" alt=""/>
                            </div>
                            <div className='flex justify-center items-center gap-5 font-thin text-5xl'>
                                <img className='w-4' src="/temperature-icon.svg" alt=""/>
                                <p>
                                    {Math.round(randomWeather[id].main.temp)}℃
                                </p>
                                <img className='w-30' src={`${IMG_URL}${randomWeather[id].weather[0].icon}@2x.png`} alt=""/>
                            </div>
                            <div>{get_Time(randomWeather[id].time)}</div>
                        </div>
                        <div className='flex text-center justify-between px-10'>
                            <div>
                                <p>HUMIDITY</p>
                                <p>{randomWeather[id].main.humidity}</p>
                            </div>
                            <div>
                                <p>VISIBILITY</p>
                                <p>{Math.round(randomWeather[id].visibility/1000)}km</p>
                            </div>
                            <div>
                                <p>AIR PRESSURE</p>
                                <p>{Math.round(randomWeather[id].main.pressure)}hPa</p>
                            </div>
                            <div>
                                <p>WIND</p>
                                <p>{Math.round(randomWeather[id].wind.speed *3.6)} km/h</p>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className='flex justify-center'>
                    <Loading />
                </div>
            }
        </div>
    );
}

export default SwiperItem;