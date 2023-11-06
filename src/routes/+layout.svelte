<script lang="ts">
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";
    import { page } from "$app/stores";
    import "../app.postcss";
    let isSide = false;
    import { onMount } from "svelte";
    import type { LayoutData } from "./$types";
    export let data: LayoutData;
    import { dbinfo } from "$lib/store";
    import { loginimg } from "$lib/store";
    import { loginname } from "$lib/store";
    import { loginemail } from "$lib/store";
    import { loginnum } from "$lib/store";
    import { Circle } from "svelte-loading-spinners";
    import { loading } from "$lib/store";
    let loginloading = false;
    let googlestatus = "normal"; //구글 버튼 애니메이션

    import {
        GoogleAuthProvider /*구글 로그인 하기에 관련된 모든 기능*/,
        PhoneAuthCredential,
        browserSessionPersistence /*내가 로그인했는지 안했는지*/,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithRedirect /*팝업창으로 로그인/리디렉트 페이지로 로그인 하고 싶을 시 signInWithRedirect로 ㄱㄱ*/,
    } from "firebase/auth";
    import {
        getApps,
        initializeApp,
        FirebaseError,
        type FirebaseOptions,
    } from "firebase/app";
    import type { User } from "firebase/auth";
    import { goto } from "$app/navigation";

    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null;
    onMount(() => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, async (user) => {
            curUser = user;
            $loading = false;
            if (!curUser) return;
            $loginimg = curUser.photoURL;
            $loginname = curUser.displayName;
            $loginemail = curUser.email;
            $loginnum = curUser.phoneNumber;
            let db = await fetch(`/dbserver?email=${$loginemail}`, {
                method: "GET",
            });
            $dbinfo = await db.json();
            // 아래 코드는 store에 저장된 db의 변경을 실제 mongodb로 반영시켜주는 fetch 코드( 곧 삭제할 예정)
            await fetch(
                `/dbserver?email=${$loginemail}&db=${encodeURIComponent(
                    JSON.stringify($dbinfo)
                )}`,
                {
                    method: "PUT",
                }
            );
        });
        return () => {
            un();
        };
    });
    const login = async (firebaseConfig: FirebaseOptions) => {
        $loading = true;

        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        try {
            await setPersistence(auth, browserSessionPersistence);
            const result: any = await signInWithRedirect(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;

            return { token, user };
        } catch (error) {
            if (error instanceof FirebaseError) {
                const code = error.code;
                const message = error.message;
                // The email of the user's account used.
                const email = error.customData?.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log({
                    code,
                    message,
                    email,
                    credential,
                });
                $loading = false;
            } else {
                console.log(error);
                $loading = false;
            }
        }
    };
    const logout = async (firebaseConfig: FirebaseOptions) => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        await auth.signOut();
    };
</script>

{#if $loading}
    <!-- 새로운 로딩 컴포넌트 -->
    <div class="overlay">
        <div
            style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
        >
            <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
            <div
                style="padding: 10px 10px 10px 20px; color: white; -webkit-text-stroke: 1px white; font-size: 20px;"
            >
                로딩중..
            </div>
        </div>
    </div>
    <!-- (구) 로딩 컴포넌트 -->
    <!-- <div
        class="loading"
        style="position: fixed;   left: 50%; top: 50%;
    transform: translate(-50%, -50%); z-index: 9000;"
    >
        <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
    </div> -->
{/if}
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
        {#if curUser || $page.url.pathname === "/login"}
            <slot />
        {:else}
            <div class="pt-[130px]">
                <svg
                    class="w-40 h-40 m-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    ><path d="M0 0h24v24H0V0z" fill="none" /><path
                        d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
                    /></svg
                >

                <div style="font-weight: bolder;" class="text-3xl text-center">
                    로그인 되어 있지 않습니다
                </div>
                <div style="font-weight: bolder;" class="text-xl text-center">
                    로그인이 필요합니다
                </div>
                <div style="width: 100vw; height: 20px;" />
                <!-- svelte-ignore a11y-click-events-have-key-events -->

                <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                <img
                    class="login-button"
                    on:mouseover={() => {
                        googlestatus = "focus";
                    }}
                    on:mouseout={() => {
                        googlestatus = "normal";
                    }}
                    on:click={async () => {
                        await login(firebaseConfig);
                        goto("/");
                    }}
                    style="width: 200px; margin: 0 auto;"
                    src="../google/light_{googlestatus}.png"
                    alt=""
                />
            </div>
        {/if}
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
    .overlay {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #b3b2b2;
        font-family: "Arial", sans-serif;
        font-size: 1.375rem;
        opacity: 70%;
    }
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
    .login-button:hover {
        cursor: pointer;
    }
</style>
