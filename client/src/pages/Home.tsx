import SlickSlide from "../components/Slide";
import ItemBlog from "../components/ItemBlog";

function Home() {
  return (
    <div className="home-container">
      <div className="home-title-blog">
        <h1>
          <span>Hey there!</span> See our thoughts, stories and ideas.
        </h1>
      </div>
      <div className="home-featured-blog">
        <h1>Get started with our best stories</h1>
        <SlickSlide />
      </div>
      <div className="home-recent-blog">
        <h1>See what we’ve written lately</h1>
        <div className="home-recent-blog-items">
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
        </div>
        <div className="home-recent-blog-action">
          <span>Load more</span>
        </div>
      </div>
      <div className="home-recommend-blog">
        <h1>Recommended</h1>
        <div className="home-recommend-blog-items">
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
          <ItemBlog />
        </div>
      </div>
    </div>
  );
}

export default Home;
