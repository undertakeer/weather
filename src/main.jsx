import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux";
import store from "./store/index.js";
import NavBar from "./components/NavBar.jsx";
import WeatherSwiper from "./components/WeatherSwiper.jsx";
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
  <Provider store={store}>
      <div className='bg-main-bg pl-7 pr-7 min-w-max-[100dvw] min-h-[100dvh]'>
          <NavBar />
          <WeatherSwiper />
          <App />
      </div>
  </Provider>,
)
