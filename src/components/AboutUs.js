import SectionContainer from "./SecondaryContainer";
import React, { useEffect } from "react";
import Script from "next/script";
import NoSSR from 'react-no-ssr';
import $ from 'jquery';
const AboutUs = () => {
  useEffect(() => {
    // Initialize the timeline after the component mounts
    $(document).ready(function() {
      new TL.Timeline('timeline-embed', 'https://docs.google.com/spreadsheets/d/1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI/pubhtml');
    });
  }, []);
  return (
    <SectionContainer
      name={"about"}
      extraClass="about-section"
      title={"My Hair Journey"}
      subTitle={"Myavana Hair Journey Timeline"}
      leftImage="static/img/title-1.jpg"
      leftImageTitle={"About Me"}
    >
      <div className="row">
        <div className="col-md-12">
        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="beforeInteractive" />
    <Script src="https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js" strategy="afterInteractive"/>
    <NoSSR onSSR={
    <p>Loading SSR</p>
    }>
      <section id="demo">
        <div id="timeline-embed" style={{width:'100%', height:'500px'}}>
            <div id="timeline"></div>
        </div>
    </section>
    </NoSSR>
    <Script strategy="afterInteractive">
    {`
      document.addEventListener('DOMContentLoaded', function() {
        new TL.Timeline('timeline-embed', 'https://docs.google.com/spreadsheets/d/1cWqQBZCkX9GpzFtxCWHoqFXCHg-ylTVUWlnrdYMzKUI/pubhtml');
      });
    `}
  </Script>
        </div>
      </div>
    </SectionContainer>
  );
};
export default AboutUs;
