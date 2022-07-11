<template>
  <div class="wrapper">
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <div class="container">
        <div class="md-layout">
          <div
              class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Your Story Starts With Us.</h1>
            <h4>
              Every landing page needs a small description after the big bold
              title, that's why we added this text here. Add here all the
              information that can make you or your product create the first
              impression.
            </h4>
            <br />
            <v-btn
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                class="md-success md-lg"
                target="_blank"
            ><i class="fas fa-play"></i> Watch video</v-btn
            >
          </div>
        </div>
      </div>
    </v-parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div
                class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
            >
              <h2 class="title text-center">Let's talk product</h2>
              <h5 class="description">
                This is the paragraph where you can write more details about
                your product. Keep you user engaged by providing meaningful
                information. Remember that by this time, the user is curious,
                otherwise he wouldn't scroll to get here. Add a button if you
                want the user to see more.
              </h5>
            </div>
          </div>
          <div class="features text-center">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-info">
                    <v-icon>md-chat</v-icon>
                  </div>
                  <h4 class="info-title">Free Chat</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-success">
                    <v-icon>verified_user</v-icon>
                  </div>
                  <h4 class="info-title">Verified Users</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <div class="icon icon-danger">
                    <v-icon>fingerprint</v-icon>
                  </div>
                  <h4 class="info-title">Fingerprint</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section text-center">
        <div class="container">
          <h2 class="title">Here is our team</h2>
          <div class="team">
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <v-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                          :src="teamImg1"
                          alt="Thumbnail Image"
                          class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Gigi Hadid
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <div>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </div>

                    <v-card-actions class="text-center">
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </v-btn>
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </v-btn>
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <v-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                          :src="teamImg2"
                          alt="Thumbnail Image"
                          class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Carla Hortensia
                      <br />
                      <small class="card-description text-muted"
                      >Designer</small
                      >
                    </h4>

                    <div>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </div>

                    <v-card-actions class="text-center">
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </v-btn>
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-linkedin"></i>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="team-player">
                  <v-card class="md-card-plain">
                    <div class="md-layout-item md-size-50 mx-auto">
                      <img
                          :src="teamImg3"
                          alt="Thumbnail Image"
                          class="img-raised rounded-circle img-fluid"
                      />
                    </div>
                    <h4 class="card-title">
                      Kendall Jenner
                      <br />
                      <small class="card-description text-muted">Model</small>
                    </h4>

                    <div>
                      <p class="card-description">
                        You can write here details about one of your team
                        members. You can give more details about what they do.
                        Feel free to add some <a href="#">links</a> for people
                        to be able to follow them outside the site.
                      </p>
                    </div>

                    <v-card-actions class="text-center">
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-twitter"></i>
                      </v-btn>
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-instagram"></i>
                      </v-btn>
                      <v-btn
                          href="javascript:void(0)"
                          class="md-just-icon md-simple"
                      >
                        <i class="fab fa-facebook-square"></i>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">Work with us</h2>
              <h4 class="text-center description">
                Divide details about your product or agency work into parts.
                Write a few lines about each one and contact us about any
                further collaboration. We will responde get back to you in a
                couple of hours.
              </h4>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                      <v-text-field v-model="name" type="text" label="Your Name"></v-text-field>
                  </div>
                  <div class="md-layout-item md-size-50">
                      <v-text-field v-model="email" type="email" label="Your Email"></v-text-field>
                  </div>
                </div>
                  <v-textarea v-model="message" label="Your Message"></v-textarea>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <v-btn class="md-success">Send Message</v-btn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  data() {
    return {
      name: null,
      email: null,
      message: null
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}
.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}
</style>
