import './App.css';
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPosts as getPostsAction, deletePost as deletePostAction, getDataChart as getChartAction } from './redux/modules/posts';
import WeatherCard from './components/WeatherCard/WeatherCard';
import moment from 'moment'
const languages = [
  {
    code: 'en',
    name: 'EN',
    country_code: 'en',
  },
  {
    code: 'uk',
    name: 'UA',
    country_code: 'uk',
  },
  {
    code: 'ru',
    name: 'RU',
    dir: 'rtl',
    country_code: 'ru',
  },
]

function App({ posts,chart, getPosts,getDataChart, deletePost }) {
  const currentLanguageCode = cookies.get('i18next') || 'en'
  const [name, setName] = useState("");
  
  const { t } = useTranslation()
  let date = new Date()
  const currentDate = moment(date).format(`ddd, ${date.getDate()} MMMM, hh:mm`)
  useEffect(() => {
    getDataChart("London")
    getPosts("London")
  }, [])


  const handlePost = (e) => {
    let newPost = e.target.value
   setName(newPost)
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getDataChart(name)
    getPosts(name)
 
}
 

  return (
    <div className="container">
      <div className="language-select">
        <div className="d-flex justify-content-between align-items-center language-select-root">
        <div className="d-flex flex-column align-items-start">
          <form onSubmit={handleSubmit}>
          <input 
          className={"input-form"}
          type="text"
          value={name}
          onChange={handlePost}
          placeholder={t("city_name")}
        />
            <button type="submit" className={"button-form"}>
            {t("add")}
            </button>
          </form>
      </div>
          <div className="dropdown">
            <button
              className="  dropdown-toggle switch-lang"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="dropdown-item-text">{t('language')}</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {languages.map(({ code, name, country_code }) => (
                <li key={country_code}>
                  <button
                    href="#"
                    className="dropdown-item"
                    onClick={() => {
                      i18next.changeLanguage(code)
                    }}
                    disabled={code === currentLanguageCode}
                  >
                    <span
                      className={`flag-icon flag-icon-${country_code} mx-2`}
                      style={{
                        opacity: currentLanguageCode === code ? 0.5 : 1,
                      }}
                    ></span>
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
     
      <div className={"card-flex"}>
      
      {posts.length && chart.length && posts.map((item,index) => item.cod === 200 ? <WeatherCard key={index} deletePost={deletePost} id = {index} card={item} currentDate={currentDate} chart={chart}/> : console.log('City not found'))}
      </div>


    </div>
  );
}


export default connect(
  ({ posts,chart }) => ({ posts: posts.posts, chart: chart.chart }),
  {
    getPosts: getPostsAction,
    getDataChart: getChartAction,
    deletePost: deletePostAction,
  }
)(App);

