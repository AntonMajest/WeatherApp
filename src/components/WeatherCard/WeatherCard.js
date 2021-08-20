import './WeatherCard.css'
import { useTranslation } from 'react-i18next'
import { deletePost as deletePostAction} from '../../redux/modules/posts';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Chart from '../Chart/Chart'

 function  WeatherCard({ deletePost,id,card, currentDate,chart }) {
   const { t } = useTranslation()
   const [temp, setTemp ] = useState(1)
    
 
  return (
   <div className="card-wrapper">
        <div className="title-icon">

             <div className="title-icon-city">
               <div className="title-icon__city">
                    {`${card.name}, ${card.sys.country  }`}
               </div>
               <div className="title-icon__date">
                    {currentDate}
               </div>
             </div>
             
             <div className="title-icon__icon">
                  <img className="icon" src={`http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`} alt=""/>
                  <div>{card.weather[0].main}</div>
                  <div>
                  <button className="delete-button" onClick={() => deletePost(id)}>x</button>
                  </div>
                  
             </div>
        </div>
        <div>
        { <Chart chart={chart}/> }  
        </div>
       
        <div className="characters">
        <div >
             <div className="character-temp">
                   <b> {card.main.temp ? <span>+</span> : <span>-</span>} {temp ? Math.round(card.main.temp - 273) :  (Math.round(card.main.temp - 273) * 9/5) + 32   } </b>
                   <sup>{temp ? <b onClick={() => {setTemp(1)}}>&deg;C</b> : <span onClick={() => {setTemp(1)}}>&deg;C</span>   }  
                   | 
                   {temp ? <span onClick={() => {setTemp(0)}}>&deg;F</span> : <b onClick={() => {setTemp(0)}}>&deg;F</b>    }</sup> 
             </div>
             
             <div className={"gray-color"}>
             {t('feel_like')}: {card.main.temp ? <span>+</span> : <span>-</span>} {temp ? Math.round(card.main.temp - 273) :  (Math.round(card.main.temp - 273) * 9/5) + 32    } 
                   <sup>{temp ? <span>&deg;C</span> : <span >&deg;F</span>   }</sup>  
             </div>
        </div>
        <div className={"character-other"}>
        <div >
                  {t('Wind')}: <span className={"prop"}>{card.wind.speed  } m/s</span> 
             </div>
             <div>
             {t('Humidity')}: <span className={"prop"}>{card.main.humidity }%</span>
             </div>
             <div>
             {t('Pressure')}: <span className={"prop"}>{card.main.pressure }Pa</span>
             </div>
        </div>
             
        </div>
       
   </div>
  );
}


export default connect(
     ({ posts,chart }) => ({ posts: posts.posts, chart: chart.chart }),
     {
       deletePost: deletePostAction,
     }
)(WeatherCard);