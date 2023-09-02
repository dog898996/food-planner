<script lang="ts">
    import { onMount } from "svelte";
    import {
        getApps,
        initializeApp,
        FirebaseError,
        type FirebaseOptions,
    } from "firebase/app";
    import {
        GoogleAuthProvider /*구글 로그인 하기에 관련된 모든 기능*/,
        PhoneAuthCredential,
        browserSessionPersistence /*내가 로그인했는지 안했는지*/,
        getAuth,
        onAuthStateChanged,
        setPersistence,
        signInWithRedirect /*팝업창으로 로그인/리디렉트 페이지로 로그인 하고 싶을 시 signInWithRedirect로 ㄱㄱ*/,
    } from "firebase/auth";
    import type { PageData } from "./$types";
    export let data: PageData;
    import { goto } from "$app/navigation";
    let firebaseConfig = data.firebaseConfig;
    onMount(() => {
        const logout = async (firebaseConfig: FirebaseOptions) => {
            if (getApps().length === 0) {
                initializeApp(firebaseConfig);
            }
            const auth = getAuth();
            await auth.signOut();
        };
        logout(firebaseConfig).then(() => {
            goto("/");
        });
    });
</script>
