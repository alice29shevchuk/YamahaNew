import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import * as Scroll from 'react-scroll';
import './Main.css';
const Post = ({loading,posts}) => {
    let scroll = Scroll.animateScroll;
    const[totalPriceBasket,setTotalPriceBasket] = useState(0);
    const [countBasketProduct,setCountBasketProduct] = useState(0);
    const [localPost,setLocalPost] = useState([]);
    var tempPrice = 0;
    // if (loading) {
    //     return <h2>Loading...</h2>
    // }
    return <div id="cardsDiv">
        {posts.map(post => (
            <div className="cards" key={post.id}>
                <h2 className="titleProduct">{post.title} {post.model}
                    <img className="pictureCard" src={post.uriPhoto}></img>
                    <p className="priceProduct">Цена: {post.price} грн.</p>
                    <button className="btnBuy" onClick={()=>{
                        // var IStoken = sessionStorage.getItem("token");
                        // if (IStoken == null) {
                        //     window.location.href = '/authorization';
                        // }
                        // else {
                            alert('Товар добавлен в корзину!');
                            scroll.scrollToTop();
                            var isEmptyBasketTextContent = document.getElementById('isEmptyBasket');
                            isEmptyBasketTextContent.innerHTML = '';
                            var x = document.getElementById('countBasket');
                            var basketDiv = document.getElementById('basketCardsDiv');
                            var basketCard = document.createElement('div');
                            basketCard.className = "basketCard";
                            basketCard.id = post.id;
                            var arrCardsBasket = document.getElementsByClassName('basketCard');
                            var titleBasket = document.createElement('h2');
                            titleBasket.textContent = post.title + ' ' + post.model;
                            titleBasket.className = "titleBasketProduct";
                            var pictureBasket = document.createElement('img');
                            pictureBasket.src = post.uriPhoto;
                            pictureBasket.className = "pictureBasketCard";
                            pictureBasket.id = post.price;
                            var input = document.createElement('input');
                            input.type = "number";
                            input.value = "1";
                            input.min = 1;
                            input.max = post.amount;
                            input.className = "amountOfProduct";
                            input.id = post.id;
                            var priceBasket = document.createElement('h3');
                            priceBasket.innerHTML = `<span>Цена: </span> ${post.price} <span> грн.</span>`;
                            priceBasket.value = post.price;
                            priceBasket.className = "priceBasket";
                            priceBasket.id = post.id;
                            var butAllBasket = document.getElementById('btnBuyBasket');
                            butAllBasket.style.visibility = "visible";
                            var i = document.createElement('i');
                            i.className = "fa fa-trash";
                            i.id = "trashIcon";
                            //click by Trash Icon
                            i.addEventListener('click', () => {
                                const resultDel = window.confirm('Вы действительно хотите удалить товар?');
                                if(resultDel)
                                {
                                    console.log(basketCard.id);
                                    basketDiv.removeChild(basketCard);
                                    if (arrCardsBasket.length == 0) {
                                        isEmptyBasketTextContent.innerHTML = 'В данный момент корзина пуста...';
                                        isTotalSumm.style.visibility = 'hidden';
                                    }
                                    x.setAttribute('data-count',arrCardsBasket.length);
                                    var listPriceBasket = document.getElementsByClassName('priceBasket');
                                    var imgList = document.getElementsByClassName('pictureBasketCard');
                                    tempPrice = 0;
                                    for (const itTotal of listPriceBasket) {
                                        console.log(itTotal);
                                        tempPrice = tempPrice + parseInt(itTotal.value);
                                    }
                                    isTotalSumm.textContent = 'Цена: '+ tempPrice + ' грн.';
                                    if(arrCardsBasket.length==0)
                                    {
                                        butAllBasket.style.visibility = "hidden";
                                    }
                                }
                            })
                            var p = document.createElement('p');
                            p.textContent = "Кол-во товара:";
                            p.className = "textAmountProduct";

                            //надпись итоговая сумма появляется
                            var isTotalSumm = document.getElementById('isTotalSumm');
                            isTotalSumm.style.visibility = 'visible';


                            basketCard.append(i);
                            basketCard.append(p);
                            basketCard.append(input);
                            basketCard.append(titleBasket);
                            basketCard.append(pictureBasket);
                            basketCard.append(priceBasket);
                            basketDiv.append(basketCard);

                            
                            x.setAttribute('data-count',arrCardsBasket.length);

                            var listPriceBasket = document.getElementsByClassName('priceBasket');
                        var imgList = document.getElementsByClassName('pictureBasketCard');
                        tempPrice = 0;
                        for (const itTotal of listPriceBasket) {
                            console.log(itTotal);
                            tempPrice = tempPrice + parseInt(itTotal.value);
                            console.log('temp',tempPrice);
                        }
                        setTotalPriceBasket(tempPrice);
                        isTotalSumm.textContent = 'Итого: '+ tempPrice + ' грн.';
                        input.addEventListener('change', () => {
                            tempPrice = 0;
                            for (let i = 0; i < arrCardsBasket.length; i++) {
                                if (input.id == listPriceBasket[i].id) {
                                    listPriceBasket[i].innerHTML = `<span>Цена: </span> ${imgList[i].id * input.value} <span> грн.</span>`;
                                    listPriceBasket[i].value = imgList[i].id * input.value;
                                }
                                tempPrice = tempPrice + parseInt(listPriceBasket[i].value);
                            }
                            setTotalPriceBasket(tempPrice);
                            isTotalSumm.textContent = 'Итого: '+ tempPrice + ' грн.';
                            console.log(totalPriceBasket);
                        });
                    }}>BUY</button>
                </h2>
            </div>
        ))}
    </div>
}
export default Post;
//var IStoken = sessionStorage.getItem("token");
// if (IStoken == null) {
//     window.location.href = '/authorization';
// }
// else{
//     alert('Товар добавлен в корзину!');
//     scroll.scrollToTop();
//     var isEmptyBasketTextContent = document.getElementById('isEmptyBasket');
//     isEmptyBasketTextContent.innerHTML = '';
//     // var totalSumma = document.getElementById('isTotalSumm');
//     var basketDiv = document.getElementById('basketCardsDiv');
//     var basketCard = document.createElement('div');
//     basketCard.className = "basketCard";
//     basketCard.id = post.id;
//     var arrCardsBasket = document.getElementsByClassName('basketCard');
//     var titleBasket = document.createElement('h2');
//     titleBasket.textContent = post.title + ' ' + post.model;
//     titleBasket.className = "titleBasketProduct";
//     var pictureBasket = document.createElement('img');
//     pictureBasket.src = post.uriPhoto;
//     pictureBasket.className = "pictureBasketCard";
//     pictureBasket.id = post.price;
//     var input = document.createElement('input');
//     input.type = "number";
//     input.value = "1";
//     input.min = 1;
//     input.max = post.amount;
//     input.className = "amountOfProduct";
//     input.id = post.id;
//     var priceBasket = document.createElement('h3');
//     priceBasket.innerHTML = `<span>Цена: </span> ${post.price} <span> грн.</span>`;
//     priceBasket.value = post.price;
//     priceBasket.className = "priceBasket";
//     priceBasket.id = post.id;
//     var i = document.createElement('i');
//     i.className = "fa fa-trash";
//     i.id = "trashIcon";
//     //click
//     var p = document.createElement('p');
//     p.textContent = "Кол-во товара:";
//     p.className = "textAmountProduct";

