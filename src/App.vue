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
            <input
              class="ml-15"
              v-model="id"
              value="@"
              placeholder="IDを入力(@つけてね)"
            />
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
            <v-btn
              :disabled="!id || !gender"
              depressed
              color="primary"
              @click="asessment()"
              >診断</v-btn
            >
            <v-btn
              :disabled="!id || !gender"
              class="ml-15"
              depressed
              color="primary"
              @click="tweet()"
              >ツイート</v-btn
            >
          </v-col>
        </v-card>

        <!-- 
        <ul>
          <li v-for="(account, key) in accounts" :key="key">
            {{ account.name }}
            {{ account.id }}
            {{ account.gender }}
          </li>
        </ul> -->

        <h2 v-if="account.name" class="text-center">
          おすすめの裏垢は{{ account && account.name }}です
        </h2>
        <h2 align="center" justify="center">{{ account && account.id }}</h2>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  created() {
    this.db = firebase.firestore();
    this.accountsRef = this.db.collection("accounts");
    this.accountsRef.onSnapshot((querySnapshot) => {
      const obj = []; //データが変わった時の処理
      querySnapshot.forEach((doc) => {
        obj.push(doc.data()); //doc.id=firebaseのデータベースID。doc.data=firebaseに入れたデータ
      });
      this.accounts = obj;
    });
  },
  data: () => ({
    name: "",
    id: "",
    gender: "",
    db: null,
    accountsRef: null,
    accounts: [], //取得したデータを入れる
    account: {},
    random: null,
  }),
  methods: {
    asessment() {
      if (this.id.slice(0, 1) == "＠") {
        this.id = this.id.slice(1);
        this.id = "@" + this.id;
      } else if (this.id.slice(0, 1) !== "@") {
        this.id = "@" + this.id;
      }

      firebase
        .firestore()
        .collection("accounts")
        .where("id", "==", this.id)
        .get()
        .then((res) => {
          if (res.size < 1) {
            console.log(res);

            this.accountsRef.add({
              name: this.name,
              id: this.id,
              gender: this.gender,
            });
          }

          //異性のアカウントのみの配列
          const filterAccounts = this.accounts.filter(
            (account) => account.gender !== this.gender
          );
          //その中から一見ランダムに出力
          const num = this.randomNum(filterAccounts.length - 1);
          this.account = filterAccounts[num];
        });
    },
    tweet() {
      var shareURL =
        "https://twitter.com/intent/tweet?text=" +
        "おすすめの裏垢は" +
        this.account.name +
        "です。(" +
        this.account.id +
        ")" +
        "%20%23裏垢リコメンダー" +
        "&url=" +
        "https://account-recommend.web.app";
      location.href = shareURL;
    },

    randomNum(max) {
      return Math.floor(Math.random() * (max + 1));
    },
    // filterSex(gender === 'man'){
    //   /ortして女のIDとnameをとってくる
    // },
    // display() {
    //   this.random = Math.floor(Math.random() * this.id.length);
    //   IDに紐づく名前を表示
    // }
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #000;
  border-style: solid !important;
  margin: 8px;
}
</style>
