<script>
  import ApolloClient from "apollo-boost";
  import { setClient } from "svelte-apollo";
  import { token } from "./store.js";
  import Login from "./components/Login.svelte";
  import Logout from "./components/Logout.svelte";
  import Todos from "./components/Todos.svelte";

  let token_value;
  token.subscribe(u => void (token_value = u));
  $: {
    const client = new ApolloClient({
      uri: "https://evening-fortress-22549.herokuapp.com/graphql",
      headers: token_value && { token: token_value }
    });

    setClient(client);
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  :global(button) {
    /* this will apply to <body> */
    cursor: pointer;
  }
</style>

<main>
  <h1>GraphQL + Svelte Todo!</h1>
  {#if token_value}
    <Todos />
    <Logout />
  {:else}
    <Login />
  {/if}
</main>
