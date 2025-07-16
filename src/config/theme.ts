import { ThemeConfig } from "antd";

export const THEME_COLOR = {
    primary: "#1e1911",
    "light-primary": "#012f3d5f",
    "dark-primary": "#012f3d",
    accentColor: "#e6e6e6",
    // secondary: "#35d4e4",
    secondary: "#bc8c0b",
    "light-secondary": "#6dc2be5f",
    tertiary: "#ff5400",
    background: "#f4f4f4",
    "light-background": "#faf8f2",
    "light-grey": "#f3f3f6",
    border: "#c5cfd2",
    text: "#6f7282",
}

const fontFamily = {
    play: "var(--play)",
    capriola: "var(--capriola)",
}

export const appThemeConfig: ThemeConfig = {
    cssVar: true,
    token: {
        fontFamily: fontFamily.play,
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
            fontFamily: fontFamily.play,
            fontSize: 12,
        },
        Table: {
            headerBg: THEME_COLOR.background,
            headerColor: THEME_COLOR.primary,
            rowHoverBg: THEME_COLOR["light-grey"],
            rowSelectedBg: THEME_COLOR["light-grey"],
            rowSelectedHoverBg: THEME_COLOR["light-grey"],
            fontFamily: fontFamily.play,
            fontSize: 14,
            cellPaddingInline: 15,
            cellPaddingBlock: 0,
            paddingContentHorizontal: 10,
            padding: 0
        },
        Form: {
            labelFontSize: 12,
            verticalLabelMargin: "-6px 0"
        },
        Button: {
            primaryColor: THEME_COLOR.background,
            colorPrimaryBg: THEME_COLOR.primary,
            boxShadow: 'none',
            primaryShadow: "transparent",
        },
        Dropdown: {
            fontSize: 13,
            paddingContentVertical: 4,
        },
        Input: {
            colorBgContainer: THEME_COLOR["light-grey"],
            hoverBorderColor: 'transparent',
            fontFamily: "helvetica",
            colorBorder: 'transparent',
            controlOutlineWidth: 0,
            borderRadius: 0,
            colorBgBase: THEME_COLOR["light-grey"]
        },
        InputNumber: {
            colorBgContainer: THEME_COLOR.background,
            hoverBorderColor: 'transparent',
            fontFamily: "helvetica",
            colorBorder: 'transparent',
            controlOutlineWidth: 0,
        },
        Select: {
            // colorBgContainer: THEME_COLOR.background,
            // colorBgTextHover: THEME_COLOR["light-grey"],
            // colorBgSolidHover: THEME_COLOR["light-grey"],
            // controlItemBgActiveHover: THEME_COLOR["light-grey"],
            // colorBgTextActive: THEME_COLOR["light-grey"],
            // colorFill: THEME_COLOR["light-grey"],
            optionActiveBg: THEME_COLOR["light-grey"],
            optionSelectedBg: THEME_COLOR["text"],
            optionSelectedColor: THEME_COLOR["light-grey"]
        },
    },

}