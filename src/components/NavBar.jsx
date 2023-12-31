import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {change_day, get_weather, set_active, weather_current_info} from "../store/weatherSlice.js";


const NawBar = () => {

    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weather.weather)


    const searchCoords = (event) => {
        event.preventDefault()
        dispatch(set_active({id: 0, search: true}))
        dispatch(get_weather({country: country}))
        setTimeout(() => {
            dispatch(change_day({dt: weather.list[0].dt_txt.match(/\d\d\d\d-\d\d-\d\d/)[0]}))
            dispatch(weather_current_info({data: null}))
        }, 1000)
    }

    return (
        <div className=' text-white p-3 rounded-xl '>
            <ul className='flex items-end justify-between'>
                <li className='flex items-end'>
                    <img className='w-20 h-20' src="/logo.png" alt=""/>
                    <div className='text-5xl'>
                        Weather
                    </div>
                </li>
                <li>
                    <form action="" onSubmit={searchCoords} className='relative flex items-center mx-auto focus:border-black gap-3 bg-gray-300 rounded-2xl'>
                        <img className='w-6 absolute top-3 left-3 ' src="/loop.svg" alt=""/>
                        <input onChange={(e)=> setCountry(e.currentTarget.value)} type="text" className=' focus:ring-0 text-black p-3 pl-10 rounded-xl focus:outline-none w-[35dvw] bg-gray-300 ' placeholder='search loacation...' />
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 h-10 mr-2 rounded-xl">
                            Button
                        </button>
                    </form>
                </li>
                <li className='flex gap-8 text-2xl font-thin pb-2 '>
                    <div className='underline-animation'>Today</div>
                    <div className='underline-animation'>Contact</div>
                    <div className='underline-animation'>Five Day</div>
                </li>
            </ul>
        </div>
    )
}

export default NawBar