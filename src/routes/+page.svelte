<script lang="ts">
    import SearchBlock from "$lib/svelte/SearchBlock.svelte";
    import RecipeBlock from "$lib/svelte/RecipeBlock.svelte";
    import "../app.postcss";
    let inputvalue: String;
</script>

<main class="flex justify-around align-middle flex-col pt-4">
    <div class="ScrollableListDialog w-[480px] mx-auto shrink-0">
        <div class="TextContent">
            <div class="Headline">최근 검색 기록</div>
            <div class="SupportingText">
                최근 7일 전까지의 검색 기록을 조회할 수 있습니다.
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
        <div
            class="text-right text-[12px] mr-3 p-2 text-[#6750A4] font-semibold"
        >
            스크롤하여 더보기
        </div>
    </div>

    <div class="SearchableListDialog w-[480px] mx-auto shrink-0 mt-5">
        <div
            class="inputarea flex justify-around items-center p-2 border-b-2 border-b-gray"
        >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="hover:cursor-pointer hover:bg-[#000000]/20 transition-all rounded-full"
                on:click={() => {
                    inputvalue = "";
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10 box-border p-2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>
            <input
                bind:value={inputvalue}
                type="text"
                class="w-[340px] h-11 bg-[transparent] outline-none"
            />
            <div
                class="hover:cursor-pointer hover:bg-[#000000]/20 transition-all rounded-full"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10 box-border p-2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                    />
                </svg>
            </div>
        </div>
        <div class=" recipe-container m-2">
            <RecipeBlock
                listname={"통뼈해장국"}
                foodkcal={780}
                imgroute="/favicon.png"
                info="가족이 다 같이 먹기 좋은 요리"
            />
            <RecipeBlock
                listname={"회ㅚㅚ오리 감자"}
                foodkcal={7800}
                imgroute="/favicon.png"
                info="맛잇음"
            />
            <RecipeBlock
                listname={"제육볶음 치즈덮밥"}
                foodkcal={2}
                imgroute="/favicon.png"
                info="간단하게 만들 수 있는 요리"
            />
            <RecipeBlock
                listname={"팬케이크 파스타"}
                foodkcal={780}
                imgroute="/favicon.png"
                info="달달하고 부드러운 맛"
            />
            <RecipeBlock
                listname={"해장국튀김"}
                foodkcal={780}
                imgroute="/favicon.png"
                info="건강에 좋은 요리"
            />
            <RecipeBlock
                listname={"교촌 치킨"}
                foodkcal={780}
                imgroute="/favicon.png"
                info="존맛"
            />
        </div>
    </div>
</main>

<style lang="postcss">
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
        background: #ece6f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 28px;
    }
    .SearchableListDialog {
        height: 320px;
        background: #ece6f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 28px;
    }
    .list-container {
        width: 460px;
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

    .recipe-container {
        width: 452px;
        overflow-y: auto;
        height: 242px;
    }
    .recipe-container::-webkit-scrollbar {
        width: 10px;
    }
    .recipe-container::-webkit-scrollbar-thumb {
        background-color: #6750a4;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    .recipe-container::-webkit-scrollbar-track {
        background-color: #d0bcff;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
</style>
