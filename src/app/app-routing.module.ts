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
    path: 'Lokacije na karti/:location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'Lokacije na karti/:lokacije',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'Potraži dabra na karti',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'Provjeri znanje',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'text/:id',
    loadChildren: () => import('./pages/text/text.module').then( m => m.TextPageModule)
  },
  {
    path: 'Popis zabilježenih lokacija',
    loadChildren: () => import('./pages/location-list/location-list.module').then( m => m.LocationListPageModule)
  },
  {
    path: 'Pošalji dabrov trag',
    loadChildren: () => import('./pages/add-picture/add-picture.module').then( m => m.AddPicturePageModule)
  },
  {
    path: 'poveznice/:id',
    loadChildren: () => import('./pages/poveznice/poveznice.module').then( m => m.PoveznicePageModule)
  },
  {
    path: 'Upoznajte dabrove',
    loadChildren: () => import('./pages/sadrzaj-tekstova/sadrzaj-tekstova.module').then( m => m.SadrzajTekstovaPageModule)
  },
  {
    path: 'Poveznice',
    loadChildren: () => import('./pages/sadrzaj-poveznice/sadrzaj-poveznice.module').then( m => m.SadrzajPoveznicePageModule)
  },
  {
    path: 'tekst-lokacije/:id',
    loadChildren: () => import('./pages/tekst-lokacije/tekst-lokacije.module').then( m => m.TekstLokacijePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
