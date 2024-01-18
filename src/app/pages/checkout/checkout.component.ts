import { Component, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatTableModule, MatCardModule, RouterLink,CommonModule, MatButtonModule,MatIconModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
  export class CheckoutComponent {

    cartItems: CartItem[] = []

    totalPrice: number = 0;
    totalQuantity: number = 0;
    
    displayedColumns: string[] = ['image','name','quantity','total','action'];
    dataSource = new MatTableDataSource<CartItem>();

    private cartSubscription!: Subscription;

    constructor(private cartService: CartService){}


  ngOnInit(){
      this.listCartDetails();
      }

      listCartDetails() {
        
        this.cartSubscription = this.cartService.cartItems.subscribe(
          items => {
            this.cartItems = items;
            this.dataSource.data = items; 
          }
        );
    
        this.cartService.totalPrice.subscribe(
          data => this.totalPrice = data
        );
        this.cartService.totalQuantity.subscribe(
          data => this.totalQuantity = data
        );
    
        this.cartService.computeCartTotal();
      }

    incrementQuantity(id: string){
      this.cartService.incrementQuantity(id);
    }
   
    decrementQuantity(id: string){
      this.cartService.decrementQuantity(id);
    }

    removeFromCart(id : string){
      this.cartService.removeFromCart(id);
    }

    calculateTotal(id : string) : string {
      return this.cartService.calculateProductTotal(id);
    }

    clearCart(){
      this.cartService.emptyCart();
    }

}
