<script>
    let googlestatus = "normal";
</script>

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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
        src="../google/light_{googlestatus}.png"
        alt=""
        on:focusin={() => {
            googlestatus = "focus";
        }}
        on:focusout={() => {
            googlestatus = "normal";
        }}
        on:click={() => async () => {
            await login(firebaseConfig);
        }}
    />
</div>
