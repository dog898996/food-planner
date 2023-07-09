<script lang="ts">
    import SearchBlock from "$lib/svelte/SearchBlock.svelte";
</script>

<div class="ScrollableListDialog w-[450px] mx-auto shrink-0 mt-6">
    <div class="TextContent">
        <div class="Headline">최근 검색 기록</div>
        <div class="SupportingText">
            최근 3일 전까지의 검색 기록을 조회할 수 있습니다.
        </div>
    </div>
    <div class="list-container">
        <SearchBlock
            foodname={"해장국"}
            foodkcal={780}
            imgroute="/favicon.png"
            date="2023/07/29"
        />
        <SearchBlock
            foodname={"라면"}
            foodkcal={75}
            imgroute="/favicon.png"
            date="2023/07/29"
        />
        <SearchBlock
            foodname={"파워에이드"}
            foodkcal={75}
            imgroute="/favicon.png"
            date="2023/07/29"
        />
        <SearchBlock
            foodname={"소고기무국"}
            foodkcal={75}
            imgroute="/favicon.png"
            date="2023/07/29"
        />
        <SearchBlock
            foodname={"소고기튀김"}
            foodkcal={250}
            imgroute="/favicon.png"
            date="2023/07/29"
        />
    </div>
    <div class="text-right text-[12px] mr-3 p-2 text-[#6750A4] font-semibold">
        스크롤하여 더보기
    </div>
</div>

<style lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    .SupportingText {
        align-self: stretch;
        color: #49454f;
        font-size: 14px;
        font-family: Roboto;
        font-weight: bold;
        line-height: 20px;
        word-wrap: break-word;
    }
    .Headline {
        align-self: stretch;
        color: #1d1b20;
        font-size: 24px;
        font-family: Roboto;
        font-weight: bold;
        line-height: 32px;
        word-wrap: break-word;
    }
    .TextContent {
        align-self: stretch;
        height: 116px;
        padding: 24px;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
        display: flex;
    }
    .ScrollableListDialog {
        height: 320px;
        position: relative;
        background: #ece6f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 28px;
    }
    .list-container {
        width: 440px;
        overflow-y: auto;
        height: 170px;
    }
    .list-container::-webkit-scrollbar {
        width: 10px;
    }
    .list-container::-webkit-scrollbar-thumb {
        background-color: #6750a4;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    .list-container::-webkit-scrollbar-track {
        background-color: #d0bcff;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
</style>
