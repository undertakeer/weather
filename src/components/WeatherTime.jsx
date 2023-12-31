import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import WeatherItem from "./WeatherItem.jsx";
import DayButtons from "./DayButtons.jsx";
import WeatherInfo from "./WeatherInfo.jsx";

const WeatherTime = (props) => {
    const weather = useSelector(state => state.weather.weather)
    const dayWeather = useSelector(state => state.weather.dayWeather)
    const allDate = []

    const weatherDate = () => {
        if (weather.length === 0) return
        let oldDate = ''
        weather.list.map((el, id) => {
            if (oldDate !== el.dt_txt.match(/\d\d\d\d-\d\d-\d\d/)[0]) {
                allDate.push({time: el.dt_txt.match(/\d\d\d\d-\d\d-\d\d/)[0], icon: el.weather[0].icon })
                oldDate = el.dt_txt.match(/\d\d\d\d-\d\d-\d\d/)[0]
            }
        })
        return allDate
    }


    return (
        <div className='flex flex-col items-center gap-20'>
            <div className='flex gap-3 w-[60dvw] justify-center flex-col'>
                <p className='text-2xl text-center text-gray-400'>{weather.name}</p>
                <div className='flex justify-center'>
                    <div className='text-white flex justify-center items-center bg-slate-700 rounded-2xl'>
                        {
                            dayWeather.map(((el, id) => {
                                return (
                                    <WeatherItem item={el} length={dayWeather.length} id={id} key={id} />
                                )
                            }))
                        }
                    </div>
                </div>
                <div className='text-white flex justify-center bg-slate-700 rounded-2xl'>
                    <WeatherInfo />
                </div>
            </div>
            <div className='flex gap-[6dvw] justify-center '>
                {
                    weatherDate()?.map((el, id) => {
                        return (
                            <DayButtons key={id} id={id} date={el.time} icon={el.icon} />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default WeatherTime;