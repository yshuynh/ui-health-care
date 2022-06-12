<template>
  <div>
<!--    <h3 v-if="!!error && error.length > 0" class="error">{{ error }}</h3>-->
    <v-alert
        v-show="!!error && error.length > 0"
        type="error"
        dense
        text
        class="mx-5"
    >
      {{ error }}
    </v-alert>

<!--    <p class="decode-result">Last result: <b>{{ result }}</b></p>-->
    <div style="background-color: black;">
    <qrcode-stream @decode="onDecode" @init="onInit" /></div>
  </div>
</template>

<script>

import {QrcodeStream} from "vue-qrcode-reader";

export default {

  components: { QrcodeStream },

  data () {
    return {
      result: '',
      error: ''
    }
  },

  methods: {
    onDecode (result) {
      this.result = result;
      if (this.result.length > 0) {
        this.$emit('emitResult', this.result);
      }
    },

    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          // this.error = "ERROR: you need to grant camera access permission"
          this.error = this.$t('errorNeedGrantCameraAccessPermission');
        } else if (error.name === 'NotFoundError') {
          // this.error = "ERROR: no camera on this device"
          this.error = this.$t('errorNoCameraOnThisDevice');
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  }
}
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
