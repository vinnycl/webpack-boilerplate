import 'normalize.css/normalize.css'
import './assets/stylesheets/main.scss'

import Vue from 'vue'
import App from './app.vue'

document.body.appendChild(new Vue(App).$mount().$el)
