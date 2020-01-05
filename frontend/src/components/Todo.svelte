<script>
  import { createEventDispatcher } from "svelte";
  import { slide, fly } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  export let todo;
  export let open;

  const dispatch = createEventDispatcher();

  function handleCheck() {
    dispatch("click", null);
    dispatch("update", { id: todo.id, isCompleted: !todo.isCompleted });
  }
</script>

<style scoped>
  li {
    text-decoration: none;
    list-style: none;
    margin-bottom: 12px;
    text-align: start;
  }

  .todo {
    line-height: 40px;
    position: relative;
    background: linear-gradient(
      to right,
      rgba(255, 0, 0, 0.2) 50%,
      transparent 50%
    );
    background-size: 200% 100%;
    background-position: right bottom;
    transition: 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
  .todo:hover {
    background-position: left bottom;
  }

  .todo.done .title {
    color: silver;
    text-decoration: line-through;
  }

  .container {
    position: relative;
    display: flex;
    padding-left: 12px;
  }

  .container > div {
    font-size: 2rem;
    line-height: 2rem;
    margin-right: 1rem;
    transition: 250ms;
    cursor: pointer;
  }

  .title {
    flex-grow: 1;
  }

  .open {
    transform: rotate(45deg);
  }

  .content {
    padding-left: 24px;
    max-width: 300px;
  }

  .delete {
    position: absolute;
    font-size: 0.8rem;
    right: 0;
    bottom: 0;
    margin-right: 12px;
    background: #bb0000;
    border-color: #cc0000;
    color: white;
  }

  .delete:hover {
    background: #cc0000;
  }

  .delete:active {
    background: #bb0000;
  }

  .delete:focus {
    border-color: black;
  }
</style>

<li in:fly={{ duration: 300, y: 200, easing: cubicOut }}>
  <div class="todo" class:done={todo.isCompleted}>
    <div class="container">
      <span class="title" on:click={handleCheck}>{todo.title}</span>
      <div class:open on:click={() => dispatch('click', open ? null : todo.id)}>
        +
      </div>
    </div>
    {#if open}
      <div
        transition:slide={{ delay: 250, duration: 300, easing: cubicOut }}
        class="content">
        {todo.content}
        <button class="delete" on:click={() => dispatch('delete', todo.id)}>
          delete
        </button>
      </div>
    {/if}
  </div>
</li>
