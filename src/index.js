import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import 'bootstrap/dist/js/bootstrap.js'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
const store = configureStore();

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs:['en','ru','uk'],
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    fallbackLng: "en",
    detection: {
      order: [ 'path','cookie', 'htmlTag'],
      caches: ['cookie']
    },
    backend: {
      loadPath:'/assets/locales/{{lng}}/translation.json'
    },
   
  });

  const loadingMarkup = (
    <div className="py-4 text-center">
      <h3>Loading..</h3>
    </div>
  )

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
    </React.StrictMode>
  
  </Suspense>,
  document.getElementById('root')
);


reportWebVitals();
