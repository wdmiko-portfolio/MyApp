import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square ,home,server,returnDownBack} from 'ionicons/icons';
import { ToggleServiceService } from '../services/toggle-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private toggleService: ToggleServiceService) {
    addIcons({ triangle, ellipse, square,home,server,returnDownBack });
  }

  modeButtonListen(): void {
    const currentState = this.toggleService.getToggleState();
    console.log(currentState)
    this.toggleService.setToggleState(currentState);
  }
    // Método para regresar al tab anterior
    goBack() {
      // Usar history.back() para ir hacia atrás en el historial
      history.back();
    }
  
}

