<script lang="ts">
    import { onMount } from "svelte";

    let UserImgSrc: string;
    onMount(() => {
        UserImgSrc = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${Math.random()}`;
    });
</script>

<div class="profile-container pt-3">
    <div
        class="w-[93%] h-[300px] bg-zinc-200 rounded-[30px] bg-[#E7E0EC] mx-auto"
    >
        <div class="flex items-center">
            <div
                class="m-3 w-44 h-44 bg-zinc-200 rounded-full border-4 border-zinc-200 flex-col justify-center items-center inline-flex"
            >
                <!-- svelte-ignore a11y-missing-attribute -->
                <img class="w-44 h-44 rounded-full" src={UserImgSrc} />
            </div>
            <div
                class=" mt-[-100px] bg-[#EADDFF] text-center leading-[43px] w-60 h-12 relative bg-white rounded-3xl text-xl border-4 border-zinc-200 font-black"
            >
                강경호
            </div>
        </div>
    </div>
</div>
