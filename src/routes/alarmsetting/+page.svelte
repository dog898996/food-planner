<script>
    let switchValue1;
    let switchValue2;
    import Toggle from "$lib/svelte/Toggle.svelte";
</script>

<Toggle
    bind:value={switchValue1}
    label="스캔 횟수 부족 알람 켜기"
    design="slider"
/>
<p>
    알람이 {switchValue1 === "on" ? "켜졌습니다" : "꺼졌습니다."}
</p>

<Toggle
    bind:value={switchValue2}
    label="스캔 횟수 초과 알람 켜기"
    design="slider"
/>
<p>
    알람이 {switchValue2 === "on" ? "켜졌습니다" : "꺼졌습니다."}
</p>

<style>
</style>
