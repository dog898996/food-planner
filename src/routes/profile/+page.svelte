<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "highcharts/es-modules/Core/Chart/Chart.js";
    import LineSeries from "highcharts/es-modules/Series/Line/LineSeries.js";
    let UserImgSrc: string;
    onMount(() => {
        UserImgSrc = `https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${Math.random()}`;
    });
    const name = "admin";
    const wantkcal = 1000;
    const email = "dog898996@gmail.com";
</script>

<div class="profile-container">
    <div class="w-[100%] h-[250px] bg-zinc-200 linear mx-auto shadow-gray">
        <div class="flex items-center pt-8">
            <div
                class="m-3 w-44 h-44 bg-zinc-200 rounded-full border-[7px] border-zinc-200 border-[#ffffff] flex-col justify-center items-center inline-flex"
            >
                <!-- svelte-ignore a11y-missing-attribute -->
                <img class="w-44 h-44 rounded-full" src={UserImgSrc} />
            </div>
            <div class="flex items-center flex-col">
                <div
                    class="mb-[13px] ml-[-100px] text-[#614A70] text-center leading-[43px] w-60 h-12 relative bg-white rounded-3xl text-2xl font-black"
                >
                    {name}님
                    <div
                        class="text-[black] linear2 text-sm w-32 ml-[180px] mt-[-31px]"
                        style=" border-radius: 5px; border: 3px white solid;"
                    >
                        목표 칼로리 변경
                    </div>
                </div>

                <ul style="list-style: disc;">
                    <div
                        class="float-left text-center leading-[43px] w-60 h-12 relative bg-white rounded-3xl text-sm font-black"
                    >
                        <li class="mt-[-20px] ml-[20px]">
                            이메일 {email}
                        </li>
                        <li class="mt-[-20px] ml-[20px]">
                            목표 칼로리 {wantkcal}kcal
                        </li>
                        <li class="mt-[-20px] ml-[20px]">
                            최근 1주일 내 스캔 7회
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <div>
        여기는 이제 highchart 그래프로 실시간 칼로리 소모 현황 표기할 예정
        (백엔드)
    </div>
</div>

<style>
    .chartbox {
        height: 320px;
        background: #ece6f0;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 28px;
    }
    .linear {
        background: linear-gradient(
            #f2f7c6 0 4%,
            #f8dff2 41% 47%,
            white 47% 50%,
            #d0bcff 50% 100%
        );
    }
    .linear2 {
        background: linear-gradient(90deg, #b3f4f9 0 1%, #fab9ec 99% 100%);
    }
    li {
        float: left;
    }
</style>
