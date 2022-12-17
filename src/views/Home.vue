<template>
  <div class="container fluid">
    <v-row>
      <section
        id="hero-animated"
        class="hero-animated d-flex align-items-center"
      >
        <div
          class="
            container
            d-flex
            flex-column
            justify-content-center
            align-items-center
            text-center
            position-relative
          "
          data-aos="zoom-out"
        >
          <img src="../assets/music.jpeg" class="img-fluid animated" />
          <h2><span>Album Application</span></h2>
          <p>
            Create and Manage your music albums effectively with flexible feature, where one can
            able to manage and earn parallely.
          </p>
          <div class="d-flex">
            <v-btn @click="goLogin" class="mt-4" color="primary" value="log in"
              >Get Started</v-btn
            >
          </div>
        </div>
      </section>

      <section id="featured-services" class="featured-services">
        <div class="container">
          <div class="row gy-4">
            <div class="col-xl-3 col-md-6 d-flex" data-aos="zoom-out">
              <div class="service-item position-relative">
                <div class="icon"><i class="bi bi-activity icon"></i></div>
                <h4><a href="" class="stretched-link">Create</a></h4>
                <p>
                  Users can able to create their own albums, tracks and artists with flexiblility. 
                </p>
              </div>
            </div>
            <!-- End Service Item -->

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="200"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-bounding-box-circles icon"></i>
                </div>
                <h4><a href="" class="stretched-link">Search</a></h4>
                <p>
                  Users can Easily Search their albums with album names and track names so that
                  they can listen to their interested music.
                </p>
              </div>
            </div>
            <!-- End Service Item -->

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="400"
            >
              <div class="service-item position-relative">
                <div class="icon">
                  <i class="bi bi-calendar4-week icon"></i>
                </div>
                <h4><a href="" class="stretched-link">Delete, Update</a></h4>
                <p>
                  User can Easily  update and delete the tracks, albums, artists, so that the things can be up-to-date. 
                </p>
              </div>
            </div>

            <div
              class="col-xl-3 col-md-6 d-flex"
              data-aos="zoom-out"
              data-aos-delay="600"
            >
              <div class="service-item position-relative">
                <div class="icon"><i class="bi bi-broadcast icon"></i></div>
                <h4><a href="" class="stretched-link">Advanced Featues</a></h4>
                <p>
                  This app have multiple advanced features for the users where they can favourite the albums etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </v-row>
    <!-- <v-row>
      <v-carousel
        :continuous="false"
        :cycle="cycle"
        :show-arrows="false"
        v-model="model"
      >
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-row> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    model: 0,
    cycle: true,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
  }),
  methods: {
    goLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>