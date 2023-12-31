import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IMG_URL, weather_current_info} from "../store/weatherSlice.js";

const WeatherItem = ({item, id, length}) => {

    const setWeatherInfo = () => dispatch(weather_current_info({data: item}))
    const dispatch = useDispatch()

    useEffect(() => {
        if (id !== 0) return
        setWeatherInfo()
    }, []);

    const get_time = (str) => {
        const data = new Date(str)
        if (data.getMinutes() === 0) return `${data.getHours()}:${data.getMinutes()}0`
        return `${data.getHours()}:${data.getMinutes()}`
    }

    return (
        <button onClick={setWeatherInfo} className={`flex flex-col ${id === 0? 'rounded-l-2xl': 'border-l'} ${id === length-1? 'rounded-r-2xl': ''} p-3 hover:bg-gray-600 border-gray-600 justify-center items-center`}>
            <p className='font-bold'>
                {get_time(item.dt_txt)}
            </p>
            <img src={`${IMG_URL}${item.weather[0].icon}@2x.png`} alt=""/>
            <p className='text-xl font-bold'>
                {Math.round(item.main.temp)}°
            </p>
        </button>
    );
};

export default WeatherItem;
