<script>
  import { onMount } from "svelte";
  import { query, mutate, getClient } from "svelte-apollo";
  import { TODOS, ADD_TODO } from "../queries.js";
  import { token } from "../store";

  export let loading = true;
  export let error = null;
  export let data = {};

  onMount(async () => {
    try {
      const client = getClient();
      const todos = query(client, { query: TODOS });
      const payload = await todos.result();
      data = payload.data;
      loading = false;
    } catch (e) {
      token.set(null);
      localStorage.removeItem("token");

      loading = false;
      error = e;
    }
  });
</script>
