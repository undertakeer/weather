import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {change_day, IMG_URL, set_active, weather_current_info} from "../store/weatherSlice.js";

const DayButtons = ({date, id, icon}) => {

    const active = useSelector(state => state.weather.active)
    const dispatch = useDispatch()
    const changeDay = () => {
        dispatch(set_active({id: id, search: false}))
        dispatch(change_day({dt: date}))
        dispatch(weather_current_info({data: null}))
    }

    useEffect(() => {
        if (id === 0) dispatch(change_day({dt: date}))
    }, []);




    const get_data = (str) => new Date(str).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })

    const get_day = (str) => new Date(str).toLocaleDateString('en-US', { weekday: 'long' })


    return (
        <div>
            {active.id === id?
                <button onClick={changeDay} className='weather_button-active'>
                    <p>{get_data(date)}</p>
                    <p>{get_day(date)}</p>
                    <img className='w-20' src={`${IMG_URL}${icon}@2x.png`} alt=""/>
                </button>
                :
                <button onClick={changeDay} className='weather_button '>
                    <p>{get_data(date)}</p>
                    <p>{get_day(date)}</p>
                    <img className='w-20' src={`${IMG_URL}${icon}@2x.png`} alt=""/>
                </button>
            }

        </div>
    );
};

export default DayButtons;
