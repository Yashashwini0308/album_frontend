<template>
    <v-row v-if="albums.length == 0">
        <h1>No Albums are Available Purchase.</h1>
    </v-row>
    <v-row v-if="albums.length != 0">
        <template v-for="album in albums" :key="album.id">
            <v-card class="my-4" min-width="374">
                <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                <div class="container">
                    <div class="row">
                        <div class="col-md-8">

                            <v-card-title>{{ album.name }}</v-card-title>

                            <v-card-text>
                                <v-row align="center" class="mx-0"> </v-row>

                                <div>
                                    {{ album.description }}
                                </div>
                            </v-card-text>

                            <v-card-text>
                                <v-row align="center" class="mx-0"> </v-row>
                                <div>
                                    {{
                                            album.artist == undefined || album.artist == null
                                                ? "No Artist"
                                                : album.artist.name
                                    }}
                                </div>
                            </v-card-text>
                        </div>
                    </div>
                </div>

                <v-card-actions>
                    <v-btn color="green lighten-2" text @click="viewPurchaseAlbum(album)">
                        View
                    </v-btn>
                    <v-btn color="deep-purple lighten-2" text @click="purchaseAlbum(album)">
                        Purchase
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-row>
    
      <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Tracks List </v-card-title>
        <table class="table mx-auto">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Duration</th>
            </tr>
          </thead>
          <tbody>
            <template
              v-for="userTrack in selectedTrack"
              :key="userTrack.id">
              <tr>
                <th scope="row">{{ userTrack.id }}</th>
                <td>{{ userTrack.name }}</td>
                <td>{{userTrack.duration}}</td>
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

</template>
<script>
import AlbumDataService from "../services/AlbumDataService";
export default {
    data() {
        return {
            dialog: false,
            albums: [],
            selectedTrack:null
        }
    },
    methods: {
        async getAllAlbumsForSale() {
            const userId = localStorage.userId
            const albums = await AlbumDataService.getAllsellAlbums(userId)
            return albums.data
        },
        purchaseAlbum(album) {
            console.log("Purchase Album is clicked")
            console.log(album)
            const userId = localStorage.userId;
            album.isForSale=false;
            AlbumDataService.purchaseAlbum(userId,album).then(res=>{
                alert("Purchase Successfull")
                this.getAllAlbumsForSale().then(
                    (albumsList) => {
                        this.albums = albumsList;
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            },error=>{
                console.log(error);
                alert("Something went Wrong")
            })
        },
        viewPurchaseAlbum(album){
            this.selectedTrack=null
            const userId = localStorage.userId
            AlbumDataService.getAlbumById(album.id,userId).then(response=>{
                this.selectedTrack=response.data.tracks
                this.dialog=true;
            },error=>{
                console.log(error)
                alert("Something went wrong")
            })
        }
    },
    created() {
        this.getAllAlbumsForSale().then(
            (albumsList) => {
                this.albums = albumsList;
                console.log(this.albums)
            },
            (error) => {
                console.log(error);
            }
        );
    },
}
</script>