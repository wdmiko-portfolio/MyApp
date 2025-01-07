import { Component, Input, model, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonToggle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.scss'],
    imports: [IonHeader, IonToolbar, IonTitle],

})

export class GlobalHeaderComponent  implements OnInit {
  @Input() title !: string;


  constructor() { }

  ngOnInit() {}


}
