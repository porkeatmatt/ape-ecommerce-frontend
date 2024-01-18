import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartItems = this.cartItemsSubject.asObservable();
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart (theCartItem: CartItem){

  let existingCartItem = this.cartItemsSubject.value.find(item => item.id === theCartItem.id);

  if (existingCartItem) {

    existingCartItem.quantity++;
  } else {

    this.cartItemsSubject.next([...this.cartItemsSubject.value, theCartItem]);
  }

  this.computeCartTotal();

  this.logCartData();
  }
  computeCartTotal() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    const currentCartItems = this.cartItemsSubject.value;

  
  for (let currentCartItem of currentCartItems) {
    totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
    totalQuantityValue += currentCartItem.quantity;
  }

  totalPriceValue = parseFloat(totalPriceValue.toFixed(2));

  this.totalPrice.next(totalPriceValue);
  this.totalQuantity.next(totalQuantityValue);

  }

  getCurrentTotalQuantity(): number {
    return this.cartItemsSubject.value.reduce((total, cartItem) => total + cartItem.quantity, 0);
  }
  
  getCurrentTotalPrice(): number {
    return this.cartItemsSubject.value.reduce((total, cartItem) => total + cartItem.quantity * cartItem.unitPrice, 0);
  }

  logCartData() {
    
    const currentCartItems = this.cartItemsSubject.value;
  
    console.log('Contents of the cart:');
    if (currentCartItems.length === 0) {
      console.log("The cart is empty.");
    } else {
      for (let tempCartItem of currentCartItems) {
        const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
        console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`);
      }
    }
    console.log('-------------------------------');
  }

  incrementQuantity(cartItemId: string) {
    const cartItems = this.cartItemsSubject.value; 
    const itemIndex = cartItems.findIndex(item => item.id === cartItemId);
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity++;
      this.cartItemsSubject.next(cartItems);
      this.computeCartTotal();
    } else {
      console.error(`Cart item with ID ${cartItemId} not found.`);
    }
    this.logCartData();
    console.log('Incremented quantity of an item');
    this.logCartData();
  }
  
  decrementQuantity(cartItemId: string) {
    const cartItems = this.cartItemsSubject.value; 
    const itemIndex = cartItems.findIndex(item => item.id === cartItemId);
    if (itemIndex !== -1) {
      const item = cartItems[itemIndex];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cartItems.splice(itemIndex, 1); 
      }
      this.cartItemsSubject.next(cartItems);
      this.computeCartTotal();
    } else {
      console.error(`Cart item with ID ${cartItemId} not found.`);
    }
    this.logCartData();
    console.log('Decremented quantity of an item');
    this.logCartData();
  }
  
  removeFromCart(cartItemId: string) {
    const cartItems = this.cartItemsSubject.value; 
    const newCartItems = cartItems.filter(item => item.id !== cartItemId);
    this.cartItemsSubject.next(newCartItems);
    this.computeCartTotal();
    this.logCartData();
    console.log('Removed an item from the cart');
    this.logCartData();
  }

  emptyCart(){
  this.cartItemsSubject.next([]);
  this.computeCartTotal();
  }

  calculateProductTotal(id : string): string{
  
  const cartItem = this.cartItemsSubject.value.find(item => item.id === id);

  if (cartItem) {
    
    const total = cartItem.quantity * cartItem.unitPrice;
    return total.toFixed(2);
  } else {
    console.error(`Cart item with ID ${id} not found.`);
    return '0.00';
  }
  }
}
