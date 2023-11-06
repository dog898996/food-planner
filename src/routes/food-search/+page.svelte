<script lang="ts">
    import { dbinfo } from "$lib/store";
    import Modal from "$lib/svelte/Modal.svelte";
    import { loginemail } from "$lib/store";
    let fileInput;
    let showlist = false;
    const foodlist = [
        ["사과_파이", 237],
        ["베이비_백_립", 341.3],
        ["바클라바", 250],
        ["카르파초", 230],
        ["스테이크_타르타르", 516],
        ["비트_샐러드", 203.8],
        ["베녜", 95],
        ["비빔밥", 400],
        ["브레드_푸딩", 153],
        ["브렉퍼스트_부리또", 394.9],
        ["브루스케타", 217],
        ["시저_샐러드", 44],
        ["칸놀로", 150],
        ["카프레세", 43],
        ["당근_케이크", 414.9],
        ["세비체", 171.6],
        ["치즈_케이크", 321],
        ["치즈_플레이트", 114],
        ["치킨_카레", 160],
        ["치킨_퀘사디아", 262],
        ["치킨_윙", 250],
        ["초콜렛_케이크", 370.7],
        ["초콜렛_무스", 318],
        ["츄러스", 116],
        ["클램_차우더", 55.9],
        ["클럽_샌드위치", 220.4],
        ["크랩_케이크", 266],
        ["크렘_브륄레", 320],
        ["크로크_마담", 389],
        ["컵케이크", 305],
        ["데빌드_에그", 64],
        ["도넛", 353],
        ["만두", 68],
        ["완두콩", 81],
        ["에그_베네딕트", 411],
        ["에스카르고", 170],
        ["팔라펠", 332.9],
        ["필레_미뇽", 267.4],
        ["피시_앤_칩스", 595],
        ["푸아그라", 462],
        ["감자튀김", 311.9],
        ["양파_수프", 22.7],
        ["프렌치_토스트", 229],
        ["오징어튀김", 313],
        ["볶음밥", 250],
        ["프로즌_요거트", 158.9],
        ["마늘빵", 349.9],
        ["뇨키", 250],
        ["그리스_샐러드", 106],
        ["구운_치즈_샌드위치", 357],
        ["구운 연어", 120],
        ["과카몰레", 94],
        ["교자", 135],
        ["햄버거", 294.9],
        ["산라탕", 38.7],
        ["핫도그", 289.7],
        ["우에보스_란체로스", 201.2],
        ["후무스", 166.1],
        ["아이스크림", 207.5],
        ["라사냐", 134.8],
        ["랍스타_비스크", 335],
        ["로브스터_롤", 429],
        ["마카로니_앤_치즈", 164],
        ["마카롱", 180],
        ["미소시루", 80],
        ["담치류", 172.1],
        ["나초", 305.9],
        ["오믈렛", 153.7],
        ["어니언_링", 410.6],
        ["굴", 198.8],
        ["팟_타이", 357],
        ["파에야", 292],
        ["팬케이크", 227.1],
        ["판나_코타", 133.7],
        ["베이징_카오야", 336],
        ["퍼", 2],
        ["피자", 266],
        ["폭찹", 230.6],
        ["푸틴", 500],
        ["프라임_립_로스트", 355],
        ["풀드포크_샌드위치", 420],
        ["라면", 500],
        ["라비올리", 77.4],
        ["레드_벨벳_케이크", 425],
        ["리소토", 311],
        ["사모사", 308],
        ["사시미", 164],
        ["가리비", 111.4],
        ["해초_샐러드", 110],
        ["슈림프_앤_그릿츠", 500],
        ["볼로네제_스파게티", 630],
        ["까르보나라_스파게티", 589],
        ["춘권", 153.9],
        ["스테이크", 270.5],
        ["딸기_쇼트케이크", 250],
        ["스시", 91],
        ["타코", 226.1],
        ["타코야끼", 171],
        ["티라미수", 434],
        ["참치_타르타르", 95],
        ["와플", 291.1],
    ];
    let finished;
    let showModal = false;
    let foodinfo = [0.0001, "음식이름", 0];
</script>

