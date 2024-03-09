<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const shelly = ref()
const status = ref()
const settings = ref()

onMounted(async () => {
  const shellyResponse = await axios.get('http://192.168.1.100/shelly')
  shelly.value = shellyResponse

  const statusResponse = await axios.get('http://192.168.1.100/status')
  status.value = statusResponse

  const settingsReponse = await axios.get('http://192.168.1.100/settings')
  settings.value = settingsReponse
})

function turnOn() {
  axios.post('https://shelly-86-eu.shelly.cloud/device/relay/control', {
    body: {
      channel: '0',
      turn: 'on',
      id: '80646F827174',
      auth_key: 'MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480'
    }
  })
}

function turnOff() {
  axios.post('https://shelly-86-eu.shelly.cloud/device/relay/control', {
    body: {
      channel: '0',
      turn: 'off',
      id: '80646F827174',
      auth_key: 'MWRmYzM2dWlkE62C6C4C76F817CE0A3D2902F5B5D4C115E49B28CF8539114D9246505DE5D368D560D06020A92480'
    }
  })
}
</script>

<template>
  <main v-if="shelly && status && settings">
    <h1 v-if="shelly">Panel Shelly de - {{ shelly.data.type }}</h1>
    <div v-if="status" class="shelly-infos">
    <pre>{{ settings.data }}</pre>
      <ul>
        <li>Online : {{ status.data.relays[0].ison }}</li>
        <li>Wifi : {{ status.data.wifi_sta.ssid }}</li>
        <li>IP : {{ status.data.wifi_sta.ip }}</li>
        <li>{{ status.data.meters[0].power }} W</li>
        <li>{{ status.data.temperature }} C°</li>
        <li>Surchauffe : {{ status.data.overtemperature }}</li>
        <li v-if="status.data.update.has_update == false">Le module est à jour</li>
        <li v-else>Le module n'est pas à jour</li>
        <button v-if="status.data.relays[0].ison == false" @click="turnOn()">Allumer</button>
        <button v-else @click="turnOff()">Eteindre</button>
      </ul>
    </div>
  </main>
  <main v-else class="error">
    <h1>Le module est actuellement hors ligne</h1>
  </main>
</template>

<style scoped>
.error {
  height: 90vh;
  color: red;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>