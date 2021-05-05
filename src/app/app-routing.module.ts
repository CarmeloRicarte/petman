import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './backoffice/auth/auth-routing.module';
import { PagesRoutingModule } from './backoffice/pages/pages-routing.module';

import { HomeComponent } from './corporative/pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () => import('./backoffice/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
