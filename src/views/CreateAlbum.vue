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
            Add Album
          </button>
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <table class="table m-4">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="album in albums" :key="album.id">
            <tr>
              <th scope="row">{{ album.id }}</th>
              <td>{{ album.name }}</td>
              <td>{{ album.description }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Enter Album Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="album.name"
                name="name"
                label="Name"
                type="text"
                placeholder="Album Name"
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="album.description"
                name="description"
                label="Description"
                type="text"
                placeholder="Description"
                required
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="addAlbum"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
  name: "AlbumsList",
  data() {
    return {
      albums: [],
      dialog: false,
      search: "",
      album: {
        name: "",
        description: "",
        isFavourite:false
      },
    };
  },
  methods: {
    async getAllAlbums(userId) {
      const albums = await AlbumDataService.getAllAlbums(userId);
      return albums.data;
    },

    searchAlbums() {
      const { search } = this;
      const userId = localStorage.userId;
      console.log(search);
    },

    viewAlbum(albumId) {
      this.$router.push({ name: "album", params: { id: albumId } });
      console.log("Album view more is clicked");
    },

    deleteAlbum(albumId) {
      console.log("Delete Album is clicked ", albumId);
      AlbumDataService.deleteAlbum(albumId).then(
        (res) => {
          console.log(res);
          const userId = localStorage.userId;
          this.getAllAlbums(userId).then(
            (albumsList) => {
              this.albums = albumsList;
              console.log(this.albums);
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

    addAlbum() {
      const { album } = this;
      const userId = localStorage.userId;
      AlbumDataService.saveAlbum(album, userId).then(
        (res) => {
          console.log(res);
          this.getAllAlbums(userId).then(
            (albumsList) => {
              this.dialog = false;
              this.albums = albumsList;
              console.log(this.albums);
              (this.album.name = ""), (this.album.description = "");
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
  },

  created() {
    const userId = localStorage.userId;
    this.getAllAlbums(userId).then(
      (albumsList) => {
        this.albums = albumsList;
        console.log(this.albums);
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>