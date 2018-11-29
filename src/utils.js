import Vue from 'vue'

export const vm = new Vue()

export const dataFormat = (obj) => {
  let objStr='';
  for (let key in obj) {
    objStr += key+'='+obj[key]+'&'
  }
  return objStr
}

