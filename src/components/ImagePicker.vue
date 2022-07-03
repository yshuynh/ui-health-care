<template>
  <v-card>
    <v-card-text>
      <v-card-title class="mb-2">
        <v-row>
          <v-col cols="12" md="9" sm="12" class="py-0">
            {{ this.$t('avatar') }}
          </v-col>
          <v-col cols="12" md="3" sm="12" class="py-0">
            <v-btn
                :disabled="!myValue"
                color="success"
                width="100%"
                @click="checkSubmit">
              {{ $t("save") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <div class="px-5">
        <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            v-model="myValue"
        ></v-file-input>
        <v-card class="mx-auto pa-2" width="250" height="250">
          <v-img :src="previewImage"/>
        </v-card>
      </div>
    </v-card-text>
    <confirm-dialog :show-dialog.sync="showConfirmDialog"
                    @confirmedDialog="confirmedDialog"
                    :text="this.$t('confirmSaveInfo') + '?'"/>
  </v-card>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog";

export default {
  name: 'ImagePicker',
  components: {ConfirmDialog},
  props: {
    value: File,
    basePreviewImage: String,
  },
  data: () => ({
    previewImage: "",
    showConfirmDialog: false,
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
  }),
  watch: {
    basePreviewImage(value) {
      this.previewImage = value;
    },
    myValue(file) {
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.previewImage = reader.result;
        }
      } else {
        this.previewImage = this.basePreviewImage;
      }
    }
  },
  computed: {
    myValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    },
  },
  methods: {
    checkSubmit() {
      this.showConfirmDialog = true;
    },
    updateShowConfirmDialog(value) {
      this.showConfirmDialog = value;
    },
    confirmedDialog(value) {
      if (value === true) {
        this.$emit("confirmed", this.myValue);
      }
    }
  },
  mounted() {
    console.log('mounted: ', this.basePreviewImage);
    this.previewImage = this.basePreviewImage;
  }
}
</script>