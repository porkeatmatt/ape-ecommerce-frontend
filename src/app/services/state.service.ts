import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  isCheckoutPage: boolean = false;

  private isCheckoutPageSubject = new BehaviorSubject<boolean>(false);
  isCheckoutPage$ = this.isCheckoutPageSubject.asObservable();

  setCheckoutPage(isCheckoutPage: boolean): void {
    this.isCheckoutPageSubject.next(isCheckoutPage);

  }
}
