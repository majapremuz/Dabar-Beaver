import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Platform, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FooterComponent implements OnInit {
  currentPage: string = 'home';
  canGoBack: boolean = false;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    private location: Location
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;
        if (url.includes('home')) {
          this.currentPage = 'home';
        } else if (url.includes('location')) {
          this.currentPage = 'location';
        } else if (url.includes('back')) {
          this.currentPage = 'back';
        }
      }
    });
  }

  ngOnInit() {
    this.checkBackAvailability();
  }

  checkBackAvailability() {
    // Use the Angular Location service to check if navigation back is possible
    this.canGoBack = this.location.path() !== '/home'; // Adjust as needed for your app's logic
  }

  back() {
    if (this.canGoBack) {
      this.location.back(); // Use Location service to go back
      this.checkBackAvailability();
    }
  }

  home() {
    this.router.navigateByUrl('/home');
  }

  toLocation() {
    this.router.navigateByUrl('/Lokacije na karti');
  }
}
