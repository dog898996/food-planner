<script lang="ts">
    import { onMount } from "svelte";
    import {
        GoogleAuthProvider /*구글 로그인 하기에 관련된 모든 기능*/,
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
    import type { PageData } from "./$types";
    export let data: PageData;
    import type { User } from "firebase/auth";
    console.log(data);
    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null;
    onMount(() => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, (user) => {
            curUser = user;
        });
        return () => {
            un();
        };
    });
    const login = async (firebaseConfig: FirebaseOptions) => {
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
            } else {
                console.log(error);
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

<h1>{curUser ? "로그인 된" : "로그인 안된"} 상태임</h1>
{#if curUser}
    <div>니 이름 : {curUser.displayName}</div>
    <div>니 전번 : {curUser.phoneNumber}</div>
    <div>니 이메일 : {curUser.email}</div>
    <div>
        니 이메일 인증했는지 : {curUser.emailVerified ? "했음" : "안했음"}
    </div>
{/if}
<button
    style="background-color: white;"
    on:click={async () => {
        await login(firebaseConfig);
    }}>로그인</button
>
<button
    style="background-color: white;"
    on:click={async () => {
        await logout(firebaseConfig);
    }}>로그아웃</button
>
