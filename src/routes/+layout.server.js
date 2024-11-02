import {guis} from './data.js';


export function load() {
    return {
        links: guis.map((gui) => ({
            name: gui.name,
            link: gui.link,
        })),
        contents: guis.map((gui) => ({
            name: gui.name,
            description: gui.description
        })),
        guis
    }
}