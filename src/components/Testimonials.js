import Slider from "react-slick";
import { sliderProps } from "../sliderProps";
const Testimonials = () => {
  return (
    <div className="testimonial-section m-30px-t sm-m-20px-t pb-5">
      <div className="sub-title m-30px-b">
        <h2 className="dark-color theme-after">What People Say?</h2>
      </div>
      <Slider {...sliderProps.testimonial} id="client-slider-single">
        <div className="testimonial-col">
          <div className="say">
            <p>
            My hair journey with Myavana has been transformative. I've discovered styles that truly express who I am!
            </p>
          </div>
          <div className="user">
            <div className="img">
              <img className='tezstimonialImgF' src="https://hips.hearstapps.com/goodhousekeeping/assets/17/49/regina-king-hairstyle.jpg" alt title />
            </div>
            <div className="name ml-2">
              <span>Emily Gonzalez</span>
              <label>Freelance Writer</label>
            </div>
          </div>
        </div>
        <div className="testimonial-col">
          <div className="say">
            <p>
            From unsure to confident, my hair is not just a style, it's a statement. Thanks to the amazing tips and products!
            </p>
          </div>
          <div className="user">
            <div className="img">
              <img className='tezstimonialImgF' src="https://hips.hearstapps.com/hmg-prod/images/jane-fonda-arrives-for-paramount-pictures-premiere-of-book-news-photo-1573059305.jpg" alt title />
            </div>
            <div className="name ml-2">
              <span>Salma Peters</span>
              <label>Nail Technician</label>
            </div>
          </div>
        </div>
        <div className="testimonial-col">
          <div className="say">
            <p>
            I never knew my hair could look this good. The personalized care and attention to detail are unmatched.
            </p>
          </div>
          <div className="user">
            <div className="img">
              <img className='tezstimonialImgF' src="https://media.glamour.com/photos/6470e14e6d7e8ff7ccf5e400/4:3/w_1065,h_798,c_limit/Collage%20Maker-26-May-2023-12-41-PM-4807.jpg" alt title />
            </div>
            <div className="name ml-2">
              <span>Aisha Patel</span>
              <label>Marketing Manager</label>
            </div>
          </div>
        </div>
      </Slider>{" "}
    </div>
  );
};
export default Testimonials;
