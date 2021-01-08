<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center"></div>
    </v-app-bar>

    <v-main>
      <div id="app">
        <h1 align="center" class="my-5">裏垢リコメンダー</h1>
        <v-card class="mx-auto my-5" max-width="450">
          <v-layout wrap>
            <p>あなたのアカウント名は？</p>
            <input v-model="name" placeholder="名前を入力" />
          </v-layout>
        </v-card>

        <v-card class="mx-auto my-5" max-width="450">
          <v-layout wrap>
            <p>あなたのアカウントIDは？</p>
            <input v-model="id" placeholder="IDを入力" />
          </v-layout>
        </v-card>
        
        <v-card class="mx-auto my-5" max-width="450">
          <v-layout wrap>
        <label>
          <input type="radio" value="man" v-model="gender" />男
        </label>
        <label>
          <input type="radio" value="woman" v-model="gender" />女
        </label>
        </v-layout>
        </v-card>

        <v-card class="mx-auto" max-width="344">
          <v-col align="center">
          <v-btn depressed color="primary" @click="asessment()">診断</v-btn>
          </v-col>
        </v-card>

        <p>おすすめの裏垢は{{ name }}です</p>
        <p>{{ id }}</p>
        
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    name: "",
    id: "",
    gender: ""
    //
  }),
  methods: {
    asessment() {}
  }
};
</script>
