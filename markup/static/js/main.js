'use strict';

// .price-options-items-js
(function () {
  var priceOptionWrap = document.querySelectorAll('.priceOptionWrap-js');
  var priceOption = document.querySelectorAll('.priceOptionsItems-js');
  
  var setPrice = function (elem) {
    var dataPrice = elem.dataset.price;
    var elemChild = elem.querySelector('.priceOptionsItemPrice-js');

    elemChild.textContent = dataPrice;
  };
  
  var getPrice = function (elem) {
    for (var i = 0, len = elem.length; i < len; i++) {
      setPrice(elem[i]);
    }
  };
  
  var selectablePrices = function (elem) {
    for (var i = 0, len = elem.length; i < len; i++) {
      elem[i].addEventListener('click', function (evt) {
        var item = evt.target.closest('.priceOptionsItems-js');
        var parentChildren = this.querySelectorAll('.priceOptionsItems-js');
        
        if (item) {
          if (!(item.classList.contains('active'))) {
            for (var j = 0, jLen = parentChildren.length; j < jLen; j++) {
              parentChildren[j].classList.remove('active');
            }
          };
          item.classList.add('active');
          this.dataset.currentPrice = item.dataset.price;
          this.dataset.currentWeight = item.dataset.weight;
        }
      });
    }
  };
  
  getPrice(priceOption);
  selectablePrices(priceOptionWrap);
})();

