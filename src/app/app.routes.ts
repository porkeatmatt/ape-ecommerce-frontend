import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';

export const routes: Routes = [
    {
        path: 'home',
    component: HomeComponent
    },
    {
        path: 'checkout',
    component: CheckoutComponent
    },
    {
        path: 'order',
    component: OrderFormComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
