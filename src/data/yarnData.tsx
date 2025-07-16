import { ASSETS_URL } from "@/assets";
import { StaticImageData } from "next/image";

type TYarnProps = {
    id: string;
    image: string | StaticImageData;
    name: string;
    description: string;
}

export const yarnData: TYarnProps[] =
    [
        {
            id: "8x2a9ve3640",
            name: "Wool Yarn",
            image: ASSETS_URL["yarn_whitebrown_babywear"],
            description: "Wool yarn is made from sheep's fleece. There are many different types of wool, and they can be spun into different weights and textures for yarn. Benefits of  wool yarn include its warmth, and that it accepts color very well. Merino wool yarn is popular for knitting/crocheting garments.",
        },
        {
            id: "8x2a9ve3641",
            name: "Fleece Yarn",
            image: ASSETS_URL["yarn_greenmilk_babywear"],
            description: "Fleece yarn includes mohair, angora, and cashmere.Mohair is a thick yarn from the Angora goat, and has a fuzzy appearance.Angora is from Angora rabbits with very soft fur, also with a fuzzy appearance.Cashmere is from the undercoat of Cashmere goats and is more expensive - it is very smooth while still warm.",
        },
        {
            id: "8x2a9ve3642",
            name: "Cotton Yarn",
            image: ASSETS_URL["yarn_redblackcap"],
            description: "This yarn is from the cotton plant, and many types of cotton yarn are treated with chemicals that make them more durable, mildew resistant, and better accepting of dyes.",
        },
        {
            id: "8x2a9ve3643",
            name: "Silk Yarn",
            image: ASSETS_URL["yarn_underwear"],
            description: "Silk yarn is very smooth and light but does not have much stretch.It is typically combined with other fibers to create a yarn.When combined with cashmere, it creates an incredibly luxurious yarn.",
        },
    ]