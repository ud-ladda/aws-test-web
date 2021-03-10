import Vue from 'vue'
import dateTime from 'dateformat'

Vue.filter('dateFilter', (value) => {
  if (!value) return ''
  return dateTime(value, 'dd mmm yyyy')
})
