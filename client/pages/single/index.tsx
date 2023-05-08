import { MdDelete, MdEdit } from "react-icons/md";

function Single() {
  return (
    <div className="single-container">
      <div className="single-header">
        <div className="single-header-content">
          <div className="single-header-content-tag">
            <span className="single-header-content-tag__item">tag1</span>
            <span className="single-header-content-tag__item">tag1</span>
            <span className="single-header-content-tag__item">tag1</span>
          </div>
          <h1 className="single-header-content-title">
            Lorem ipsum, Quisquam, blanditiis.
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est rerum
            iure nostrum dolores dolore ullam minima consequatur, a nemo ipsam.
          </p>
          <div className="single-header-content-info">
            <div className="single-header-content-info-author">
              <div className="single-header-content-info__avatar">
                <img
                  src="https://basho.fueko.net/content/images/size/w300/2022/03/joshua-oyebanji-kMC1v6rBHMI-unsplash-2.jpg"
                  alt="avatar"
                />
              </div>
              <div className="single-header-content-info__author">
                <span>author</span>
                <small>date</small>
              </div>
            </div>
            <div className="single-header-content-info__action">
              <MdEdit className="action-icon" />
              <MdDelete className="action-icon" />
            </div>
          </div>
        </div>
        <div className="single-header-image">
          <img
            src="https://basho.fueko.net/content/images/size/w1200/2022/03/photo-1640447051222-3023288a492b.jpeg"
            alt="post-img"
          />
        </div>
      </div>
      <div className="single-content">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur,
          impedit? Facilis quae laudantium cum repellat, possimus sint similique
          aperiam temporibus saepe eius praesentium nulla laborum harum culpa
          nisi dolorem accusamus. Accusamus fugiat hic aperiam voluptatum
          incidunt magnam optio quod corporis adipisci esse ea minus inventore
          sint delectus, ad, officia sit quisquam consequuntur quis consequatur
          dicta. Nobis possimus quia nesciunt sequi! Blanditiis assumenda esse
          earum ad aspernatur repellat nulla! Tempora voluptas ea dignissimos
          vitae iusto, placeat ducimus dicta delectus illo, reiciendis repellat
          nesciunt aliquid a beatae ex mollitia consequuntur cumque inventore.
          Aut ratione praesentium voluptatibus, illo, quas, nemo dolorum dicta
          iure consequatur reiciendis repellendus a id assumenda placeat
          cupiditate impedit ab suscipit sit? Fugit corporis saepe iste,
          assumenda nam adipisci dolore! Odit sapiente illum dolore
          reprehenderit cupiditate debitis. Exercitationem amet eum quidem
          eligendi fugit nam totam est! Tempora voluptates unde ipsam aspernatur
          excepturi. Eveniet iste reiciendis harum illo, quos aut cumque.
          Sapiente, ipsum expedita. Deserunt quae cum assumenda eligendi.
          Delectus reprehenderit a ipsam, harum possimus ab vel quasi voluptate
          dolorum animi repudiandae atque aspernatur autem voluptatum quis
          architecto quos fuga nisi! Libero perspiciatis dolor beatae, cum
          facilis tempora corporis explicabo non, accusamus possimus placeat sit
          laudantium neque, officia laborum reprehenderit nihil hic? Assumenda
          asperiores accusantium ex ducimus tenetur incidunt facilis mollitia!
          Quod repellat perferendis blanditiis aut non iure animi, saepe vel
          suscipit totam! Aliquid tenetur quas laudantium, modi ad sapiente
          beatae natus at, reprehenderit minus, soluta reiciendis aperiam cum
          nostrum deserunt. Sed tenetur provident adipisci maxime deserunt, esse
          aut neque aliquam omnis. Quis eveniet deleniti fugiat quasi
          accusantium ad doloribus ut ratione dicta neque! Mollitia non fugit
          quaerat consequatur, totam debitis! Iste, dignissimos praesentium
          numquam consequatur assumenda deserunt fuga sequi architecto
          necessitatibus sunt id cumque ipsam molestiae doloribus beatae
          possimus facilis aspernatur, nam quae quisquam ullam quam odio
          doloremque? Laborum, quae.
        </p>
      </div>
    </div>
  );
}

export default Single;
