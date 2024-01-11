import { useContext } from "react";
import { AlexioContext } from "../Context";
import SectionTitle from "./SectionTitle";

const SectionContainer = ({
  extraClass,
  name,
  children,
  title,
  subTitle,
  leftImage,
  leftImageTitle,
}) => {
  const { nav, changeNav } = useContext(AlexioContext);
  const activePageClass = () => (name === nav ? "" : "page--inactive");
  return (
    <div
      className={`page ${extraClass} white-bg ${activePageClass(name)}`}
      id={name}
      onClick={() => changeNav(name, false)}
    >
      {" "}
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          
          <div className="col-lg-12 col-xl-12">
            <div className="page-scroll">
              <div className="page-content">
                {/* 
      ==========================
        Page Titel
      ==========================
      */}
                <SectionTitle title={title} subTitle={subTitle} />
                {/* 
      ==========================
        Contact Us
      ==========================
      */}
                {children}
              </div>{" "}
              {/* page-content */}
            </div>{" "}
            {/* page-scroll  */}
          </div>
        </div>{" "}
        {/* row */}
      </div>
    </div>
  );
};
export default SectionContainer;
