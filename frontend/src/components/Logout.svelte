<script>
  import { token } from "../store";

  function logout() {
    token.set(null);
    localStorage.removeItem("token");
  }
</script>

<style>
  /* button {
    background: transparent;
    color: tomato;
    font-size: 1.2rem;
    border-color: transparent;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 24px;
  }

  button:hover {
    border: tomato solid 1px;
  }

  button:active {
    background: crimson;
    color: white;
  } */
</style>

<button class="lg:m-4 lg:fixed lg:bottom-0 lg:right-0 lg:w-1/12" on:click={logout}>Logout</button>
