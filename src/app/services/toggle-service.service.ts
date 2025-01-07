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
    // actualizamos toggle state y guardamos en un local storage para que se quede el valor del modo de pantalla aunque recarguemos
    this.toggleState.next(state);
    localStorage.setItem('toggle', state.toString());
  }
}
