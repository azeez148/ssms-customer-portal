import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
     {path: 'home', component: CustomerHomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
   
  ];
