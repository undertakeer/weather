import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



const WEATHER_KEY = 'ac7b27735c1b2da61eb085d2cff54732'
const COORDS_KEY = 'a595e48647e441829d52506a8891e288'
const COORDS_URL = 'https://api.opencagedata.com/geocode/v1/json?'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/'
export const IMG_URL = 'https://openweathermap.org/img/wn/'

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: [],
        active: {id: 0, search: false},
        dayWeather: [],
        weatherInfo: {},
        randomWeather: [],
        randomCoords: [
            {lat: 36, lon: 140},
            {lat: 41, lon: -74},
            {lat: 49, lon: 2},
            {lat: 52, lon: 0},
            {lat: 25, lon: 55},
            {lat: 42, lon: 12},
            {lat: 14, lon: 100},
            {lat: 41, lon: 2},
            {lat: 38, lon: -122},
            {lat: -23, lon: -43},
            {lat: 31, lon: 121},
            {lat: 41, lon: 29},
            {lat: 52, lon: 13},
            {lat: 55, lon: 37},
            {lat: -34, lon: 18},
            {lat: 1, lon: 103},
            {lat: 35, lon: 135},
            {lat: 43, lon: -79},
            {lat: 19, lon: -99},
            {lat: -34, lon: 151},
        ],
        random_index: [
            Math.round(Math.random(0) * 19),
            Math.round(Math.random(0) * 19),
            Math.round(Math.random(0) * 19),
            Math.round(Math.random(0) * 19),
            Math.round(Math.random(0) * 19),
        ]
    },
    reducers: {
        change_day(state, action) {
            const newArr = []
            state.weather.list.map((el, id) => {
                if (el.dt_txt.includes(action.payload.dt)) {
                    newArr.push(el)
                }
            })
            state.dayWeather = newArr
        },
        set_active(state, action) {
            state.active = action.payload
        },
        weather_current_info(state, action) {
            if (action.payload.data === null) {
                state.weatherInfo = state.dayWeather[0]
            } else {
                state.weatherInfo = action.payload.data
            }

        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(get_weather.fulfilled, (state, action) => {
                state.weather = action.payload
            })

            .addCase(get_weather.rejected, (state, action) => {
                console.log(action.error)
            })

            .addCase(oneDay_weather.fulfilled, (state, action) => {
                state.randomWeather.push(action.payload)
            })

            .addCase(oneDay_weather.rejected, (state, action) => {
                console.log(action.error)
            })

    },
})

export default weatherSlice.reducer
export const {change_day, set_active, weather_current_info} = weatherSlice.actions

export const get_weather = createAsyncThunk('weather/weatherCords',
    async function (action) {
        let res = {}
        let lat = action.lat || null
        let lon = action.lon || null

        if (action.country) {
            res = (await axios.get(`${COORDS_URL}q=${action.country}&key=${COORDS_KEY}`)).data
            lat = Math.round(res.results[0].geometry.lat)
            lon = Math.round(res.results[0].geometry.lng)
        } else {
            res = (await axios.get(`${COORDS_URL}q=${action.lat}+${action.lon}&key=${COORDS_KEY}`)).data
        }

        const data = (await axios.get(`${WEATHER_URL}forecast?units=metric&lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`)).data
        data.name = res.results[0].annotations.timezone.name

        return data

    }
)
export const oneDay_weather = createAsyncThunk('weather/oneDayWeather',
    async (action) => {
        const res = (await axios.get(`${COORDS_URL}q=${action?.lat}+${action?.lon}&key=${COORDS_KEY}`)).data
        const data = (await axios.get(`${WEATHER_URL}weather?units=metric&lat=${action?.lat}&lon=${action?.lon}&appid=${WEATHER_KEY}`)).data
        data.name = res.results[0].annotations.timezone.name
        data.time = res.timestamp.created_http
        return data
    })



