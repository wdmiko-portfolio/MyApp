import { Component, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone:true,
  imports:[IonCard,IonCardHeader,IonCardContent,IonCardSubtitle],
})
export class CardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
