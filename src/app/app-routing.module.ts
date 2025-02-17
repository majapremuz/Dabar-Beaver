import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReadyPageGuard } from './guards/ready-page.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad: [ReadyPageGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'text',
    loadChildren: () => import('./pages/text/text.module').then( m => m.TextPageModule)
  },
  {
    path: 'location-list',
    loadChildren: () => import('./pages/location-list/location-list.module').then( m => m.LocationListPageModule)
  },
  {
    path: 'add-picture',
    loadChildren: () => import('./pages/add-picture/add-picture.module').then( m => m.AddPicturePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
