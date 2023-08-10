<script lang="ts">
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import "../app.postcss";
    let isSide = false;
</script>

<div id="container">
    <header>
        <button class="side-button" on:click={() => (isSide = !isSide)} />
        <a href="/" on:click={() => (isSide = false)}>
            <span class="mb-title">Food Planner</span>
        </a>
        <a href="/profile" class="profile" on:click={() => (isSide = false)}>
            <img
                src="/account_circle_filled_24px@2x.png"
                alt=""
                style="width: 29px;"
            />
        </a>
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
                <div class="sidebar overflow-hidden">
                    <a href="/profile" on:click={() => (isSide = false)}>
                        <div class="flex-1 justify-center sidebar-button">
                            <div
                                class="StateLayer w-56 h-14 pl-4 pr-6 py-4 justify-start items-center gap-3 inline-flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>

                                <div
                                    class="font-extrabold Label grow shrink basis-0 text-zinc-700 text-[14px] leading-tight"
                                >
                                    프로필
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="/alarmsetting" on:click={() => (isSide = false)}>
                        <div class="flex-1 justify-center sidebar-button">
                            <div
                                class="StateLayer w-56 h-14 pl-4 pr-6 py-4 justify-start items-center gap-3 inline-flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                    />
                                </svg>

                                <div
                                    class="font-extrabold Label grow shrink basis-0 text-zinc-700 text-[14px] leading-tight"
                                >
                                    알림 설정
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="/food-search" on:click={() => (isSide = false)}>
                        <div class="flex-1 justify-center sidebar-button">
                            <div
                                class="StateLayer w-56 h-14 pl-4 pr-6 py-4 justify-start items-center gap-3 inline-flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                                <div
                                    class="font-extrabold Label grow shrink basis-0 text-zinc-700 text-[14px] leading-tight"
                                >
                                    음식 검색하기
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="/help-center" on:click={() => (isSide = false)}>
                        <div class="flex-1 justify-center sidebar-button">
                            <div
                                class="StateLayer w-56 h-14 pl-4 pr-6 py-4 justify-start items-center gap-3 inline-flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                                    />
                                </svg>

                                <div
                                    class="font-extrabold Label grow shrink basis-0 text-zinc-700 text-[14px] leading-tight"
                                >
                                    도움말
                                </div>
                            </div>
                        </div>
                    </a>
                    <a href="/" on:click={() => (isSide = false)}>
                        <div class="flex-1 justify-center sidebar-button">
                            <div
                                class="StateLayer w-56 h-14 pl-4 pr-6 py-4 justify-start items-center gap-3 inline-flex"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>

                                <div
                                    class="font-extrabold Label grow shrink basis-0 text-zinc-700 text-[14px] leading-tight"
                                >
                                    홈 화면으로
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        {/if}
    </main>
</div>

<style lang="postcss">
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
    .sidebar-button:hover {
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
        height: 100vh;
    }

    .profile:hover {
        background-color: rgba(0, 0, 0, 0.2);
        transition: 0.5s ease;
    }
    .profile {
        padding: 3px;
        border-radius: 50%;
    }
</style>
