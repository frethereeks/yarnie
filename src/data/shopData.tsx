import { ASSETS_URL } from "@/assets";
import { StaticImageData } from "next/image";

export type TShopDataProps = {
    id: string;
    name: string;
    slug: string;
    image: string | StaticImageData;
    price: number;
    description: string;
    popular: boolean
}

export const shopData: TShopDataProps[] = [
    {
        id: "82x9a3i460",
        name: 'Red and Black Baby Cap',
        slug: 'red-and-black-baby-cap',
        image: ASSETS_URL['yarn_redblackcap'],
        price: 3500,
        popular: false,
        description: "Unlock the full potential of your fashion drive with our Red and Black Baby Cap. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i461",
        name: 'Original Silver Loom',
        slug: 'original-silver-loom',
        image: ASSETS_URL['surene_palvie_plate'],
        price: 5500,
        popular: true,
        description: "Unlock the full potential of your fashion drive with our Original Silver Loom. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i462",
        name: 'Red Carton Cap',
        slug: 'red-carton-cap',
        image: ASSETS_URL['yarn_redcartoncap'],
        price: 2000,
        popular: false,
        description: "Unlock the full potential of your fashion drive with our Red Carton Cap. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i463",
        name: 'Quality Red Loom',
        slug: 'quality-red-loom',
        image: ASSETS_URL['surene_palvie_loom'],
        price: 6499,
        popular: true,
        description: "Unlock the full potential of your fashion drive with our Quality Red Loom. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i464",
        name: 'Hand-stitched Female Underwear',
        slug: 'yarn_underwear',
        image: ASSETS_URL['yarn_underwear'],
        price: 5250,
        popular: false,
        description: "Unlock the full potential of your fashion drive with our Hand-stitched Female Underwear. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i465",
        name: 'Pink-white Baby Wear',
        slug: 'yarn_pinkwhite_babywear',
        image: ASSETS_URL['yarn_pinkwhite_babywear'],
        price: 3499,
        popular: false,
        description: "Unlock the full potential of your fashion drive with our Pink-white Baby Wear. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i466",
        name: 'Yarn Assorted Colors',
        slug: 'yarn_assortedcolors',
        image: ASSETS_URL['yarn_assortedcolors'],
        price: 9720,
        popular: false,
        description: "Unlock the full potential of your fashion drive with our Yarn Assorted Colors. It helps you learn the art of simplicity and elegance in one move",
    },
    {
        id: "82x9a3i467",
        name: 'Crochet Beach Bag Pattern',
        slug: 'crochet_beach_bag_pattern',
        image: ASSETS_URL['crochet_beach_bag_pattern'],
        price: 8400,
        popular: true,
        description: "Unlock the full potential of your fashion drive with our Crochet Beach Bag Pattern. It helps you learn the art of simplicity and elegance in one move",
    },
]