<form>
    <div>
        <label
            for="bfile"
            style="font-size: larger; font-weight: bolder; color: #6750A4;"
            >스캔할 음식 이미지 파일을 추가해주세요.</label
        >
        <input type="file" name="bfile" id="bfile" bind:this={fileInput} />
    </div>

    <div>
        <button
            on:click={async () => {
                if (!fileInput.files || fileInput.files.length === 0) {
                    alert("제대로 된 이미지가 첨부되지 않았습니다");
                    return;
                } else {
                    let formData = new FormData();
                    formData.append("file", fileInput.files[0]);
                    const response = await fetch(
                        "http://192.168.45.154:5000/predict",
                        {
                            method: "POST",
                            body: formData,
                        }
                    );
                    let predictdata_raw = await response.text();
                    let predictdata = JSON.parse(predictdata_raw)[0];
                    // 배열의 각 요소와 해당 인덱스를 객체로 만들어 새 배열을 생성합니다.
                    let indexedData = predictdata.map((value, index) => ({
                        value,
                        index,
                    }));
                    // 값에 따라 내림차순으로 정렬합니다.
                    indexedData.sort((a, b) => b.value - a.value);

                    // 상위 5개의 요소만 선택합니다.
                    let top5 = indexedData.slice(0, 5);
                    top5.map((val, index) => {
                        let value = val;
                        value.index = foodlist[value.index][0];
                        return value;
                    });
                    console.log(top5);
                    finished = top5;
                    showlist = true;
                    // 결과를 출력합니다.
                }
            }}>이미지 제출</button
        >
    </div>
</form>
{#if showlist}
    <div style="font-size: larger; font-weight: bolder; color: #6750A4;">
        음식 스캔 결과 리스트 (이 중 하나를 선택해 주세요!)
    </div>
    {#each finished as { value, index }, i}
        <button
            style="border: 5px rgb(161, 206, 230) solid;"
            on:click={async () => {
                foodinfo = [value, index, i];
                showModal = true;
                $dbinfo.FoodScanDetail = [
                    ...$dbinfo.FoodScanDetail,
                    {
                        Date: new Date(),
                        FoodName: index,
                        FoodKcal: Number(foodlist[i][1]),
                    },
                ];
                await fetch(
                    `/dbserver?email=${$loginemail}&db=${encodeURIComponent(
                        JSON.stringify($dbinfo)
                    )}`,
                    {
                        method: "PUT",
                    }
                );
                showlist = false;
            }}
            ><div>Top {i + 1}</div>
            <div
                style="font-size: larger; font-weight: bolder; color: #6750A4;"
            >
                {finished[i].index} : 정확도 {finished[i].value}
            </div></button
        >
    {/each}
{/if}
<Modal bind:showModal>
    <h2 slot="header">
        <span style="font-size: larger; font-weight: bolder; color: #6750A4;"
            >음식 칼로리 정보</span
        >
        <small class="text-[#6750A4]"
            >&nbsp; 스캔하신 음식의 영양 정보입니다.
        </small>
    </h2>

    <div>스캔한 음식 : {foodinfo[1]}</div>
    <div>스캔 정확도 : {foodinfo[0]}</div>
    <div>음식 칼로리 : {foodlist[foodinfo[2]][1]} kcal</div>
    <a
        href="https://www.google.com/search?q=음식%20{foodinfo[1]
            .toString()
            .replaceAll('_', '%20')}%20영양정보와%20칼로리"
        ><div style=" font-weight: bolder; color: blue">
            여기를 클릭해 정확한 상세 영양정보 검색하기
        </div></a
    >
    <div
        style="font-size: small;font-style: italic; font-weight: bolder; color: gray;"
    >
        제공되는 정보는 평균 수치이며, 조리 방법과 재료에 따라 차이가 있을 수
        있습니다.
    </div>
</Modal>

<style>
    input {
        background-color: #ece6f0; /* Green */
        border: 3px white dashed;
        color: black;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 10px;
    }
    button {
        background-color: #ece6f0;
        padding: 5px;
        border: 5px rgb(230, 161, 161) solid;
        margin: 10px;
        border-radius: 10%;
    }
</style>
