import { ThemeConfig } from "antd";

export const THEME_COLOR = {
    // primary: "#012f3d",
    primary: "#116680",
    "light-primary": "#012f3d5f",
    "dark-primary": "#012f3d",
    accentColor: "#777",
    // secondary: "#6dc2be",
    secondary: "#35d4e4",
    "light-secondary": "#6dc2be5f",
    tertiary: "#bf9574",
    background: "#fcf9f6",
    "light-background": "#faf8f2",
    "light-grey": "#f3f3f6",
    border: "#c5cfd2",
    text: "#6f7282",
}

const fontFamily = {
    montserrat: "var(--montserrat)",
    sophia: "var(--sophia)",
}

export const appThemeConfig: ThemeConfig = {
    cssVar: true,
    token: {
        fontFamily: fontFamily.montserrat,
        colorPrimary: THEME_COLOR.primary,
        colorLinkHover: THEME_COLOR.accentColor,
        colorLink: THEME_COLOR.accentColor,
        fontSize: 16
    },
    components: {
        Layout: {
            bodyBg: THEME_COLOR.background,
            siderBg: THEME_COLOR.text,
            headerBg: THEME_COLOR["light-secondary"],
            screenXS: 200,
            fontFamily: fontFamily.montserrat,
            fontSize: 12,
        },
        Table: {
            headerBg: THEME_COLOR.background,
            headerColor: THEME_COLOR.primary,
            rowHoverBg: THEME_COLOR["light-grey"],
            rowSelectedBg: THEME_COLOR["light-grey"],
            rowSelectedHoverBg: THEME_COLOR["light-grey"],
            fontFamily: "arial",
            // fontSizeLG: 16,
            // fontSizeSM: 12,
            fontSize: 14,
            // cellPaddingBlock: 10,
            cellPaddingInline: 4,
            // paddingContentVertical: 0,
        },
        Button: {
            primaryColor: THEME_COLOR.background,
            colorPrimaryBg: THEME_COLOR.primary
        },
        Dropdown: {
            zIndexPopup: 80000,
        },
        Input: {
            colorBgContainer: THEME_COLOR.background,
            hoverBorderColor: 'transparent',
            fontFamily: "helvetica",
            colorBorder: 'transparent',
            controlOutlineWidth: 0,
        },
        InputNumber: {
            colorBgContainer: THEME_COLOR.background,
            hoverBorderColor: 'transparent',
            fontFamily: "helvetica",
            colorBorder: 'transparent',
            controlOutlineWidth: 0,
        },
        Select: {
            colorBgContainer: THEME_COLOR.background,
            zIndexPopup: 80000,
        },
    },

}