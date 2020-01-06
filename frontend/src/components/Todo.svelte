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
    /* margin-bottom: 12px; */
    text-align: start;
  }

  @screen md {
    .todo {
      background: linear-gradient(
        to right,
        rgba(255, 0, 0, 0.2) 50%,
        transparent 50%
      );
      background-size: 201% 100%;
      background-position: right bottom;
      transition: 400ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
    }
    .todo:hover {
      background-position: left bottom;
    }
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
    max-width: 300px;
  }

  .trans {
      transition: 300ms;
      /* transform-origin: 50% 62.5%; */
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

<li class="self-center border-b-2 border-red-700 md:max-w-lg md:mx-auto" in:fly={{ duration: 300, y: 200, easing: cubicOut }}>
  <div class="px-4 py-2 todo" class:done={todo.isCompleted}>
    <div class="flex align-baseline align-middle _container">
      <span
        class="flex-grow text-lg font-medium tracking-wider _title"
        on:click={handleCheck}>
        {todo.title}
      </span>
      <div class="-my-3 text-3xl trans" class:open on:click={() => dispatch('click', open ? null : todo.id)}>
        +
      </div>
    </div>
  </div>
    {#if open}
      <div
        transition:slide={{ delay: 250, duration: 300, easing: cubicOut }}
        class="flex flex-col justify-center p-4 bg-gray-100 shadow-inner">
        <div class="max-w-sm mb-4" >{todo.content}</div>
        <button class="w-1/5 text-white bg-red-600" on:click={() => dispatch('delete', todo.id)}>
          delete
        </button>
      </div>
    {/if}
</li>
