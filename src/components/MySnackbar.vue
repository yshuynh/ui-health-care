<template>
  <div class="text-center ma-2">
    <v-snackbar
        v-model="snackbar"
        top
        :color="type"
        :timeout="timeout"
        transition="slide-y-transition"
    >
      <v-icon v-if="type==='success'">mdi-check-circle</v-icon>
      <v-icon v-if="type==='error'">mdi-alert</v-icon>
      <span class="ml-4">{{ text }}</span>

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            icon
            v-bind="attrs"
            @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>


<script>
export default {
  name: 'MySnackbar',
  props: {
    isShow: Boolean,
    text: String,
    type: String,
  },
  data: () => ({
    timeout: 2000
  }),
  computed: {
    snackbar: {
      get() {
        return this.isShow;
      },
      set(val) {
        this.$emit('update:isShow', val);
      },
    }
  },
}
</script>
