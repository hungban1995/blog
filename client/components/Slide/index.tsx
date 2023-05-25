import Slider from "react-slick";
import ItemPost from "../ItemPost";
import { post } from "@/pages";

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
interface Props {
  postsSlide: post[];
}
function SlickSlide({ postsSlide }: Props) {
  return (
    <Slider {...settings}>
      {postsSlide.length > 0 &&
        postsSlide.map((post: post, idx: number) => {
          return <ItemPost post={post} key={idx} />;
        })}
    </Slider>
  );
}

export default SlickSlide;
