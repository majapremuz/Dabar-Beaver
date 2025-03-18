import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nagrada-btn',
  templateUrl: './nagrada-btn.component.html',
  styleUrls: ['./nagrada-btn.component.scss'],
  imports: [IonicModule]
})
export class NagradaBtnComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  visitedLocation(){
    this.router.navigateByUrl('visited-location');
  }

}
