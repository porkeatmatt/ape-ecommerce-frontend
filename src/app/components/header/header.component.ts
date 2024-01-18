import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatChipsModule} from '@angular/material/chips';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatMenuModule,
    CommonModule,
    MatChipsModule,
    RouterLink, 
    RouterLinkActive, 
    RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isCheckoutPage = false;
  private checkoutPageSubscription!: Subscription;

  totalQuantity: number = 0;
  totalQuantityText!: string;
  totalPrice: number = 0;
  badgeValue: number = 0;

  private totalQuantitySubscription!: Subscription;
  private totalPriceSubscription!: Subscription;
  
  

  constructor(private cartService: CartService){
  }

  ngOnInit(): void {

    this.totalQuantitySubscription = this.cartService.totalQuantity.subscribe(
      (newQuantity: number) => {
        this.totalQuantity = newQuantity;
        this.updateCartText(newQuantity);
      }
    );
    this.totalPriceSubscription = this.cartService.totalPrice.subscribe (
      (newPrice: number) => {
        this.totalPrice = newPrice;
      }
    );

    this.cartService.totalQuantity.subscribe(initValue => {
      this.badgeValue = initValue;
    });

    this.totalQuantity = this.cartService.getCurrentTotalQuantity();
    this.updateCartText(this.totalQuantity);
    this.totalPrice = this.cartService.getCurrentTotalPrice();
    this.badgeValue = this.totalQuantity;
  }

  updateCartText(newQuantity: number){
    this.totalQuantity = newQuantity;
    this.totalQuantityText = this.generateText();
  }
  generateText(): string {
    if (this.totalQuantity === 1 ) {
      return 'item';
    }else{
      return 'items';
    }
  }

  ngOnDestroy(): void {
    this.checkoutPageSubscription.unsubscribe();
    this.totalPriceSubscription.unsubscribe();
    this.totalQuantitySubscription.unsubscribe();
  }

  

}