// cart-js
(function () {
  var carts = document.querySelectorAll('.cart-js');
  var basket = document.querySelector('.basket-js');
  var basketCount = basket.querySelectorAll('.basketCount-js');
  var basketTotalPrice = basket.querySelector('.basketTotalPrice-js');
  var basketCountNum = parseInt(basket.dataset.count, 10);
  var basketTotalPriceNum = parseInt(basket.dataset.totalPrice, 10);
  var openBasketButton = basket.querySelector('.user-basket__open-button');
  var basketCartContainer = basket.querySelector('.user-basket__order-list');
  var basketCart = basket.querySelector('.basketCart-js').content.querySelector('.user-basket__order-items');
  var basketTotalOrderPriceWrap = basket.querySelector('.user-basket__order-total-wrap');
  var basketTotalOrderPrice = basket.querySelector('.user-basket__order-total-price-num');
  var basketEmptyHeadline = basket.querySelector('.user-basket__order-empty-headline-wrap');
  var basketTotalOrderInput = basket.querySelector('.user-basket__order-input-list-wrap');
  
  for (var i = 0, len = carts.length; i < len; i++) {
    carts[i].addEventListener('click', function (evt) {
      var minus = evt.target.closest('.calculate-items-minus-js');
      var val = this.querySelector('.calculate-items-value-js');
      var plus = evt.target.closest('.calculate-items-plus-js');
      var valNum = parseInt(val.textContent, 10);
      var itemOption = evt.target.closest('.priceOptionWrap-js');
      var dataCountNum = parseInt(this.dataset.count, 10);
      var add = evt.target.closest('.add-js');
      var cartName = this.querySelector('.cart__content-title');
      var basketLi = evt.target.closest('.user-basket__order-items');
      
      if (itemOption) {
        this.dataset.basicPrice = itemOption.dataset.currentPrice;
        this.dataset.totalPrice = this.dataset.basicPrice;
        this.dataset.weight = itemOption.dataset.currentWeight;
        val.textContent = 1;
      }
      
      if (minus) {
        if (valNum > 1) {
          val.textContent = valNum - 1;
          this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) - parseInt(this.dataset.basicPrice, 10);
          this.dataset.count = dataCountNum - 1;
        }
      }

      if (plus) {
        val.textContent = valNum + 1;
        this.dataset.totalPrice = parseInt(this.dataset.totalPrice, 10) + parseInt(this.dataset.basicPrice, 10);
        this.dataset.count = dataCountNum + 1;
      }
      
      if (add) {
        var newElem = basketCart.cloneNode(true);
        
        basket.dataset.count = parseInt(basket.dataset.count, 10) + parseInt(this.dataset.count, 10);
        basket.dataset.totalPrice = parseInt(basket.dataset.totalPrice, 10) + parseInt(this.dataset.totalPrice, 10);
        basket.dataset.name = cartName.textContent;
        newElem.querySelector('.user-basket__order-item-headline').textContent = basket.dataset.name;
        newElem.querySelector('.user-basket__order-item-weight').textContent = this.dataset.weight;
        newElem.querySelector('.user-basket__order-item-calculating-text').textContent = val.textContent;
        newElem.querySelector('.user-basket__order-item-total-price').textContent = this.dataset.totalPrice;
        newElem.querySelector('.user-basket__order-item-total-price-wrap').dataset.basicPrice = this.dataset.basicPrice;
        if (parseInt(basket.dataset.count, 10) < 1) {
          basketTotalOrderPriceWrap.classList.add('user-basket__order-total-wrap--hidden');
          basketEmptyHeadline.classList.remove('user-basket__order-empty-headline-wrap--hidden');
          basketTotalOrderInput.classList.add('user-basket__order-input-list-wrap--hidden');
        } else {
          basketTotalOrderPriceWrap.classList.remove('user-basket__order-total-wrap--hidden');
          basketEmptyHeadline.classList.add('user-basket__order-empty-headline-wrap--hidden');
          basketTotalOrderInput.classList.remove('user-basket__order-input-list-wrap--hidden');
        }
        newElem.addEventListener('click', function (evt) {
          var basketMinus = evt.target.closest('.basketItemMinus-js');
          var basketVal = this.querySelector('.basketItemVal-js');
          var basketPlus = evt.target.closest('.basketItemPlus-js');
          var basketBasicPrice = this.querySelector('.user-basket__order-item-total-price-wrap');
          var basketTotalPriceLi = this.querySelector('.user-basket__order-item-total-price');
          var basketRemove = evt.target.closest('.user-basket__order-item-exit');

          if (basketMinus) {
            if (parseInt(basketVal.textContent, 10) > 1) {
              basketVal.textContent = parseInt(basketVal.textContent, 10) - 1;
              basket.dataset.count = parseInt(basket.dataset.count, 10) - 1;
              basket.dataset.totalPrice = parseInt(basket.dataset.totalPrice, 10) - parseInt(basketBasicPrice.dataset.basicPrice, 10);
              basketTotalPriceLi.textContent = parseInt(basketTotalPriceLi.textContent, 10) - parseInt(basketBasicPrice.dataset.basicPrice, 10);
              basketTotalOrderPrice.textContent = basket.dataset.totalPrice;
              basketTotalPrice.textContent = basket.dataset.totalPrice;
              for (var j = 0, jLen = basketCount.length; j < jLen; j++) {
                basketCount[j].textContent = basket.dataset.count;
              }
            }
          }
          
          if (basketPlus) {
            basketVal.textContent = parseInt(basketVal.textContent, 10) + 1;
            basket.dataset.count = parseInt(basket.dataset.count, 10) + 1;
            basket.dataset.totalPrice = parseInt(basket.dataset.totalPrice, 10) + parseInt(basketBasicPrice.dataset.basicPrice, 10);
            basketTotalPriceLi.textContent = parseInt(basketTotalPriceLi.textContent, 10) + parseInt(basketBasicPrice.dataset.basicPrice, 10);
            basketTotalOrderPrice.textContent = basket.dataset.totalPrice;
            basketTotalPrice.textContent = basket.dataset.totalPrice;
            for (var j = 0, jLen = basketCount.length; j < jLen; j++) {
              basketCount[j].textContent = basket.dataset.count;
            }
          }
          
          if (basketRemove) {
            basket.dataset.count = parseInt(basket.dataset.count, 10) - parseInt(basketVal.textContent, 10);
            basket.dataset.totalPrice = parseInt(basket.dataset.totalPrice, 10) - parseInt(basketTotalPriceLi.textContent, 10);
            basketTotalOrderPrice.textContent = basket.dataset.totalPrice;
            basketTotalPrice.textContent = basket.dataset.totalPrice;
            for (var j = 0, jLen = basketCount.length; j < jLen; j++) {
              basketCount[j].textContent = basket.dataset.count;
            }
            if (parseInt(basket.dataset.count, 10) < 1) {
              basketTotalOrderPriceWrap.classList.add('user-basket__order-total-wrap--hidden');
              basketEmptyHeadline.classList.remove('user-basket__order-empty-headline-wrap--hidden');
              basketTotalOrderInput.classList.add('user-basket__order-input-list-wrap--hidden');
            } else {
              basketTotalOrderPriceWrap.classList.remove('user-basket__order-total-wrap--hidden');
              basketEmptyHeadline.classList.add('user-basket__order-empty-headline-wrap--hidden');
              basketTotalOrderInput.classList.remove('user-basket__order-input-list-wrap--hidden');
            }
            this.remove();
          }
        });
        for (var j = 0, jLen = basketCount.length; j < jLen; j++) {
          basketCount[j].textContent = basket.dataset.count;
        }
        basketTotalPrice.textContent = basket.dataset.totalPrice;
        basketCartContainer.appendChild(newElem);
        basketTotalOrderPrice.textContent = basket.dataset.totalPrice;
      }
    });
  }
  
  openBasketButton.addEventListener('click', function () {
    if (parseInt(basket.dataset.count, 10) < 1) {
      basketTotalOrderPriceWrap.classList.add('user-basket__order-total-wrap--hidden');
      basketEmptyHeadline.classList.remove('user-basket__order-empty-headline-wrap--hidden');
      basketTotalOrderInput.classList.add('user-basket__order-input-list-wrap--hidden');
    } else {
      basketTotalOrderPriceWrap.classList.remove('user-basket__order-total-wrap--hidden');
      basketEmptyHeadline.classList.add('user-basket__order-empty-headline-wrap--hidden');
      basketTotalOrderInput.classList.remove('user-basket__order-input-list-wrap--hidden');
    }
    basket.classList.toggle('user-basket--open');
  });
})();

// Slider
(function () {
  var slider = document.querySelector('.popular-goods__slider');
  
  if (slider !== null) {
    $(document).ready(function(){
      $(".popular-goods__slider").owlCarousel({
        slideTransition: 'ease',
        smartSpeed: 200,
        autoplay: false,
        nav: true,
        responsive: {
          1800: {
            items: 3,
            margin: 100
          },
          1200: {
            items: 3,
            margin: 50
          },
          1000: {
            items: 2,
            margin: 25
          },
          500: {
            items: 1,
            margin: 0
          }
        }
      });
    });
  }
})();

(function () {
  var menu = document.querySelector('.page-header__menu-button-wrap');
  var menuNav = document.querySelector('.main-nav__list');
  var menuExit = document.querySelector('.main-nav__list-exit-button');
  
  menu.addEventListener('click', function () {
    menuNav.classList.add('main-nav__list--open');
  });
  
  menuExit.addEventListener('click', function () {
    menuNav.classList.remove('main-nav__list--open');
  });
})();
