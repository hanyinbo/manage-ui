import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { AuthGuard } from './auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KnightErrantModule } from './components/knight-errant/knight-errant.module';
import { CompanyModule } from './components/company/company.module';
import { SwiperImgModule} from './components/swiper-img/swiper-img.module';
import { MiniProgramsModule } from './components/mini-programs/mini-programs.module';
import { RecommentModule } from './components/recomment/recomment.module';
import { CustomModule } from './components/custom/custom.module';
import { FinanceModule } from './components/finance/finance.module';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'index',
    component: IndexComponent,
    children:[
      {
     path: 'knight',
     loadChildren: './components/knight-errant/knight-errant.module#KnightErrantModule',
   },
   {
    path: 'company',
    loadChildren: './components/company/company.module#CompanyModule',
  },
  {
    path: 'swiper',
    loadChildren: './components/swiper-img/swiper-img.module#SwiperImgModule',
  },
  {
    path: 'mini',
    loadChildren: './components/mini-programs/mini-programs.module#MiniProgramsModule',
  },
  {
    path: 'recomment',
    loadChildren: './components/recomment/recomment.module#RecommentModule',
  },
  {
    path: 'custom',
    loadChildren: './components/custom/custom.module#CustomModule'
  },
  {
    path: 'finance',
    loadChildren: './components/finance/finance.module#FinanceModule'
  }
  ],
    //路由守卫
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
