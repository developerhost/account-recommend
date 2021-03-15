<template>
  <v-app>
    <v-container class="bg">
      <div id="app">
        <h1 align="center" class="my-5">裏垢リコメンダー</h1>
        <v-layout wrap>
          <p class="mt-1">アカウント名</p>
          <v-text-field
            class="ml-15 mt-0 pt-0"
            v-model="name"
            placeholder="名前を入力"
          />
        </v-layout>

        <v-layout wrap>
          <p class="mt-1">アカウントID</p>
          <v-text-field
            class="ml-15 pt-0"
            v-model="id"
            value="@"
            placeholder="IDを入力(@つけてね)"
          />
        </v-layout>

        <v-layout wrap>
          <label> <input type="radio" value="man" v-model="gender" />男 </label>
          <label>
            <input type="radio" value="woman" v-model="gender" />女
          </label>
        </v-layout>

        <v-layout wrap>
          <p class="mt-5">どんなアカウントとマッチしたい？</p>
          <v-textarea filled auto-grow label="詳細" v-model="detail">
          </v-textarea>
        </v-layout>

        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                :disabled="!id || !gender"
                depressed
                color="red lighten-2"
                dark
                x-large
                v-bind="attrs"
                v-on="on"
                @click="asessment()"
              >
                診断
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                おすすめのアカウントは
              </v-card-title>

              <v-card-text>
                <h2 v-if="account.name" class="text-center mt-3">
                  {{ this.account && this.account.name }}
                </h2>
                <h2 align="center" justify="center">
                  {{ this.account && this.account.id }}
                </h2>
              </v-card-text>

              <p justify="center" class="text-center mb-5">
                🎉結果をツイートしよう🎉
              </p>
              <div class="text-center">
                <v-btn large class="mb-2" color="primary" @click="tweet()"
                  >ツイート</v-btn
                >
              </div>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false" depressed>
                  閉じる
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </v-container>
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
    detail: "",
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
.bg {
  background-image: url("~@/assets/23b1f26018f047bce04e17849423bfb8_t.jpeg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
}
</style>
