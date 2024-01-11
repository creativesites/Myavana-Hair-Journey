import { useContext } from "react";
import { AlexioContext } from "../Context";
import TypingAnimation from "./TypingAnimation";
import { useGetIdentity, useGetLocale } from "@refinedev/core";

const HomeBanner = () => {
  const { nav, changeNav } = useContext(AlexioContext);
  const { data: user } = useGetIdentity();
  const activePageClass = () => ("home" === nav ? "" : "page--inactive");
  return (
    <div
      className={`page home-banner white-bg ${activePageClass("home")}`}
      id={"home"}
      onClick={() => changeNav("home", false)}
    >
      <div className="container-fluid p-0">
        <div className="row no-gutters full-screen">
          {/* <div className="col-lg-3 col-xl-4 blue-bg">
            <div className="d-flex align-items-end home-user-avtar v-center-box">
              <img src="static/img/user.png" title alt />
            </div>
          </div> */}
          <div className="col-lg-12 col-xl-12">
            <div className="page-scroll">
              <div className="page-content">
                <div className="v-center-box d-flex align-items-center">
                  <div className="home-text">
                    <h6 className="dark-color theme-after">Hello {user?.name? user.name:"There!"}</h6>
                    <h1 className="dark-color blue-after">Craft Your Personal Hair Story</h1>
                    <p style={{color:'rgb(38,31,29)!important'}}>
                    Every Strand Tells a Story: <TypingAnimation />
                    </p>
                    <div className="btn-bar">
                      <a href="#" className="btn btn-theme">
                        Create Your Timeline
                      </a>
                    </div>
                  </div>
                  <ul className="social-icons">
                    <li>
                      <a className="facebook" href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>{" "}
                    <li>
                      <a className="twitter" href="#">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>{" "}
                    <li>
                      <a className="google" href="#">
                        <i className="fab fa-google-plus-g" />
                      </a>
                    </li>{" "}
                    <li>
                      <a className="linkedin" href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeBanner;
