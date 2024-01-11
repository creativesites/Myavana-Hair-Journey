
import { AlexioContext } from "./Context";
import { useGetIdentity, useGetLocale } from "@refinedev/core";
import {
  Avatar,
  Button,
  Dropdown,
  Space
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { DownOutlined } from "@ant-design/icons";

const Header = () => {
  const { changeNav, nav, toggle } = useContext(AlexioContext);
  const { data: user } = useGetIdentity();
  const locale = useGetLocale();
  const { locales } = useRouter();
  const currentLocale = locale();

  const menuItems = [...(locales || [])]
    .sort()
    .map((lang) => ({
      key: lang,
      icon: (
        <span style={{ marginRight: 8 }}>
          <Avatar size={16} src={`/images/flags/${lang}.svg`} />
        </span>
      ),
      label: (
        <Link href="/" locale={lang}>
          {lang === "en" ? "English" : "German"}
        </Link>
      ),
    }));
  return (
    <header className="header theme-bg">
      {/* <Dropdown
          menu={{
            items: menuItems,
            selectedKeys: currentLocale ? [currentLocale] : [],
          }}
        >
          <Button type="text">
            <Space>
              <Avatar size={16} src={`/images/flags/${currentLocale}.svg`} />
              {currentLocale === "en" ? "English" : "German"}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown> */}
      <div className="logo">
      {user?.name && <p>{user.name}</p>}
      
      </div>
      {user?.avatar && <Avatar style={{marginTop:'15px'}} src={user?.avatar} alt={user?.name} />}
      <div className="menu-toggle">
        <button
          className={`menu-button ${toggle ? "menu-button--open" : ""}`}
          onClick={() => changeNav(nav, !toggle)}
        >
          <span>Menu</span>
        </button>
      </div>
    </header>
  );
};
export default Header;
