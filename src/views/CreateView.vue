<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-center">
          <v-btn rounded @click="createAlbum" color="primary" dark> Create Album </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-btn rounded @click="createTrack" color="primary" dark> Create Track </v-btn>
        </div>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-btn rounded @click="createArtist" color="primary" dark> Create Artist </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  methods: {
      createAlbum(){
          this.$router.push({name:"createAlbum"})
      },
      createTrack(){
          this.$router.push({name:"createTrack"})
          console.log("Create Track")
      },
      createArtist(){
          this.$router.push({name:"createArtist"})
          console.log("Create Artist")
      }
  },
};
</script>
