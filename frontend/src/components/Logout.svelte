<script>
  import { token } from "../store";

  function logout() {
    token.set(null);
    localStorage.removeItem("token");
  }
</script>

<style>
  button {
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
  }
</style>

<button on:click={logout}>Logout</button>
