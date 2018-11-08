






import './main.css'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

// var data = {
//   labels: ['January', 'Feburary', 'March']
// }

// datasets: [
//   {
//     data: [30, 22, 80]
//   }
// ]
// var context = document.querySelector("#graph").getContext("2d");

// new Chart(context).Line(data);


