<script lang="ts">
    let fileInput;
    let showlist = false;
    const foodlist = [
        ["사과_파이", 300],
        ["베이비_백_립", 300],
        ["바클라바", 300],
        ["카르파초", 300],
        ["스테이크_타르타르", 300],
        ["비트_샐러드", 300],
        ["베녜", 300],
        ["비빔밥", 300],
        ["브레드_푸딩", 300],
        ["브렉퍼스트_부리또", 300],
        ["브루스케타", 300],
        ["시저_샐러드", 300],
        ["칸놀로", 300],
        ["카프레세", 300],
        ["당근_케이크", 300],
        ["세비체", 300],
        ["치즈_케이크", 300],
        ["치즈_플레이트", 300],
        ["치킨_카레", 300],
        ["치킨_퀘사디아", 300],
        ["치킨_윙", 300],
        ["초콜렛_케이크", 300],
        ["초콜렛_무스", 300],
        ["츄러스", 300],
        ["클램_차우더", 300],
        ["클럽_샌드위치", 300],
        ["크랩_케이크", 300],
        ["크렘_브륄레", 300],
        ["크로크_마담", 300],
        ["컵케이크", 300],
        ["데빌드_에그", 300],
        ["도넛", 300],
        ["만두", 300],
        ["완두콩", 300],
        ["에그_베네딕트", 300],
        ["에스카르고", 300],
        ["팔라펠", 300],
        ["필레_미뇽", 300],
        ["피시_앤_칩스", 300],
        ["푸아그라", 300],
        ["감자튀김", 300],
        ["양파_수프", 300],
        ["프렌치_토스트", 300],
        ["오징어튀김", 300],
        ["볶음밥", 300],
        ["프로즌_요거트", 300],
        ["마늘빵", 300],
        ["뇨키", 300],
        ["그리스_샐러드", 300],
        ["구운_치즈_샌드위치", 300],
        ["구운 연어", 300],
        ["과카몰레", 300],
        ["교자", 300],
        ["햄버거", 300],
        ["산라탕", 300],
        ["핫도그", 300],
        ["우에보스_란체로스", 300],
        ["후무스", 300],
        ["아이스크림", 300],
        ["라사냐", 300],
        ["랍스타_비스크", 300],
        ["로브스터_롤", 300],
        ["마카로니_앤_치즈", 300],
        ["마카롱", 300],
        ["미소시루", 300],
        ["담치류", 300],
        ["나초", 300],
        ["오믈렛", 300],
        ["어니언_링", 300],
        ["굴", 300],
        ["팟_타이", 300],
        ["파에야", 300],
        ["팬케이크", 300],
        ["판나_코타", 300],
        ["베이징_카오야", 300],
        ["퍼", 300],
        ["피자", 300],
        ["폭찹", 300],
        ["푸틴", 300],
        ["프라임_립_로스트", 300],
        ["풀드포크_샌드위치", 300],
        ["라면", 300],
        ["라비올리", 300],
        ["레드_벨벳_케이크", 300],
        ["리소토", 300],
        ["사모사", 300],
        ["사시미", 300],
        ["가리비", 300],
        ["해초_샐러드", 300],
        ["슈림프_앤_그릿츠", 300],
        ["볼로네제_스파게티", 300],
        ["까르보나라_스파게티", 300],
        ["춘권", 300],
        ["스테이크", 300],
        ["딸기_쇼트케이크", 300],
        ["스시", 300],
        ["타코", 300],
        ["타코야끼", 300],
        ["티라미수", 300],
        ["참치_타르타르", 300],
        ["와플", 300],
    ];
    let finished;
    const last = () => {
        showlist = false;
    };
</script>

<form>
    <div>
        <label for="bfile">스캔할 음식 이미지 파일을 추가해주세요.</label>
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
                        value.index = foodlist[value.index];
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
    <div>음식 스캔 결과 리스트 (이 중 하나를 선택해 주세요!)</div>
    {#each finished as { value, index }, i}
        <button style="border: 5px rgb(161, 206, 230) solid;" on:click={last(i)}
            ><div>{finished[i].index} : 정확도 {finished[i].value}</div></button
        >
    {/each}
{/if}

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
