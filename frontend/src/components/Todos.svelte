<script>
  import { query, mutate, getClient } from "svelte-apollo";
  import Todo from "./Todo.svelte";
  import TodoFetcher from "./TodoFetcher.svelte";
  import { TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../queries.js";

  const client = getClient();
  const todos = query(client, { query: TODOS });

  let open;
  let toDelete;

  async function addTodo(e) {
    const res = await mutate(client, {
      mutation: ADD_TODO,
      variables: {
        data: {
          title: e.target.title.value,
          content: e.target.content.value
        }
      }
    });
    data.todos = [...data.todos, res.data.createTodo];
  }

  async function updateTodo({ detail }) {
    const res = await mutate(client, {
      mutation: UPDATE_TODO,
      variables: {
        data: detail
      }
    });
    const i = data.todos.findIndex(todo => todo.id === res.data.updateTodo.id);
    data.todos[i] = res.data.updateTodo;
  }

  async function deleteTodo({ detail }) {
    await mutate(client, {
      mutation: DELETE_TODO,
      variables: {
        id: detail
      }
    });
    data.todos = data.todos.filter(todo => todo.id !== detail);
  }

  let data,
    loading = true,
    error;
</script>

<style scoped>
  :global(body) {
    /* this will apply to <body> */
    overflow: hidden;
  }
  /* your styles go here */
  ul {
    margin: 0;
    padding: 0;
  }

  .container {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    justify-content: center;
  }

  form {
    order: 1;
    text-align: start;
    margin-right: 12px;
    padding-right: 12px;
    border-right: 1px solid silver;
  }

  .todo {
    order: 2;
    flex-grow: 1;
    align-self: flex-start;
    max-width: 400px;
  }

  input {
    width: 100%;
  }

</style>

<TodoFetcher bind:data bind:loading bind:error />

<!-- markup (zero or more items) goes here -->
<div class="container">
  {#if loading}
    <p>loading...</p>
  {:else if error}
    <p>boo....</p>
  {:else}
    <div class="todo">
      <ul>
        {#each data.todos as todo (todo.id)}
          <Todo
            {todo}
            open={open === todo.id}
            on:click={e => (open = e.detail)}
            on:update={updateTodo}
            on:delete={deleteTodo} />
        {:else}
          <div>no todos</div>
          <!-- empty list -->
        {/each}
      </ul>
    </div>

    <form on:submit|preventDefault={addTodo}>
      <label for="title">Title</label>
      <input name="title" type="text" />
      <label for="content">Content</label>
      <textarea name="content" cols="30" rows="10" />
      <br />
      <button type="submit">Submit</button>
    </form>
  {/if}
</div>
