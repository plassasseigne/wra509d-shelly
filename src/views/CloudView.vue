<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import FormData from 'form-data'

const status = ref()

onMounted(async () => {
  const statusResponse = await axios.get('https://shelly-77-eu.shelly.cloud/device/status?id=4022d88e30e8&auth_key=MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73')
  status.value = statusResponse
})

function turnOn() {
  let data = new FormData()

  data.append('channel', '0')
  data.append('turn', 'on')
  data.append('id', '4022d88e30e8')
  data.append('auth_key', 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73')

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://shelly-77-eu.shelly.cloud/device/relay/control',
    data : data
  }

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error)
  });
}

function turnOff() {
  let data = new FormData()

  data.append('channel', '0')
  data.append('turn', 'off')
  data.append('id', '4022d88e30e8')
  data.append('auth_key', 'MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73')

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://shelly-77-eu.shelly.cloud/device/relay/control',
    data : data
  }

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data))
  })
  .catch((error) => {
    console.log(error)
  });
}

</script>

<template>
  <main v-if="status">
    <h1>Panel Shelly Cloud</h1>
    <div v-if="status" class="shelly-infos">
      <ul>
        <li>Online : {{ status.data.data.device_status.relays[0].ison }}</li>
        <li>Wifi : {{ status.data.data.device_status.wifi_sta.ssid }}</li>
        <li>IP : {{ status.data.data.device_status.wifi_sta.ip }}</li>
        <li>{{ status.data.data.device_status.meters[0].power }} W</li>
        <li>{{ status.data.data.device_status.temperature }} °C</li>
        <li>Surchauffe : {{ status.data.data.device_status.overtemperature }}</li>
        <li v-if="status.data.data.device_status.update.has_update == false">Le module est à jour</li>
        <li v-else>Le module n'est pas à jour</li>
      </ul>
      <button v-if="status.data.data.device_status.relays[0].ison == false" @click="turnOn()">Allumer</button>
      <button v-else @click="turnOff()">Eteindre</button>
    </div>
  </main>
  <main v-else class="error">
    <h1>Le cloud est désactivé</h1>
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