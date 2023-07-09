<script lang="ts">
    export let foodname: string;
    export let foodkcal: number;
    export let imgroute: string;
    export let date: string;
</script>

<div
    class="StateLayer w-[430px] h-14 pl-4 pr-6 py-2 justify-start items-center gap-4 inline-flex"
>
    <div class="LeadingElement flex-col justify-center items-start inline-flex">
        <div
            class="BuildingBlocksMonogram w-10 h-10 relative bg-purple-200 rounded-[100px]"
        >
            <img src={imgroute} alt="" />
        </div>
    </div>
    <div
        class="Content grow basis-0 self-stretch flex-col justify-center items-start inline-flex"
    >
        <div
            class="Headline self-stretch text-zinc-900 text-[16px] font-normal leading-normal"
        >
            {foodname}
        </div>
    </div>
    <div class="TrailingElement justify-start items-center gap-3 flex">
        <div
            class="Metadata text-right text-zinc-700 text-[13px] font-medium leading-none"
        >
            {foodkcal}kcal
        </div>

        <div
            class="Metadata text-right text-[#6750A4] text-zinc-700 text-[13px] font-semibold leading-none"
        >
            {date}
        </div>
    </div>
</div>

<style lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
