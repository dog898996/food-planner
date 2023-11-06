<script>
    export let showModal; // boolean

    let dialog; // HTMLDialogElement

    $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
    bind:this={dialog}
    on:close={() => (showModal = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <slot name="header" />
        <hr class="mb-2" style="height: 2px; background-color: #6750A4; " />
        <slot />
        <hr class="mb-2" style="height: 0px; border: 0px;" />

        <!-- svelte-ignore a11y-autofocus -->
        <button
            class="text-[white] text-sm font-extrabold bg-[#78b5f7] rounded-md p-[2.5px] border-solid border-[3px] border-[white]"
            autofocus
            on:click={() => dialog.close()}>닫기</button
        >
    </div>
</dialog>

<style>
    dialog {
        width: 440px;
        max-width: 32em;
        border-radius: 10px;
        border: none;
        padding: 0;
        background-color: #ece6f0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
        width: 60px;
        height: 30px;
    }
</style>
