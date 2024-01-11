import React, { useState, useEffect } from "react";
import {
  ThemedLayoutV2,
  ThemedSiderV2,
  ThemedTitleV2,
  useNotificationProvider,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import Head from 'next/head';
import Script from "next/script";
import { AuthBindings, GitHubBanner, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { Header } from "@components/header";
import { ColorModeContextProvider } from "@contexts";
import "@refinedev/antd/dist/reset.css";
import "styles/custom.css";
import "styles/globals.css";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { ConfigProvider, theme } from "antd";
import { appWithTranslation, useTranslation } from "next-i18next";
import { AppIcon } from "src/components/app-icon";
import { themeConfig } from "config";
import Preloader from "src/Preloader";

const API_URL = "https://api.fake-rest.refine.dev";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  noLayout?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: React.PropsWithChildren) => {
  const { t, i18n } = useTranslation();

  const { data, status } = useSession();
  const router = useRouter();
  const { to } = router.query;
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  if (status === "loading") {
    return <Preloader/>;
  }

  const authProvider: AuthBindings = {
    login: async () => {
      signIn("google", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
          <ConfigProvider
                theme={themeConfig}
            >
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(API_URL)}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "timeline",
                  list: "/timeline",
                  create: "/timeline/create",
                  edit: "/timeline/edit/:id",
                  show: "/timeline/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  show: "/categories/show/:id",
                  meta: {
                    canDelete: true,
                  },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
              }}
            >
              {props.children}
              {/* <RefineKbar /> */}
              <UnsavedChangesNotifier />
            </Refine>
            </ConfigProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout): JSX.Element {
  const [timelineData, setTimelineData] = useState(null);

  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <>
      <Head>
        {/* Import Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Mukta+Vaani:wght@500&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@300&amp;display=swap" rel="stylesheet" />
       
        <link title="timeline-styles" rel="stylesheet" 
              href="https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css"></link>
        
      </Head>
      <ThemedLayoutV2
        Header={() => <Header sticky />}
        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            text=""
            icon={<AppIcon />}
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
      <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        <Script id="timeline-script" strategy="afterInteractive">
          {`
            $(document).ready(function() {
              function createNewTimeline(data) {
                $("#timeline-embed").empty();
                window.timeline = new TL.Timeline('timeline-embed', data, {});

                if ($("#timeline-embed").height() == 0) {
                  setTimeout(function() {
                    $("#timeline-embed").height($(document).height() - $(".nav-tabs").height() - 100);
                    window.timeline.updateDisplay();
                  }, 500);
                }
              }

              fetch('config/test.json')
                .then(response => response.json())
                .then(data => createNewTimeline(data));

              $("#timeline-embed").height($(document).height() - $(".nav-tabs").height() - 100);
            });
          `}
        </Script>

      </>
      
    );
  };

  return (
    <SessionProvider session={session}>
      <App>{renderComponent()}</App>
    </SessionProvider>
  );
}

const testData = {
  "title": {
      "media": {
        "url": "//www.flickr.com/photos/tm_10001/2310475988/",
        "caption": "Whitney Houston performing on her My Love is Your Love Tour in Hamburg.",
        "credit": "flickr/<a href='http://www.flickr.com/photos/tm_10001/'>tm_10001</a>"
      },
      "text": {
        "headline": "Whitney Houston<br/> 1963 - 2012",
        "text": "<p>Houston's voice caught the imagination of the world propelling her to superstardom at an early age becoming one of the most awarded performers of our time. This is a look into the amazing heights she achieved and her personal struggles with substance abuse and a tumultuous marriage.</p>"
      }
  },
  "events": [
    {
      "media": {
        "url": "{{ static_url }}/img/examples/houston/family.jpg",
        "caption": "Houston's mother and Gospel singer, Cissy Houston (left) and cousin Dionne Warwick.",
        "credit": "Cissy Houston photo:<a href='http://www.flickr.com/photos/11447043@N00/418180903/'>Tom Marcello</a><br/><a href='http://commons.wikimedia.org/wiki/File%3ADionne_Warwick_television_special_1969.JPG'>Dionne Warwick: CBS Television via Wikimedia Commons</a>"
      },
      "start_date": {
        "month": "8",
        "day": "9",
        "year": "1963"
      },
      "text": {
        "headline": "A Musical Heritage",
        "text": "<p>Born in New Jersey on August 9th, 1963, Houston grew up surrounded by the music business. Her mother is gospel singer Cissy Houston and her cousins are Dee Dee and Dionne Warwick.</p>"
      }
    },
    {
      "media": {
        "url": "https://youtu.be/fSrO91XO1Ck",
        "caption": "",
        "credit": "<a href=\"http://unidiscmusic.com\">Unidisc Music</a>"
      },
      "start_date": {
        "year": "1978"
      },
      "text": {
        "headline": "First Recording",
        "text": "At the age of 15 Houston was featured on Michael Zager's song, Life's a Party."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/_gvJCCZzmro",
        "caption": "A young poised Whitney Houston in an interview with EbonyJet.",
        "credit": "EbonyJet"
      },
      "start_date": {
        "year": "1978"
      },
      "text": {
        "headline": "The Early Years",
        "text": "As a teen Houston's credits include background vocals for Jermaine Jackson, Lou Rawls and the Neville Brothers. She also sang on Chaka Khan's, 'I'm Every Woman,' a song which she later remade for the <i>Bodyguard</i> soundtrack which is the biggest selling soundtrack of all time. It sold over 42 million copies worldwide."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/H7_sqdkaAfo",
        "caption": "I'm Every Women as performed by Whitney Houston.",
        "credit": "Arista Records"
      },
      "start_date": {
        "year": "1978"
      },
      "text": {
        "headline": "Early Album Credits",
        "text": "As a teen Houston's credits include background vocals for Jermaine Jackson, Lou Rawls and the Neville Brothers. She also sang on Chaka Khan's, 'I'm Every Woman,' a song which she later remade for the <i>Bodyguard</i> soundtrack which is the biggest selling soundtrack of all time. It sold over 42 million copies worldwide."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/A4jGzNm2yPI",
        "caption": "Whitney Houston and Clive Davis discussing her discovery and her eponymous first album.",
        "credit": "Sony Music Entertainment"
      },
      "start_date": {
        "year": "1983"
      },
      "text": {
        "headline": "Signed",
        "text": "Houston is signed to Arista Records after exec Clive Davis sees her performing on stage with her mother in New York."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/m3-hY-hlhBg",
        "caption": "The 'How Will I Know' video showcases the youthful energy that boosted Houston to stardom.",
        "credit": "Arista Records Inc."
      },
      "start_date": {
        "year": "1985"
      },
      "text": {
        "headline": "Debut",
        "text": "Whitney Houston's self titled first release sold over 12 million copies in the U.S. and included the hit singles 'How Will I Know,' 'You Give Good Love,' 'Saving All My Love For You' and 'Greatest Love of All.'"
      }
    },
    {
      "media": {
        "url": "https://youtu.be/v0XuiMX1XHg",
        "caption": "Dionne Warwick gleefully announces cousin, Whitney Houston, the winner of the Best Female Pop Vocal Performance for the song Saving All My Love.",
        "credit": "<a href='http://grammy.org'>The Recording Academy</a>"
      },
      "start_date": {
        "year": "1986"
      },
      "text": {
        "headline": "'The Grammys'",
        "text": "In 1986 Houston won her first Grammy for the song Saving All My Love. In total she has won six Grammys, the last of which she won in 1999 for It's Not Right But It's Okay."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/eH3giaIzONA",
        "caption": "I Wanna Dance With Somebody",
        "credit": "Arista Records Inc."
      },
      "start_date": {
        "year": "1987"
      },
      "text": {
        "headline": "'Whitney'",
        "text": "Multiplatinum second album sells more than 20 million copies worldwide. With 'Whitney', Houston became the first female artist to produce four number 1 singles on one album including \"I Wanna Dance With Somebody,' 'Didn't We Almost Have It All,' 'So Emotional' and 'Where Do Broken Hearts Go.'"
      }
    },
    {
      "media": {
        "url": "https://youtu.be/96aAx0kxVSA",
        "caption": "\"One Moment In Time\" - Theme song to the 1988 Seoul Olympics",
        "credit": "Arista Records Inc."
      },
      "start_date": {
        "year": "1988"
      },
      "text": {
        "headline": "\"One Moment In Time\"",
        "text": "The artist's fame continues to skyrocket as she records the theme song for the Seoul Olympics, 'One Moment In Time.'"
      }
    },
    {
      "media": {
        "url": "",
        "caption": "",
        "credit": ""
      },
      "start_date": {
        "year": "1989"
      },
      "text": {
        "headline": "Bobby Brown",
        "text": "Houston and Brown first meet at the Soul Train Music Awards. In an interview with Rolling Stone Magazine, Houston admitted that it was not love at first sight. She turned down Brown's first marriage proposal but eventually fell in love with him."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/5Fa09teeaqs",
        "caption": "CNN looks back at Houston's iconic performance of the national anthem at Superbowl XXV.",
        "credit": "CNN"
      },
      "start_date": {
        "year": "1991"
      },
      "text": {
        "headline": "Super Bowl",
        "text": "Houston's national anthem performance captures the hearts and minds of Americans ralllying behind soldiers in the Persian Guf War."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/h9rCobRl-ng",
        "caption": "\"Run To You\" from the 1992 \"Bodyguard\" soundtrack..",
        "credit": "Arista Records"
      },
      "start_date": {
        "year": "1992"
      },
      "text": {
        "headline": "\"The Bodyguard\"",
        "text": "Houston starred opposite Kevin Costner in the box office hit, The Bodyguard. The soundtrack to the movie sold over 44 million copies worldwide  garnering 3 Grammy's for the artist."
      }
    },
    {
      "media": {
        "url": "https://youtu.be/5cDLZqe735k",
        "caption": "Bobby Brown performing \"My Prerogrative,\" from his \"Don't be Cruel\" solo album. Bobby Brown first became famous with the R&B group, New Edition.",
        "credit": ""
      },
      "start_date": {
        "year": "1992"
      },
      "text": {
        "headline": "Married Life",
        "text": "<p>After three years of courtship, Houston marries New Edition singer Bobby Brown. Their only child Bobbi Kristina Brown was born in 1993.</p><p>In 2003 Brown was charged with domestic violence after police responded to a domestic violence call. Houston and Brown were featured in the reality show, \"Being bobby Brown,\" and divorced in 2007.</p>"
      }
    },
    {
      "media": {
        "url": "//upload.wikimedia.org/wikipedia/commons/d/dd/ABC_-_Good_Morning_America_-_Diane_Sawyer.jpg",
        "caption": "Diane Sawyer ",
        "credit": "flickr/<a href='http://www.flickr.com/photos/23843757@N00/194521206/'>Amanda Benham</a>"
      },
      "start_date": {
        "year": "2002"
      },
      "text": {
        "headline": "Crack is Whack",
        "text": "<p>Houston first publicly admitted to drug use in an interview with Diane Sawyer. The singer coined the term \"Crack is Whack,\" saying that she only used more expensive drugs.</p>"
      }
    },
    {
      "media": {
        "url": "https://youtu.be/KLk6mt8FMR0",
        "caption": "Addiction expert, Dr. Drew, talks about Whitney's death and her struggle with addiction.",
        "credit": "CNN"
      },
      "start_date": {
        "year": "2004"
      },
      "text": {
        "headline": "Rehab",
        "text": "<p>Houston entered rehab several times beginning in 2004. She declared herself drug free in an interview with Oprah Winfrey in 2009 but returned to rehab in 2011.</p>"
      }
    },
    {
      "media": {
        "url": "",
        "caption": "",
        "credit": ""
      },
      "start_date": {
        "year": "2005"
      },
      "text": {
        "headline": "Being Bobby Brown",
        "text": "<p>Being Bobby Brown was a reality show starring Brown and wife Whitney Houston. Houston refused to sign for a second season. A clip of her telling Brown to \"Kiss my ass,\" became a running gag on The Soup.</p>"
      }
    },
    {
      "media": {
        "url": "",
        "caption": "",
        "credit": ""
      },
      "start_date": {
        "year": "2010"
      },
      "text": {
        "headline": "A Rocky Comeback",
        "text": "<p>Houston's comeback tour is cut short due to a diminished voice damaged by years of smoking. She was reportedly devastated at her inability to perform like her old self.</p>"
      }
    },
    {
      "media": {
        "url": "//twitter.com/Blavity/status/851872780949889024",
        "caption": "Houston, performing on Good Morning America in 2009.",
        "credit": "<a href='http://commons.wikimedia.org/wiki/File%3AFlickr_Whitney_Houston_performing_on_GMA_2009_4.jpg'>Asterio Tecson</a> via Wikimedia"
      },
      "start_date": {
        "month": "2",
        "day": "11",
        "year": "2012"
      },
      "text": {
        "headline": "Whitney Houston<br/> 1963-2012",
        "text": "<p>Houston, 48, was discovered dead at the Beverly Hilton Hotel on  on Feb. 11, 2012. She is survived by her daughter, Bobbi Kristina Brown, and mother, Cissy Houston.</p>"
      }
    }
  ]
}
export default appWithTranslation(MyApp);
