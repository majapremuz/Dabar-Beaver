import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  imports: [IonicModule]
})
export class BackButtonComponent  implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

}
