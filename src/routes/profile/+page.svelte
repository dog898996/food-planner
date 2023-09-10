<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { loginimg, loginname, loginemail, loginnum } from "$lib/store";
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
    let name = "admin";
    let wantkcal = 1000;
    let email = "dog898996@gmail.com";
    let phonenum = "010-0000-0000";
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
                count: 1500,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 5}`,
                count: 2600,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 4}`,
                count: 3800,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 3}`,
                count: 900,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 2}`,
                count: 4220,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 1}`,
                count: 1610,
            },
            {
                year: `${date.getMonth() + 1} / ${date.getDate() - 0}`,
                count: 2835,
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

    sdfd
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
