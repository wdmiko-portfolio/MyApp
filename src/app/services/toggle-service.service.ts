import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleServiceService {

  constructor() { }

  private toggleState = new BehaviorSubject<boolean>(false); // Estado inicial

 
  toggleState$ = this.toggleState.asObservable();

 
  getToggleState(): boolean {
    return this.toggleState.getValue();
  }

  
  setToggleState(state: boolean): void {
    this.toggleState.next(state);
    localStorage.setItem('toggle', state.toString());
  }
}
