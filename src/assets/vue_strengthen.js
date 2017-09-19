import Vue from 'vue'
import axios from 'axios'
import store from '../store' 

Vue.prototype.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
} 


Vue.prototype.createCookie = function (name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}


Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('-');
};

var Http = {}

const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 50000
})

Http.install = function (Vue, options) {
  Vue.prototype.$http = http
}

Vue.use(Http)

axios.post('/api/get_config', {})    
  .then((response) => {   
    let res = response.data
    if (res.success === 1) {
      store.commit('setConfig', res.data)
    }
})



// const tools = require('upyun/tools')



