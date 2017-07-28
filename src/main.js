import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import iView from 'iview';

Vue.use(iView);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});