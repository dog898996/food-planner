import { writable } from 'svelte/store';



export const loginimg = writable("img");
export const loginname = writable("");
export const loginnum = writable("");

export const loginemail = writable("");
export const loading = writable(true);

export const dbinfo = writable({
    UserEmail: "xxx@gmail.com",
    Alarm: {
        Less: "True",
        Over: "True"
    },
    FoodGoal: "1800",
    FoodScanDetail: [
        {
            Date: "20230000",
            FoodName: "음식",
            FoodKcal: "칼로리(숫자)",
            FoodSum: "인분(숫자)"
        },
    ]
})
