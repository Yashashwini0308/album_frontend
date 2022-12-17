<template>
  <v-container>
    <v-row>
      <v-col>
        <v-toolbar dark color="blue darken-3" class="mb-1">
          <!-- <div class="input-group">
            <input
              type="text"
              v-model="search"
              class="form-control mx-auto"
              placeholder="Search"
              aria-label="albumSearch"
              aria-describedby="basic-addon2"
            />
            <div class="input-group-append">
              <button @click="search" class="btn btn-dark" type="button">
                Search
              </button>
            </div>
          </div> -->
          <button type="button" @click="dialog = true" class="btn btn-dark m-2">
            Add Track
          </button>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <table class="table mx-auto">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Duration</th>
            <th scope="col">Track Link</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="track in trackList" :key="track.id">
            <tr>
              <th scope="row">{{ track.id }}</th>
              <td>{{ track.name }}</td>
              <td>{{ track.duration }}</td>
              <td>
                <v-btn @click="viewTrack(track.link)">View</v-btn>
              </td>
              <td>
                <button type="button" @click="openEditTrackDialog(track)" class="btn btn-success">
                  Edit
                </button>
              </td>
              <td>
                <button type="button" @click="deleteTrack(track.id)" class="btn btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Track Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field v-model="track.name" name="name" label="Name" type="text" placeholder="Track Name" required>
              </v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="track.duration" name="duration" label="Duration" type="text" placeholder="Duration"
                required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="track.link" name="link" label="link" type="text" placeholder="Track Link" required>
              </v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addTrack"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Edit Track Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field v-model="editTrack.name" name="name" label="Name" type="text" placeholder="Track Name"
                required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="editTrack.duration" name="duration" label="Duration" type="text"
                placeholder="Duration" required></v-text-field>
            </v-row>
            <v-row>
              <v-text-field v-model="editTrack.link" name="link" label="link" type="text" placeholder="Track Link"
                required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="editDialog = false"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="updateTrack"> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
import TrackDataService from "../services/TrackDataService";
export default {
  data() {
    return {
      name: "TrackList",
      trackList: [],
      track: {
        name: "",
        duration: null,
        link: "",
      },
      editTrack: {
        id: "",
        name: "",
        duration: "",
        link: ""
      },
      dialog: false,
      editDialog: false
    };
  },

  methods: {
    async getAllTracks(userId) {
      const tracks = await TrackDataService.getAllTracksForUser(userId);
      return tracks.data;
    },

    deleteTrack(trackId) {
      console.log("Delete Track is clicked ", trackId);
      TrackDataService.deleteTrack(trackId).then(
        (res) => {
          const userId = localStorage.userId;
          this.getAllTracks(userId).then(
            (res) => {
              this.trackList = res;
              console.log(res);
            },
            (err) => {
              console.log(err);
              alert("Something went wrong, please refresh the page")
            }
          );
        },
        (error) => {
          console.log(error);
          alert("Track Deletion Failed")
        }
      );
    },

    addTrack() {
      console.log("Adding Track");
      const { track } = this;
      const userId = localStorage.userId;
      console.log(track);
      TrackDataService.saveTrackForUser(userId, track).then(
        (res) => {
          console.log(res)
          this.getAllTracks(userId).then(
            (trackList) => {
              this.dialog = false;
              this.trackList = trackList;
              console.log(this.trackList);
              this.track.name = "";
              this.track.duration  = ""
              this.track.link = ""
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },

    viewTrack(trackLink) {
      console.log("View Track is called");
      if (trackLink) {
        console.log("Opening")
        window.open(trackLink, '_newtab')
      }
    },

    openEditTrackDialog(track) {
      this.editTrack.name = track.name;
      this.editTrack.id = track.id;
      this.editTrack.duration = track.duration;
      this.editTrack.link = track.link;
      this.editDialog = true
    },

    updateTrack() {
      console.log("Update Track is called ", this.editTrack)
      const userId = localStorage.userId
      TrackDataService.updateTrack(userId, this.editTrack).then(res => {
        console.log(res);
        this.getAllTracks(userId).then(
          (res) => {
            this.trackList = res;
            console.log(res);
            this.editDialog = false;
          },
          (err) => {
            console.log(err);
            alert("Something went wrong")
          }
        );
      }, error => {
        console.log(error);
        alert("Something went wrong")
      })
    }

  },

  created() {
    const userId = localStorage.userId;
    this.getAllTracks(userId).then(
      (res) => {
        this.trackList = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  },
};
</script>