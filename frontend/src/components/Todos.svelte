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
    e.target.title.value = ""
    e.target.content.value = ""
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
  /* your styles go here */
  ul {
    margin: 0;
    padding: 0;
  }

  .todo {
    /* order: 2; */
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
<div class="flex flex-col max-w-6xl m-auto align-middle xl:justify-center lg:flex-row-reverse">
  {#if loading}
    <p>loading...</p>
  {:else if error}
    <p>boo....</p>
  {:else}
    <div class="flex-grow mb-4 xl:flex-grow-0 xl:w-1/3 lg:mr-4">
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

    <form class="p-4 my-5 bg-gray-100 border-red-800 shadow-inner xl:w-1/3 lg:mx-5 md:w-1/2 md:mx-auto lg:mt-0 md:rounded-lg md:shadow-lg" on:submit|preventDefault={addTodo}>
      <label for="title">Title</label>
      <input class="mb-3" name="title" type="text" />
      <label for="content">Content</label>
      <textarea class="mb-4" name="content" cols="30" rows="10" />
      <button type="submit">Submit</button>
    </form>
  {/if}
</div>
