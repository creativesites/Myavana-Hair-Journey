import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    token: {
        colorPrimaryText: "rgba(41, 42, 44, 1)",
        colorTextSecondary: "rgba(41, 42, 44, 0.85)",
        colorTextTertiary: "rgba(41, 42, 44, 0.65)",
        colorPrimary: "#F6BDAA",
        colorBgContainer: "#FFF5EE",
        colorBgLayout: "#FFF5EE",
        colorBorderBg: "#E8E9EA",
        colorLink: "rgba(41, 42, 44, 0.65)!important",
        colorLinkHover: "#d4a494",
        fontFamily:
            "Gill Sans Nova, Twentieth Century, sans-serif",
    },
    components: {
        Typography: {
            colorText: "rgba(41, 42, 44, 1)!important",
            colorTextDescription: "rgba(41, 42, 44, 0.85)",
            colorTextDisabled: "rgba(41, 42, 44, 0.6)",
            colorLink: "rgba(41, 42, 44, 0.65)!important",
            colorLinkHover: "#d4a494",
            fontFamily:
                "Gill Sans Nova, Twentieth Century, sans-serif",
        },
        Card: {
            colorBgContainer: "#eaf5fb",
            headerBg: "#FAFAFA",
            boxShadowTertiary:
                "0px 1px 2px 0px #00000008,0px 1px 6px -1px #000000050px,2px 4px 0px #00000005",
        },
        Table: {
            colorText: "rgba(41, 42, 44, 1)",

        },
        Input: {
            colorBgContainer: "#fff",
        },
        InputNumber: {
            colorBgContainer: "#fff",
        },
        Calendar: {
            colorBgContainer: "#FFFFFF",
        },
        Radio: {
            colorBgContainer: "#fff",
        },
        Select: {
            colorBgContainer: "#fff",
        },
        Menu: {
            colorText: "rgba(41, 42, 44, 0.85)",
            colorTextDescription: "rgba(41, 42, 44, 0.85)",
        },
        Dropdown: {
            colorBgContainer: "#fff",
        },
        
    },
};