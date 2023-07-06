<script lang="ts">
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    let isSide = false;
</script>

<div id="container">
    <header>
        <button class="side-button" on:click={() => (isSide = !isSide)} />
        <span class="mb-title">Food Planner</span>
        <img
            src="/account_circle_filled_24px@2x.png"
            alt=""
            style="width: 29px;"
        />
    </header>
    <main>
        <slot />
        {#if isSide}
            <div
                transition:slide={{
                    axis: "x",
                    easing: (t) => t * t * t,
                    duration: 400,
                }}
                class="sidebar"
            >
                <div class="sidebar-content">알림</div>
            </div>
        {/if}
    </main>
</div>

<style>
    #container {
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        height: 100vh;
        overflow: hidden;
        background-color: #d0bcff;
    }
    .side-button {
        width: 40px;
        height: 40px;
        outline: none;
        border: none;
        background-color: transparent;
        background-image: url(/sidebar.png);
        background-position: center;
        background-size: 50%;
        background-repeat: no-repeat;
        transition: 0.2s;
        border-radius: 50%;
        cursor: pointer;
    }
    .side-button:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }
    .mb-title {
        font-weight: 550;
        font-size: x-large;
    }
    .sidebar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100%;
        background-color: #fef7ff;
    }
    header {
        width: auto;
        height: 50px;
        box-sizing: border-box;
        background-color: #fef7ff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: nowrap;
        padding: 0 15px;
    }
    main {
        position: relative;
    }
    .sidebar-content {
        display: flex;
        padding: 16px 24px 16px 16px;
        align-items: center;
        gap: 12px;
        flex: 1 0 0;
        align-self: stretch;
        width: 100%;
    }
</style>
