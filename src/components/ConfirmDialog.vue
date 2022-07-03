<template>
  <div class="text-center">
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{this.$t('confirm')}}
        </v-card-title>

        <v-card-text>
          {{text}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              depressed
              color="success"
              text
              @click="confirmedDialog(true)"
          >
            {{this.$t('yes')}}
          </v-btn>
          <v-btn
              depressed
              color="error"
              text
              @click="confirmedDialog(false)"
          >
            {{this.$t('no')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name:'ConfirmDialog',
  props: {
    showDialog: Boolean,
    text: String,
  },
  data () {
    return {
    }
  },
  computed: {
    dialog: {
      get () { return this.showDialog },
      set (value) {
        this.$emit('updateShowDialog', value)
        this.$emit('update:showDialog', value)
      },
    },
  },
  methods: {
    confirmedDialog(value) {
      this.$emit('confirmedDialog', value);
      this.dialog = false;
    }
  }
}
</script>
