<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import {
        dbinfo,
        loginimg,
        loginname,
        loginemail,
        loginnum,
    } from "$lib/store";
    import { goto } from "$app/navigation";
    import Modal from "$lib/svelte/Modal.svelte";
    let showModal = false;

    const config = {
        type: "line",
        options: {
            animations: {
                tension: {
                    duration: 1000,
                    easing: "linear",
                    from: 1,
                    to: 0,
                    loop: true,
                },
            },
            scales: {
                y: {
                    // defining min and max so hiding the dataset does not change scale range
                    min: 0,
                    max: 100,
                },
            },
        },
    };
    let UserImgSrc: string;
    let name = $loginname;
    let wantkcal = $dbinfo.FoodGoal;
    let email = $loginemail;
    let phonenum = $loginnum;
    loginimg.subscribe((v) => {
        UserImgSrc = v;
    });
    loginname.subscribe((v) => {
        name = v;
    });
    loginemail.subscribe((v) => {
        email = v;
    });

    loginnum.subscribe((v) => {
        if (Boolean(v)) {
            phonenum = v;
        } else {
            phonenum = "등록되어 있지 않음";
        }
    });

    let chartElm: HTMLCanvasElement;
    const date = new Date();
    onMount(() => {
        if (!chartElm) return;
        const ctx = chartElm.getContext("2d");
        const data = [
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 6}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 5}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 4}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 3}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 2}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 1}`,
                count: 0,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 0}`,
                count: 1554,
            },
        ];

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: data.map((row) => row.year),
                datasets: [
                    {
                        label: "1일 소모 칼로리량",
                        data: data.map((row) => row.count),
                    },
                ],
            },

            options: {},
        });
    });
    let fitinfo = [20, "male", 180, 70, "level_1"];
    let fitfit = "maintain weight";
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
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="text-[black] hover:cursor-pointer linear2 text-sm w-32 ml-[180px] mt-[-31px]"
                        style=" border-radius: 5px; border: 3px white solid;"
                        on:click={() => (showModal = true)}
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
                            전화번호 {phonenum}
                        </li>
                        <li class="mt-[-20px] ml-[20px]">
                            최근 1주일 내 스캔 7회
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <div class="pb-5">
        <canvas
            bind:this={chartElm}
            style="background-color: white; border-radius: 10px;"
            height="220"
        >
            <!-- 여기는 이제 highchart 그래프로 실시간 칼로리 소모 현황 표기할 예정
        (백엔드) -->
        </canvas>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="logoutbtn"
        style="line-height: 33px; height: 40px; width: 500px; border: 3px white solid; border-radius: 15px; background-color: rgb(255, 82, 52); font-size: 17px; font-weight: bolder; color: white; text-align: center;  position: relative;"
        on:click={() => {
            goto("/logout");
        }}
    >
        로그아웃
    </div>
</div>
<Modal bind:showModal>
    <h2 slot="header">
        <span style="font-size: larger; font-weight: bolder; color: #6750A4;"
            >칼로리 설정</span
        >
        <small class="text-[#6750A4]"
            >&nbsp; 원하는 목표치 칼로리를 설정해 주세요
        </small>
    </h2>
    <label for="weight">나이 :</label>
    <input
        type="number"
        id="weight"
        style="border: 2px solid black;"
        bind:value={fitinfo[0]}
    />
    <br />
    <label for="sex">성별 :</label>
    <select
        name="sex"
        style="border: 2px solid black;"
        id="sex"
        bind:value={fitinfo[1]}
    >
        <option value="male">남자</option>
        <option value="female">여자</option>
    </select>
    <label for="height">키 :</label>
    <input
        type="number"
        style="border: 2px solid black;"
        id="height"
        bind:value={fitinfo[2]}
    /> <br />

    <label for="weight">체중 :</label>
    <input
        type="number"
        style="border: 2px solid black;"
        id="weight"
        bind:value={fitinfo[3]}
    /> <br />

    <label for="lang">운동량</label>
    <select
        name="exercise"
        style="border: 2px solid black;"
        id="lang"
        bind:value={fitinfo[4]}
    >
        <option value="level_1">조금</option>
        <option value="level_2">보통</option>
        <option value="level_3">많이</option>
    </select> <br />
    <label for="goal">목표</label>

    <select
        name="goal"
        style="border: 2px solid black;"
        id="goal"
        bind:value={fitfit}
    >
        <option value="maintain weight">체중 유지</option>
        <option value="Mild weight loss">아주 조금 체중 줄이기</option>
        <option value="Weight loss">체중 줄이기</option>
        <option value="Extreme weight loss">극도로 체중 줄이기</option>
        <option value="Mild weight gain">아주 조금 체중 늘리기</option>
        <option value="Weight gain">체중 늘리기</option>
        <option value="Extreme weight gain">극도로 체중 늘리기</option>
    </select>
    <br />
    <button
        class="text-[white] text-sm font-extrabold bg-[#f78178] rounded-md p-[2.5px] border-solid border-[3px] border-[white]"
        autofocus
        on:click={async () => {
            const url = `https://fitness-calculator.p.rapidapi.com/dailycalorie?age=${fitinfo[0]}&gender=${fitinfo[1]}&height=${fitinfo[2]}&weight=${fitinfo[3]}&activitylevel=${fitinfo[4]}`;
            console.log(url);
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "51bb7b2215msh62d05ededbe1510p1aac3bjsn4fcefdb9501b",
                    "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com",
                },
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                console.log(result);
                let FoodGoaltest;
                if ((fitfit = "maintain weight")) {
                    FoodGoaltest = result.data.goals["maintain weight"];
                } else {
                    FoodGoaltest = result.data.goals[fitfit].calory;
                }
                $dbinfo.FoodGoal = FoodGoaltest;
                goto("/");
            } catch (error) {
                console.error(error);
            }
        }}>칼로리 값 계산 후 저장하기</button
    >
</Modal>

<style>
    .logoutbtn:hover {
        cursor: pointer;
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
