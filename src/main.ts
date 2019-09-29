import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';


//import firebase from 'firebase'; //este original
import {firestorePlugin } from  'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyCvdIOxfGwME0vR_dO_WgVudo-i6ROXZCg",
  authDomain: "pwa-example-40499.firebaseapp.com",
  databaseURL: "https://pwa-example-40499.firebaseio.com",
  projectId: "pwa-example-40499",
  storageBucket: "pwa-example-40499.appspot.com",
  messagingSenderId: "423487194536",
  appId: "1:423487194536:web:a89167a3650266da27c99d"
};

firebase.initializeApp(config);

const messaging=firebase.messaging();
messaging.usePublicVapidKey("BDNzeMtJjFwa0NsWXhVBEmHw4OfmGgW4cAARjiDNsiRgrghoGJo_oPl0jL6HopKGhNZxWfr6JUKEIaG9Th6zoiI");

messaging.requestPermission().then(()=> {
  console.log("TENGO PERMISOS")
  messaging.getToken().then((token)=> {
    console.log(token)
  });

}).catch((err)=> {

  console.log('unable to get permission to notify',err);

});

export const db=firebase.firestore();

new Vue({
  router,
  store,
  render : (h) => h(App),
}).$mount('#app');

