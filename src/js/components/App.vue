<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment-timezone'

export default {
  created () {
    axios.interceptors.request.use(config => {
      let expiresAt = moment(window.localStorage.getItem('expiresAt'))

      if (expiresAt.isValid() && moment().isBefore(expiresAt)) {
        let diff = moment.duration(expiresAt.diff(moment()))

        if (diff.asHours() < 12 && config.url !== 'auth/refresh') {
          axios.post('auth/refresh')
            .then(({ data }) => {
              this.$store.commit('LOGIN', data)
            })
        }
      }

      return config
    })

    axios.interceptors.response.use(response => response, error => {
      if (error.response && error.response.status === 401) {
        this.$store.dispatch('logout')
      }

      return Promise.reject(error)
    })
  }
}
</script>
