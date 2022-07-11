<template>
  <v-card class="elevation-0">
    <div class="d-flex justify-center align-center">
      <img
          :src="require(`@/assets/images/${avatar}`)"
          alt="Thumbnail Image"
          class="img-raised rounded-circle img-fluid"
          width="250"
          height="250"
      />
    </div>
<!--    <div class="d-flex justify-center align-center">-->
<!--      <h1>Gigi Hadid</h1>-->
<!--      <small class="card-description text-muted">Nhà phát triển</small>-->
<!--    </div>-->
    <v-card-title><p class="ma-auto">{{ name }}</p></v-card-title>
    <v-card-subtitle class="text-center"><p class="ma-auto">{{ job }}</p></v-card-subtitle>
<!--    <v-card-text class="text-center"><p class="ma-auto">Truong dai hoc bach khoa da nangdung</p></v-card-text>-->
  </v-card>
</template>

<script>
export default {
  name: 'TeamMember',
  props: {
    avatar: String,
    name: String,
    job: String,
  }
};

</script>