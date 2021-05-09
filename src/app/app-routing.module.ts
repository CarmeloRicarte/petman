import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './corporative/pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () => import('./backoffice/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./backoffice/pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
