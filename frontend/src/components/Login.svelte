<script as>
  import { query, getClient } from "svelte-apollo";
  import { LOGIN } from "../queries";
  import { token } from "../store.js";

  const client = getClient();

  async function login(e) {
      try {
      console.log("HELLO??")
      const { data } = await query(client, {
        query: LOGIN,
        variables: {
          username: e.target.username.value,
          password: e.target.password.value
        }
      }).result();
      token.set(data.login.token);
      localStorage.setItem("token", data.login.token);
    } catch (e) {
      throw Error(e);
    }
  }
</script>

<style>
    .hint {
        padding: 8px 12px;
        background: rgba(255,0,0,0.2);
        max-width: 500px;
        margin: 0 auto;
        border: 1px solid tomato;
        border-radius: 15px;
        margin-bottom: 15px;
    }
</style>

<div class="hint">
  <code>hint: log in with your made-up credentials to create a user ;)</code>
</div>
<form on:submit|preventDefault={login}>
  <label for="username">Username</label>
  <input name="username" type="text" autocomplete="username" />
  <label for="password">Password</label>
  <input name="password" type="password" autocomplete="current-password" />
  <br />
  <button type="submit">Login</button>
</form>
