<script lang="ts">
    export let listname: string;
    export let foodkcal: number;
    export let imgroute: string;
    export let info: string;
    // import "$app.postcss";
</script>

<div
    class="w-[360px] h-[72px] pl-4 pr-6 py-2 justify-start items-center gap-4 inline-flex"
>
    <div class="flex-col justify-center items-start inline-flex">
        <div
            class="w-10 h-10 bg-purple-200 rounded-[100px] justify-center items-center inline-flex"
        >
            <div
                class="w-10 h-10 text-center text-violet-950 text-base font-medium leading-normal"
            >
                <img src={imgroute} alt="" />
            </div>
        </div>
    </div>
    <div
        class="grow shrink basis-0 self-stretch flex-col justify-center items-start inline-flex"
    >
        <div
            class="self-stretch text-zinc-900 text-base font-normal leading-normal"
        >
            {listname}
        </div>
        <div
            class="self-stretch text-zinc-700 text-sm font-normal leading-tight"
        >
            {foodkcal}kcal, {info}
        </div>
    </div>
</div>
