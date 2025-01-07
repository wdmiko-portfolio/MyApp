import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonToggle } from '@ionic/angular/standalone';
import { ToggleServiceService } from '../services/toggle-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
  standalone: true,
  imports: [IonToggle, FormsModule]
})
export class ExploreContainerComponent implements OnInit, OnDestroy {
  @Input() name?: string;
  paletteToggle = false;
  private subscription: Subscription;

  constructor(private toggleService: ToggleServiceService) {
    this.subscription = this.toggleService.toggleState$.subscribe(state => {
      this.paletteToggle = state;
      this.toggleDarkPalette(state);
    });
  }

  ngOnInit(): void {
    const toggleInit = localStorage.getItem('toggle');

    if (toggleInit) {
      const state = toggleInit === 'true';
      this.toggleService.setToggleState(state);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.initializeDarkPalette(prefersDark.matches);
      prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  initializeDarkPalette(isDark: boolean) {
    this.toggleService.setToggleState(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleService.setToggleState(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }
}