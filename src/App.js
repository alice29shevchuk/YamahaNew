import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faShoppingBasket, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
function App() {
  return (
    <div className='MainDiv'>

      {/* Header */}
      <div className="container">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Yamaha_logo.svg/1280px-Yamaha_logo.svg.png" id="logoYamaha"></img>
        </div>
        <div id="divIconsHeader">
          <input placeholder='Search...' className='searchInput' type="text"></input>
          <FontAwesomeIcon className='iconsHeader' id="likeIcon" icon={faHeart} color="#5d16a2" />
          <FontAwesomeIcon className='iconsHeader' icon={faShoppingBasket} color="#5d16a2" />
          <FontAwesomeIcon className='iconsHeader' icon={faUser} color="#5d16a2" />
        </div>
      </div>

      {/* Gallery */}
      <div>
        <Carousel autoPlay='true' infiniteLoop='true' renderArrowPrev={(clickHandler, hasPrev) => {
          return (
            <div
              className={`${hasPrev ? "absolute" : "hidden"
                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
              onClick={clickHandler}
            >
            </div>
          );
        }}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              <div
                className={`${hasNext ? "absolute" : "hidden"
                  } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                onClick={clickHandler}
              >
              </div>
            );
          }}>
          <div>
            <img src="https://yellow.ua/media/adminforms/homepage_slider_banners/1/3/x1300_3.png.pagespeed.ic._UU75rc8Sk.webp" />
          </div>
          <div>
            <img src="https://yellow.ua/media/adminforms/homepage_slider_banners/a/r/xartboard_1_16.png.pagespeed.ic._61jKyeonI.webp" />
          </div>
          <div>
            <img src="https://yellow.ua/media/specialaction/image/a/r/artboard_1_5.png" />
          </div>
        </Carousel>
      </div>
      {/* Popular */}
      <h1 id="contentPopularProducts">Popular products</h1>
      <div class="containerPopular">
        <div class="card_box">
          <span></span>
        </div>
      </div>

      {/* Menu */}
    </div>

  );
}

export default App;
