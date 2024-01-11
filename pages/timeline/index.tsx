import { AntdListInferencer } from "@refinedev/inferencer/antd";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Script from "next/script";
import NoSSR from 'react-no-ssr';
import $ from 'jquery';
import MainApp from "../dashboard";

export default function BlogPostList() {
  
  return (
    <>
    <MainApp />
    
    {/* <AntdListInferencer /> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!session) {
    return {
      props: {
        ...translateProps,
      },
      redirect: {
        destination: `/login?to=${encodeURIComponent("/timeline")}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...translateProps,
    },
  };
};
