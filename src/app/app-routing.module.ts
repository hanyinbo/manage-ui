import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './auth.guard';
import {} from './components/knight-errant/knight-errant.module'
const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'index',
    component: IndexComponent,
    children:[{
     path: '',
     loadChildren: './components/knight-errant/knight-errant.module#KnightErrantModule',
   }],
    //路由守卫
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'knight',
  //   loadChildren: './components/knight-errant/knight-errant.module#KnightErrantModule'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
