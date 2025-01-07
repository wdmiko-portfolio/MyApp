import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonBadge,
  IonCard,IonCardHeader,IonCardContent,IonCardTitle,IonButton ,IonIcon,IonCardSubtitle} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { GlobalHeaderComponent } from "../components/global-header/global-header.component";
import { ToggleServiceService } from '../services/toggle-service.service';
import { FirebaseService } from '../services/firebase.service';
import { NgClass, NgFor } from '@angular/common';
import { add} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [NgClass,NgFor,IonContent, ExploreContainerComponent,GlobalHeaderComponent,IonHeader,IonToolbar,IonTitle,
    IonCard,IonCardHeader,IonCardContent,IonCardTitle,IonBadge,IonButton,IonIcon,IonCardSubtitle],
})
export class Tab1Page implements OnInit {
  constructor(private firebase: FirebaseService) {
      addIcons({add});
  }
 
  items = this.firebase.getCollectionDataSignal();
ngOnInit(): void {
  this.firebase.getCollectionData();

}


async loadMore() {
  await this.firebase.getCollectionData(false);
}

}
