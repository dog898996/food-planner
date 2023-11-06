<script lang="ts">
    import SearchBlock from "$lib/svelte/SearchBlock.svelte";
    import RecipeBlock from "$lib/svelte/RecipeBlock.svelte";
    import { dbinfo } from "$lib/store";
    import Modal from "$lib/svelte/Modal.svelte";
    import "../app.postcss";
    let inputvalue: String;
    let showModal = false;
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
            {#each $dbinfo.FoodScanDetail as v, i}
                <SearchBlock
                    foodname={v.FoodName.replaceAll("_", " ")}
                    foodkcal={v.FoodKcal}
                    imgroute="/favicon.png"
                    date={String(v.Date.toLocaleString())}
                />
            {/each}
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
                foodkcal={480}
                imgroute="/favicon.png"
                info="가족이 다 같이 먹기 좋은 요리"
            />
            <div
                on:click={() => {
                    showModal = true;
                }}
            >
                <RecipeBlock
                    listname={"감자전"}
                    foodkcal={170}
                    imgroute="/favicon.png"
                    info="믹서기로 간편하게 만드는 요리"
                />
            </div>

            <RecipeBlock
                listname={"치즈제육덮밥"}
                foodkcal={350}
                imgroute="/favicon.png"
                info="간단하게 만들 수 있는 요리"
            />
            <RecipeBlock
                listname={"우유 파스타"}
                foodkcal={205}
                imgroute="/favicon.png"
                info="달달하고 부드러운 맛"
            />
            <RecipeBlock
                listname={"치킨 텐더"}
                foodkcal={174}
                imgroute="/favicon.png"
                info="건강에 좋은 요리"
            />
        </div>
    </div>
</main>
<Modal bind:showModal>
    <h2 slot="header">
        <span style="font-size: larger; font-weight: bolder; color: #6750A4;"
            >간단 레시피 정보</span
        >
        <small class="text-[#6750A4]"
            >&nbsp; 선택하신 음식의 레시피 정보입니다.
        </small>
    </h2>

    <div style=" font-weight: bolder; color: gray;">
        1. 감자는 껍질을 벗겨 강판에 갈아준다. 이때 생기는 감자즙은 버리고,
        슬라이스 양파를 넣어 섞어준다. 감자즙을 버리고 만들어야 밀가루나
        부침가루 양을 적게할 수 있고, 본연의 100%감자맛을 느낄수 있다.
    </div>
    <div style=" font-weight: bolder; color: gray;">
        2. 청량고추 1-2개 분량을 썰어서 넣고 부침가루를 1-2큰술정도와
        소금,후추로 간을한후 섞어준다.
    </div>
    <div style=" font-weight: bolder; color: gray;">
        3. 중약불로 팬을 달구고 기름을 2-3큰술 두른팬에 손바닥만한 사이즈로
        부친다.
    </div>
    <div style=" font-weight: bolder; color: gray;">
        4. 어느정도 한쪽면이 바삭하게 구워질때까지 중약불로 해놓고 기다린다.
        후라이팬에 모양잡은후 약불로 하고 30-40초 정도 놔두었다가 확인하며
        뒤집어보면좋다. 그래야 바닥에 붙지않고 맛있게 부쳐진다
    </div>
    <div style=" font-weight: bolder; color: gray;">
        5. 앞뒤로 한번씩 더 뒤집어 꺼내면 바삭하고 고소한 감자전 완성~!
    </div>
</Modal>

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
