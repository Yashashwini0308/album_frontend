<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col md="6">
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field v-model="user.email" name="email" label="Email" type="text" placeholder="Email"
                      required></v-text-field>

                    <v-text-field v-model="user.password" name="password" label="Password" type="password"
                      placeholder="password" required></v-text-field>
                    <v-card-actions>
                      <v-btn @click="login" color="blue" value="log in">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import UserDataService from "../services/UserDataService";
export default {
  name: "Login",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const { user } = this;
      UserDataService.login(user).then(
        (response) => {
          console.log(response)
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          this.emitter.emit("logged", "User LoggedIn");
          this.$router.push({
            name: "userhome",
            params: { id: response.data.userId },
          });
        },
        (error) => {
          alert(error.response.data.error)
          console.log(error);
        }
      );
    },
    forgotPassword(){
      // console.log("Forgot password is clicked")
      // UserDataService.forgotPassword().then(res=>{
      //   console.log(res)
      // },error=>{
      //   console.log(error)
      // })
      this.$router.push({name:"forgotPassword"})
    }
  },
};
</script>