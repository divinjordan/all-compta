import env from "../../env.json";

export default {
  state() {
    const data = window.localStorage.getItem(env.sessionName);
    if (data != undefined) {
      return JSON.parse(data);
    } else {
      return {};
    }
  },
  store(data) {
    // {user: , admin: , other: }
    window.localStorage.setItem(env.sessionName, JSON.stringify(data));
  },
  check(key) {
    const state = this.state();
    if (state.hasOwnProperty(key)) {
      return state[key].logged;
    } else {
      return false;
    }
  },
  token(key) {
    if (this.check(key)) {
      const state = this.state();
      return state[key].token;
    } else {
      return "";
    }
  },
  id(key) {
    if (this.check(key)) {
      const state = this.state();
      return state[key].id;
    } else {
      return null;
    }
  },
  remove() {
    window.localStorage.removeItem(env.sessionName);
  },
  logout() {
    window.localStorage.removeItem(env.sessionName);
    window.location.assign("/connexion");
  },
};
