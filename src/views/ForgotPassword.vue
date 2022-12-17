<template>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col md="6">
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Forgot Password form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="user.email" name="email" label="Email" type="text" placeholder="Email"
                      required></v-text-field>

                    <v-card-actions>
                      <v-btn color="red darken-1" text @click="forgotPassword">Forgot Password</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-container>

       <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card min-width="600px">
        <v-card-title class="text-h5"> Verify Details </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-text-field
                v-model="user.email"
                name="email"
                label="Email"
                type="text"
                placeholder="Email"
                readonly
                required
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="user.newPassword"
                name="new password"
                label="New Password"
                type="password"
                placeholder="New Password"
                required
              ></v-text-field>
            </v-row>
            
             <v-row>
              <v-text-field
                v-model="user.token"
                name="token"
                label="Token"
                type="text"
                placeholder="Token"
                required
              ></v-text-field>
            </v-row>

          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog=false"> cancel </v-btn>
          <v-btn color="green darken-1" text @click="verifyPassword"> Update Password </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import UserDataService from '../services/UserDataService';
export default {
    data(){
      return{
        dialog:false,
        user:{
           email:"",
           newPassword:"",
           token:""
        }
      }  
    },
    methods:{
        forgotPassword(){
            UserDataService.forgotPassword(this.user.email).then(res=>{
                console.log(res);
                this.dialog=true;
            },error=>{
                console.log(error)
                alert(error.response.data.error)
            })
        },
        verifyPassword(){
            console.log("Verify password is called")
            console.log(this.user)
            UserDataService.verifyAndUpdatePassword(this.user).then(res=>{
                console.log(res);
                this.dialog=false;
                this.$router.push({name:"login"})
            },error=>{
                console.log(error);
                this.user.newPassword="";
                this.user.token="";
                this.dialog=false
                alert(error.message)
            })
        }
    }
}
</script>