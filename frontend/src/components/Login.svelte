<script as>
  import { query, getClient } from "svelte-apollo";
  import { LOGIN } from "../queries";
  import { token } from "../store.js";

  const client = getClient();

  async function login(e) {
    try {
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
    background: rgba(255, 0, 0, 0.2);
    max-width: 500px;
    margin: 0 auto;
    border: 1px solid tomato;
    border-radius: 15px;
    margin-bottom: 15px;
  }

  :global(button) {
    @apply block w-full px-4 py-2 font-bold tracking-wider text-gray-800 bg-red-300 rounded cursor-pointer;
  }
  :global(button:hover) {
    @apply bg-gray-300;
  }

  :global(label) {
    @apply block mb-1 text-sm font-bold text-gray-700;
  }

  :global(input, textarea) {
    @apply w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none;
  }

  :global(input:focus, textarea:focus) {
    @apply outline-none shadow-outline;
  }
</style>

<div
  class="px-4 py-4 mx-2 mx-auto mb-4 leading-tight tracking-tight text-center bg-gray-200 border-red-300 rounded md:bg-red-200 md:border md:max-w-xl">
  <code>hint: log in with your made-up credentials to create a user ;)</code>
</div>
<form class="max-w-xs p-4 mx-auto bg-gray-100 rounded shadow" on:submit|preventDefault={login}>
  <div>
    <div class="mb-4">
      <label for="username">Username</label>
      <input name="username" type="text" autocomplete="username" />
    </div>
    <div class="mb-6">
      <label for="password">Password</label>
      <input name="password" type="password" autocomplete="current-password" />
    </div>
    <button type="submit">Login</button>
  </div>
</form>
