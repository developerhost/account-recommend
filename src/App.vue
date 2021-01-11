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
            <input class="ml-15 hoge" v-model="name" placeholder="名前を入力" />
          </v-layout>
        </v-card>

        <v-card class="mx-auto my-5" max-width="450">
          <v-layout wrap>
            <p>あなたのアカウントIDは？</p>
            <input class="ml-15" v-model="id" value="@" placeholder="IDを入力(@つけてね)" />
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
          <v-btn :disabled="!id" depressed color="primary" @click="asessment()">診断</v-btn>
          <v-btn :disabled="!id" class="ml-15" depressed color="primary" @click="tweet()">ツイート</v-btn>
          </v-col>
        </v-card>

        <p>おすすめの裏垢は{{ name }}です</p>
        <p>{{ id }}</p>

        <ul>
          <li v-for="(account, key) in accounts" :key="key">
            <!-- {{ account }}
            {{ key }} -->
            {{ account.name }}
            {{ account.id }}
            {{ account.gender }}
          </li>
        </ul>
        
      </div>
    </v-main>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "App",
  created(){
    this.db = firebase.firestore()
    this.accountsRef = this.db.collection('accounts')
    this.accountsRef.onSnapshot(querySnapshot => {
      const obj = {}//データが変わった時の処理
      querySnapshot.forEach(doc => {
        obj[doc.id] = doc.data() //doc.id=firebaseのデータベースID。doc.data=firebaseに入れたデータ
      })
      this.accounts = obj
    })
  },

  data: () => ({
    name: '',
    id: '',
    gender: '',
    db: null,
    acountsRef: null,
    accounts: {} //取得したデータを入れる
    //
  }),
  methods: {
    asessment() {
      if(this.id === ''){ return }
      this.accountsRef.add({
        name: this.name,
        id: this.id,
        gender: this.gender,
      })
    },
    tweet(){

    },
  }
};
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #000;
  border-style: solid !important;
  margin: 8px;
}
</style>
