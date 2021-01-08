import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase"
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCaADsRG6jiapxC0BfOynu99uOGaMEeB9Y",
  authDomain: "account-recommend.firebaseapp.com",
  projectId: "account-recommend",
  storageBucket: "account-recommend.appspot.com",
  messagingSenderId: "366424881244",
  appId: "1:366424881244:web:a5971fac97d6131c168e99",
  measurementId: "G-YW9HFK43WV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