//     //надпись итоговая сумма появляется
//     var isTotalSumm = document.getElementById('isTotalSumm');
//     isTotalSumm.style.visibility = 'visible';

//     basketCard.append(i);
//     basketCard.append(p);
//     basketCard.append(input);
//     basketCard.append(titleBasket);
//     basketCard.append(pictureBasket);
//     basketCard.append(priceBasket);
//     basketDiv.append(basketCard);



//     setCountBasketProduct(arrCardsBasket.length);
//     console.log(arrCardsBasket.length);
//     var countBasket = document.getElementById('countBasket');
//     countBasket.setAttribute("data-count",countBasketProduct);
//     var listPriceBasket = document.getElementsByClassName('priceBasket');
//     var imgList = document.getElementsByClassName('pictureBasketCard');
//     tempPrice = 0;
//     for (const itTotal of listPriceBasket) {
//         console.log(itTotal);
//         tempPrice = tempPrice + parseInt(itTotal.value);
//     }
//     setTotalPriceBasket(tempPrice);
//     isTotalSumm.textContent = totalPriceBasket;
//     input.addEventListener('change', () => {
//         tempPrice = 0;
//         for (let i = 0; i < arrCardsBasket.length; i++) {
//             if (input.id == listPriceBasket[i].id) {
//                 listPriceBasket[i].innerHTML = `<span>Цена: </span> ${imgList[i].id * input.value} <span> грн.</span>`;
//                 listPriceBasket[i].value = imgList[i].id * input.value;
//             }
//             tempPrice = tempPrice + parseInt(listPriceBasket[i].value);
//         }
//         setTotalPriceBasket(tempPrice);
//         isTotalSumm.textContent = totalPriceBasket;
//         console.log(totalPriceBasket);
//     });
// }