<template>
  <div class="home-view__container">
    <section>
      <v-parallax class="parallax" :height="parallaxHeight">
        <v-layout column align-center justify-center class="white--text">
          <v-row align="center" justify="center">
            <v-col class="p-2 d-flex justify-content-center justify-center" cols="12" md="4" sm="12">
              <img :height="imageParallaxHeight" src="~@/assets/images/screenshot2.png" />
            </v-col>
            <v-spacer/>
            <v-col cols="12" md="7" sm="12">
              <h1 class="mb-2 white--text display-1 text-xs-center custom-bg-title">
                Hệ thống đơn thuốc điện tử áp dụng mã QR
              </h1>
              <div class="white--text subheading mb-3 text-xs-center"
                   style="font-weight: 900; text-shadow: 2px 2px #000000">Có mặt trên ứng dụng android
              </div>
              <v-btn class="blue lighten-2 mt-5" dark large href="https://bom.so/qrcodeeprescription">
                {{ $t('download') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-layout
          column
          wrap
          class="my-5"
          align-center
      >
        <v-flex xs12 sm4 class="my-3">
          <div class="text-xs-center align-center">
            <h2 class="headline text-center">
              Một giải pháp thông minh cho việc khám chữa bệnh
            </h2>
            <div class="subheading text-center align-center text-xs-center">
              Áp dụng công nghệ mã QR
            </div>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="layout justify-center">
                    <v-icon x-large class="blue--text text--lighten-2 align-center">mdi-qrcode-scan</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">Công nghệ mã QR</div>
                  </v-card-title>
                  <v-card-text>
                    QR là từ viết tắt của Quick Response (tạm dịch “Mã phản hồi nhanh”). Đây là một ma trận mã vạch có
                    thể được đọc bởi máy đọc mã vạch hay smartphone (điện thoại thông minh)
                    có chức năng chụp ảnh với ứng dụng chuyên biệt để quét mã vạch.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="layout justify-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-clock-fast</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline">Nhanh chóng & tiện lợi</div>
                  </v-card-title>
                  <v-card-text>
                    Mã QR cho phép lượng thông tin truyền tải sẽ nhiều hơn, hỗ trợ tốt hơn cho người dùng, đặc biệt
                    là những doanh nghiệp kinh doanh muốn gửi thông điệp đến khách hàng của mình.
                  </v-card-text>
                </v-card>
              </v-flex>
              <v-flex xs12 md4>
                <v-card class="elevation-0 transparent">
                  <v-card-text class="layout justify-center">
                    <v-icon x-large class="blue--text text--lighten-2">mdi-lock</v-icon>
                  </v-card-text>
                  <v-card-title primary-title class="layout justify-center">
                    <div class="headline text-xs-center">An toàn & bảo mật</div>
                  </v-card-title>
                  <v-card-text>
                    An toàn thông tin ngày nay được coi là vấn đề đáng lưu tâm hàng đầu của
                    xã hội. Nó là một vấn đề ảnh hưởng đến các ngành kinh tế, khoa học – kỹ thuật và xã hội.
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </section>

    <section>
      <v-parallax height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            Hạnh phúc là khi bạn có một sức khỏe tốt.
          </div>
          <em>Hãy bảo vệ sức khỏe của bạn và thăm khám định kì thường xuyên.</em>
          <v-btn class="blue lighten-2 mt-5" dark large href="/pre-made-themes">
            Thông tin thêm
          </v-btn>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-md>


        <v-layout row wrap>
          <v-flex xs12 text-xs-center class="mt-5">
            <div class="headline text-center">Hãy tham gia hệ thống của chúng tôi</div>
            <br>
            <div class="text-center">Các bệnh viện, hiệu thuốc muốn tham gia xin vui lòng điền thông tin bên dưới
            </div>
          </v-flex>
          <v-flex xs8 offset-xs2>

            <v-card class="elevation-0 transparent">

              <v-card-text>
                <v-flex xs12>
                  <v-text-field filled label="Email address" :rules="emailRules" v-model="email"
                                persistent-hint></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field filled multi-line label="Số điện thoại"></v-text-field>
                </v-flex>
                <div xs12 class="text-xs-center d-flex justify-center">
                  <v-btn class="blue lighten-2 mb-5" dark large @click="subscribe">Đăng ký</v-btn>
                </div>
              </v-card-text>

            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </section>

    <section>
      <v-parallax height="380">
        <v-layout column align-center justify-center>
          <div class="headline white--text mb-3 text-xs-center">
            Theo dõi và cập nhật thông tin của chúng tôi
          </div>
        </v-layout>
        <v-layout justify-space-around justify-center>

          <v-icon x-large dark>mdi-facebook</v-icon>

          <v-icon x-large dark>mdi-twitter</v-icon>

          <v-icon x-large dark>mdi-reddit</v-icon>

          <v-icon x-large dark>mdi-instagram</v-icon>

          <v-icon x-large dark>mdi-discord</v-icon>
        </v-layout>
      </v-parallax>
    </section>

    <section>
      <v-container grid-list-xl>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h2 class="text-center headline">Đội ngũ phát triển</h2>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-spacer/>
          <v-col cols="12" md="3" sm="12">
            <team-member name="Huỳnh Tấn Ý" job="Nhà phát triển phần mềm" avatar="avatar_y.jpg"/>
          </v-col>
          <v-spacer/>
          <v-col cols="12" md="3" sm="12">
            <team-member name="Ngô Hoàng Minh" job="Nhà phát triển phần mềm" avatar="avatar_minh.jpg"/>
          </v-col>
          <v-spacer/>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import TeamMember from "@/pages/home/components/TeamMember";
export default {
  name: "HomeView",
  components: {TeamMember},
  data: function () {
    return {
      imageParallaxHeight: 700,
      parallaxHeight: 800,
      title: "Endorfine",
      imageLink: {
        main:
            "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fb13f0434-b228-11e6-8e5d-5252025056ab_web_scale_0.4666667_0.4666667__.jpg?alt=media&token=660df23e-599e-434b-9313-ba69c973eeea",
        sub_main:
            "@/assets/images/medical-hands-up.jpg",
        logo:
            "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fandroid-chrome-512x512.png?alt=media&token=8a0a66f6-4741-4ff6-8f28-eb9ec74374df",
        social_cover:
            "https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
      },
      email: "",
      emailRules: [
        v => {
          return !!v || "E-mail is required";
        },
        v =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid"
      ],
      subscribed: false
    };
  },
  methods: {
    subscribe: function () {
      this.subscribed = !this.subscribed;
    }
  },

  computed: {
    // imgHeight: function() {
    //   var offset = 320;
    //   console.log("new image height is " + (this.pageHeight - offset));
    //   return this.pageHeight - offset;
    // }
  },

  mounted: function () {
    // this.calculateHeight();
  },

  watch: {
    '$store.state.screen': function(value) {
      if (value === 'mobile') {
        // this.parallaxHeight = 1000;
        this.imageParallaxHeight = 500;
      } else {
        // this.parallaxHeight = 800;
        this.imageParallaxHeight = 700;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.home-view__container {

  .finedTitle {
    font-weight: 900;
    text-shadow: 2px 2px #000000;
  }

  .social-icon {
    font-size: 21px;
    color: white;
  }

  .v-parallax {
    background: transparent;
    background-image: url('@/assets/images/medical-hands-up.jpg');
    background-size: cover;
  }

  .custom-bg-title {
    font-weight: 900;
    text-shadow: 3px 2px #000000;
  }
}
</style>
