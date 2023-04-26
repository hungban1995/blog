import Slider from "react-slick";
import ItemBlog from "../ItemBlog";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function SlickSlide() {
  return (
    <Slider {...settings}>
      <ItemBlog />
      <ItemBlog />
      <ItemBlog />
      <ItemBlog />
      <ItemBlog />
    </Slider>
  );
}

export default SlickSlide;
