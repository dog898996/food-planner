import type { RequestHandler } from "./$types";
import { marked } from 'marked'
import { mangle } from "marked-mangle";
export const GET:RequestHandler = async () =>{
    const res = await fetch("https://raw.githubusercontent.com/dog898996/food-planner/main/README.md")
    let str = `<style>
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #6750a4;
        border-radius: 10px;
        background-clip: padding-box;
        border: 2px solid transparent;
    }
    ::-webkit-scrollbar-track {
        background-color: #d0bcff;
        border-radius: 10px;
        box-shadow: inset 0px 0px 5px white;
    }
</style>`;
    str += marked.parse(await res.text())
    return new Response(str, {
        headers:{
            'Content-Type':'text/html'
        }
    });
}