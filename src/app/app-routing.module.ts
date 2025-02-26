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
    path: 'Lokacije na karti',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'Provjeri znanje',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'Upoznajte dabrove',
    loadChildren: () => import('./pages/text/text.module').then( m => m.TextPageModule)
  },
  {
    path: 'Popis lokacija',
    loadChildren: () => import('./pages/location-list/location-list.module').then( m => m.LocationListPageModule)
  },
  {
    path: 'Pošalji sliku ili lokaciju',
    loadChildren: () => import('./pages/add-picture/add-picture.module').then( m => m.AddPicturePageModule)
  },
  {
    path: 'Poveznice',
    loadChildren: () => import('./poveznice/poveznice.module').then( m => m.PoveznicePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
