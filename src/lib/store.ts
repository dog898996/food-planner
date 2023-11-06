import { writable } from 'svelte/store';



export const loginimg = writable("img");
export const loginname = writable("");
export const loginnum = writable("");

export const loginemail = writable("");
export const loading = writable(true);

export const dbinfo = writable({
    UserEmail: "xxx@gmail.com",

    FoodGoal: "1800",
    FoodScanDetail: [
        {
            Date: new Date(),
            FoodName: "음식",
            FoodKcal: 0,
        },
    ]
})
