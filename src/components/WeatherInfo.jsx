import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Loading from "./Loading.jsx";

const WeatherInfo = () => {
    const info = useSelector(state => state.weather.weatherInfo)


    return (
        <div>
            <div>
                {info.weather ?
                    <div className='flex py-3 gap-10 text-center justify-center '>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Temp</p>
                            <p className='text-md font-bold'>{Math.round(info?.main?.temp)}</p>
                        </div>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Humidity</p>
                            <p className='text-md font-bold'>{info?.main?.humidity}</p>
                        </div>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Visibility</p>
                            <p className='text-md font-bold'>{Math.round(info?.visibility/1000)}km</p>
                        </div>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Air Pressure</p>
                            <p className='text-md font-bold'>{Math.round(info?.main?.pressure)}hPa</p>
                        </div>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Wind</p>
                            <p className='text-md font-bold'>{Math.round(info?.wind?.speed *3.6)} km/h</p>
                        </div>
                        <div>
                            <p className='text-gray-400 text-2xl font-bold'>Main weather</p>
                            <p className='text-md font-bold'>{info?.weather[0]?.description}</p>
                        </div>

                    </div> :
                    <div className='flex justify-center'>
                        <Loading/>
                    </div>}
            </div>
        </div>
    );
};

export default WeatherInfo;
