<template>
  <v-container>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-row>
          <v-col class="text-right">
            <v-btn
              color="success"
              dark
              @click="dialog = true"
              v-bind="attrs"
              v-on="on"
              >Add Track</v-btn
            >
          </v-col>
        </v-row>
      </template>
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Tracks Available </v-card-title>
        <table class="table mx-auto">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Add</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="userTrack in allUserTracksList"
              :key="userTrack.id"
            >
              <tr>
                <th scope="row">{{ userTrack.id }}</th>
                <td>{{ userTrack.name }}</td>
                <td>
                  <button
                    type="button"
                    @click="addTrackToAlbum(userTrack)"
                    class="btn btn-primary"
                  >
                    Add to Album
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row v-if="trackList.length == 0">
      <h1>No Tracks to display.</h1>
    </v-row>

    <v-row v-if="trackList.length != 0">
      <template v-for="track in trackList" :key="track.id">
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title  style="cursor: pointer;" @click="openLink(track.link)" class="text-h5">
                  {{ track.name }}
                </v-card-title>
                <v-card-title class="text-h5">
                  {{ track.duration }}
                </v-card-title>
                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    @click="deleteTrack(track)"
                    outlined
                    rounded
                    small
                  >
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import AlbumDataService from "../services/AlbumDataService";
import TrackDataService from "../services/TrackDataService";
export default {
  data() {
    return {
      name: "TrackList",
      trackList: [],
      allUserTracksList: [],
      track: {
        name: "",
      },
      dialog: false,
    };
  },

  methods: {
    async getAllTracks(albumId) {
      const userId = localStorage.userId;
      const albumDetails = await AlbumDataService.getAlbumById(albumId, userId);
      const userTracks = await TrackDataService.getAllTracksForUser(userId);
      this.allUserTracksList = userTracks.data;
      return albumDetails.data;
    },

    addTrackToAlbum(track) {
      const albumId = this.$route.params.id;
      console.log(track);
      console.log("addTrackToAlbum is called ", albumId);
      TrackDataService.addTrackToAlbum(albumId, track.id).then(
        (res) => {
          console.log(res);
          this.getAllTracks(albumId).then(
            (res) => {
              this.trackList = res.tracks;
              this.dialog = false;
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },

    deleteTrack(track) {
      console.log("Delete Track is clicked ");
      const albumId = this.$route.params.id;
      const trackId = track.id;
      TrackDataService.deleteTrackFromAlbum(albumId, trackId).then(
        (response) => {
          this.getAllTracks(albumId).then(
            (res) => {
              this.trackList = res.tracks;
              console.log(res);
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },

    openLink(trackLink){
      console.log("Open Link is clicked ",trackLink)
      if(trackLink){
        console.log("Opening")
        window.open(trackLink,'_newtab')
      }
    }

  },

  created() {
    const albumId = this.$route.params.id;
    this.getAllTracks(albumId).then(
      (res) => {
        this.trackList = res.tracks;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>
