import axios, { Axios } from 'axios';
import './Main.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser, faShoppingBasket, faBan } from '@fortawesome/fontawesome-free-solid'
import { useCallback, useEffect, useState } from 'react';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import MultiRangeSlider from "multi-range-slider-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import * as Scroll from 'react-scroll';
import { Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import Modal from './Modal';
function Main() {
    let scroll = Scroll.animateScroll;
    function ToTop() {
        scroll.scrollToTop();
    };
    const [modalActive,setModalActive] = useState(false);
    const [popProduct, setPopProduct] = useState(false);
    const [minValue, set_minValue] = useState(13499);
    const [maxValue, set_maxValue] = useState(81689);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };
    const [iteratorProuctNow, setiteratorProuctNow] = useState(-1);
    const [countBasketProduct,setCountBasketProduct] = useState(0);
    // useEffect(()=>{
    //     console.log(countBasketProduct);
    // },[countBasketProduct]);
    useEffect(() => {
        if (popProduct === false) {
            setPopProduct(true);
            //
            //  popular products
            //
            axios({
                method: 'get',
                url: 'https://shop20230228183528.azurewebsites.net/api/ControllerClass/GetPopularProducts',
                dataType: "dataType",
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            }).then(popular => {
                var cardsPopular = document.getElementById('containerPopular');
                for (const itPop of popular['data']['value']) {
                    console.log(itPop);
                    if (itPop['status'] === 'Enabled') {
                        var divPopular = document.createElement('div');
                        divPopular.className = "card_box";
                        var spanPopular = document.createElement('span');
                        var picturePopular = document.createElement('img');
                        picturePopular.src = itPop['uriPhoto'];
                        picturePopular.className = "picturePopularCard";
                        var titlePopular = document.createElement('h2');
                        titlePopular.textContent = itPop['title'] + ' ' + itPop['model'];
                        divPopular.append(spanPopular);
                        divPopular.append(picturePopular);
                        divPopular.append(titlePopular);
                        cardsPopular.append(divPopular);
                    }
                }
            });
        }
        axios({
            method: 'get',
            url: 'https://shop20230228183528.azurewebsites.net/api/ControllerClass/GetAllCategory',
            dataType: "dataType",
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        }).then(data => {
            var menuDiv = document.getElementsByClassName('menu');
            var nav = document.createElement('nav');
            var ul = document.createElement('ul');
            nav.append(ul);
            menuDiv[0].innerHTML = '';
            for (const iterator of data['data']['value']) {
                var li = document.createElement('li');
                li.textContent = iterator['title'];
                li.className = "menuCategory";
                li.addEventListener('click', () => {
                    setiteratorProuctNow(iterator['id']);
                    axios({
                        method: 'get',
                        url: `https://shop20230228183528.azurewebsites.net/api/ControllerClass/GetProductsByID?id=${iterator['id']}`,
                        dataType: "dataType",
                        headers: {
                            'Accept': '*/*',
                            'Content-Type': 'application/json'
                        }
                    }).then(product => {
                        var cardsDiv = document.getElementById('cardsDiv');
                        cardsDiv.innerHTML = '';
                        for (const iter of product['data']['value']) {
                            if (iter['status'] === 'Enabled') {
                                var card = document.createElement('div');
                                card.className = "cards";
                                var title = document.createElement('h2');
                                title.textContent = iter['title'] + ' ' + iter['model'];
                                title.className = "titleProduct";
                                var picture = document.createElement('img');
                                picture.src = iter['uriPhoto'];
                                picture.className = "pictureCard";
                                var price = document.createElement('h3');
                                price.textContent = iter['price'] + ' грн.';
                                var buy = document.createElement('button');
                                buy.textContent = "BUY";
                                buy.className = "btnBuy";
                                buy.id = iter['id'];
                                buy.addEventListener('click',()=>{
                                    // setCountBasketProduct(countBasketProduct + 1);
                                    alert('Товар добавлен в корзину!');
                                    // setCountBasketProduct(countBasketProduct + 1);
                                    //// 
                                    ////
                                    var basketDiv = document.getElementById('basketCardsDiv');
                                    var basketCard = document.createElement('div');
                                    basketCard.className="basketCard";
                                    var titleBasket = document.createElement('h2');
                                    titleBasket.textContent = iter['title'] + ' ' + iter['model'];
                                    titleBasket.className = "titleBasketProduct";
                                    var pictureBasket = document.createElement('img');
                                    pictureBasket.src = iter['uriPhoto'];
                                    pictureBasket.className = "pictureBasketCard";
                                    var priceBasket = document.createElement('h3');
                                    priceBasket.textContent = 'Цена: ' + iter['price'] + ' грн';
                                    priceBasket.className = "priceBasket";

                                    var isEmptyBasketTextContent = document.getElementById('isEmptyBasket');
                                    isEmptyBasketTextContent.innerHTML='';
                                    basketCard.append(titleBasket);
                                    basketCard.append(pictureBasket);
                                    basketCard.append(priceBasket);
                                    basketDiv.append(basketCard);
                                    var arrCardsBasket = document.getElementsByClassName('basketCard');
                                    console.log(arrCardsBasket.length);
                                    setCountBasketProduct(arrCardsBasket.length);
                                    var listBuyButton = document.getElementsByClassName('btnBuy');
                                    for (const btn of listBuyButton) {
                                        if (btn.id == iter['id']) {
                                            btn.disabled = true;
                                            btn.setAttribute('class','btnEnabled');
                                        }
                                    }
                                })
                                card.append(picture);
                                card.append(title);
                                card.append(price);
                                card.append(buy);
                                cardsDiv.append(card);
                            }
                        }
                    });
                });
                ul.append(li);
                menuDiv[0].append(nav);
            }
        });
    })
    return (
        <div>
            <div className="containerС">
                <div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Yamaha_logo.svg/1280px-Yamaha_logo.svg.png" id="logoYamaha"></img>
                </div>
                <div id="divIconsHeader">
                    <Modal active={modalActive} setActive={setModalActive}>
                        <h1 style={{color:"#7e4fd4"}}>Корзина</h1>
                        <h4 style={{marginLeft:"11px"}} id='isEmptyBasket'>В данный момент корзина пуста...</h4>
                        <div id='basketCardsDiv'></div>
                    </Modal>
                    <input placeholder='Search...' className='searchInput' type="text"></input>
                    <FontAwesomeIcon className='iconsHeader' id="likeIcon" icon={faHeart} color="#5d16a2" />
                    <h1 style={{color:"red"}}>{countBasketProduct}</h1>
                    <FontAwesomeIcon className='iconsHeader' icon={faShoppingBasket} color="#5d16a2" onClick={() => {
                        setModalActive(true);
                    }} />
                    <FontAwesomeIcon className='iconsHeader' icon={faUser} color="#5d16a2" onClick={() => {
                        window.location.href = '/authorization';
                    }} />
                </div>
            </div>
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
            <h1 id="contentPopularProducts">Popular products</h1>
            <div id="containerPopular"></div>
            <div className='menu'></div>
            <div id='showBlockDiv'>
                <div id='sortDiv'>
                    <h2>Фильтры</h2>
                    <p style={{ borderBottom: '2px solid gray', marginLeft: '-10px', marginRight: '-10px' }}></p>
                    <h5>Цена</h5>
                    <MultiRangeSlider
                        min={13499}
                        max={81689}
                        step={5}
                        minValue={minValue}
                        maxValue={maxValue}
                        ruler='false'
                        label='false'
                        barLeftColor='white'
                        barRightColor='white'
                        barInnerColor='rgb(86, 24, 145)'
                        thumbLeftColor='rgb(131, 115, 145)'
                        thumbRightColor='rgb(131, 115, 145)'
                        onInput={(e) => {
                            handleInput(e);
                        }}
                    />
                    <div style={{ margin: '10px' }}>От: {minValue} грн.</div>
                    <div style={{ margin: '10px' }}>До: {maxValue} грн.</div>
                    <button className='SortMoneyButton' onClick={() => {
                        console.log(iteratorProuctNow);
                        axios({
                            method: 'get',
                            url: `https://shop20230228183528.azurewebsites.net/api/ControllerClass/GetProductsByID?id=${iteratorProuctNow}`,
                            dataType: "dataType",
                            headers: {
                                'Accept': '*/*',
                                'Content-Type': 'application/json'
                            }
                        }).then(sortMoney => {
                            var cardsDiv = document.getElementById('cardsDiv');
                            cardsDiv.innerHTML = '';
                            console.log({ minValue });
                            console.log({ maxValue });
                            for (const iterSort of sortMoney['data']['value']) {
                                if (iterSort['status'] === 'Enabled') {
                                    if (iterSort['price'] <= maxValue && iterSort['price'] >= minValue) {
                                        console.log('yts');
                                        var card = document.createElement('div');
                                        card.className = "cards";
                                        var title = document.createElement('h2');
                                        title.textContent = iterSort['title'] + ' ' + iterSort['model'];
                                        title.className = "titleProduct";
                                        var picture = document.createElement('img');
                                        picture.src = iterSort['uriPhoto'];
                                        picture.className = "pictureCard";
                                        var price = document.createElement('h3');
                                        price.textContent = iterSort['price'] + ' грн.';
                                        var buy = document.createElement('button');
                                        buy.textContent = "BUY";
                                        buy.className = "btnBuy";
                                        card.append(picture);
                                        card.append(title);
                                        card.append(price);
                                        card.append(buy);
                                        cardsDiv.append(card);
                                    }
                                }
                            }
                        });
                    }}>OK</button>
                </div>
                <div id='cardsDiv'></div>
            </div>
            <footer className='footer'>
                <div style={{ display: 'flex' }}>
                    <div>
                        <img className='logoImgFooter' src="yamahawithout.png"></img>
                        <ul className='phoneNumbers'>
                            <li className='numbers'>0 800 210 186</li>
                            <li className='numbers'>044 333-63-52</li>
                            <li className='numbers'>(066) 731-32-71</li>
                            <li className='numbers'>(067) 153-05-08</li>
                            <li className='numbers'>(063) 233 49 50</li>
                        </ul>
                        <div className='icons'>
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-youtube-play" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                        </div>
                        <p style={{ marginTop: '70px', marginLeft: '50px' }}>© Yamaha 2023 - Интернет-магазин техники Днепр, Киев, Украина</p>
                    </div>
                    <div>
                        <h5 style={{ marginTop: '40px' }}>Покупателю</h5>
                        <ul className='infoUl'>
                            <li className='info'>Карта сайта</li>
                            <li className='info'>Пользовательское соглашение</li>
                            <li className='info'>Гарантия и Возврат товара</li>
                            <li className='info'>Доставка и Оплата</li>
                        </ul>
                    </div>
                    <div>
                        <h5 style={{ marginTop: '40px', marginLeft: '180px' }}>Ждем Вас</h5>
                        <h6 style={{ marginTop: '40px', marginLeft: '180px' }}>г. Днепр</h6>
                        <p style={{ marginLeft: '180px' }}>проспект Д. Яворницкого, 34</p>

                        <h6 style={{ marginLeft: '180px' }}>г. Киев</h6>
                        <p style={{ marginLeft: '180px' }}>ул.Жилянская 53, 1 этаж, Шоу-рум «Yellow» (м.Вокзальная)</p>
                    </div>
                </div>
                <button onClick={() => ToTop()} className="btnToTop">
                    <i className="fa fa-chevron-up" style={{ marginLeft: '22px' }} aria-hidden="true"></i>
                </button>
            </footer>
        </div>
    );
}
export default Main;