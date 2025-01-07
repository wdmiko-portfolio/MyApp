import { Component } from '@angular/core';
import { IonAlert,IonHeader, IonToolbar, IonTitle, IonContent,IonSearchbar , IonCard, IonCardHeader, IonCardSubtitle,IonCardContent,IonBadge} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CardComponent } from "../components/card/card.component";
import {  FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FirebaseService } from '../services/firebase.service';
import { GlobalHeaderComponent } from '../components/global-header/global-header.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonAlert,GlobalHeaderComponent,NgFor,NgClass,NgIf,IonBadge,IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonSearchbar, IonCard,IonCardHeader,IonCardContent,IonCardSubtitle,FormsModule]
})
export class Tab2Page {
  searchValue !:number;
  arrNum:any=[];
  isAlertOpen = false;
  alertButtons = ['OK!'];

  constructor(private firestore : FirebaseService) {}

  async searchItem(event: KeyboardEvent){

    if (event.key === 'Enter') {
      if(!this.searchValue || isNaN(this.searchValue)){
        console.log('formato invalido, agregue un numero')
        this.setOpen(true);
        return
      }
     console.log(this.searchValue)
      const peticion=this.searchValue;
      this.arrNum=[];
      // itero hasta llegar al valor brindado
      for(let i= 1; i<=this.searchValue ; i++){
        let cont= 0;
        const multipos =[]
        //verificamos de que es multiplo el numero iterado
        const esMultiploDe3 = i % 3 === 0;
        const esMultiploDe5 = i % 5 === 0;
        const esMultiploDe7 = i % 7 === 0;
  //lo agrego a un arreglo
        if (esMultiploDe3) multipos.push(3);
        if (esMultiploDe5) multipos.push(5);
        if (esMultiploDe7) multipos.push(7);
  //si tuvo multiplos entonces saco cual fue el menor y pusheo a mi arreglo arr num la informacionde que numero fue, el color(sera el multiplo menor),y los multiplos que tuvo 
      if(multipos.length>0){
        const menorMultiplo = Math.min(...multipos);
        this.arrNum.push({
          numero:i,
          color:menorMultiplo,
          multiplo:multipos
        })
      }else{
        this.arrNum.push({
          numero:i,
          color: 0,
          multiplo:multipos
        })
      }
     
      }

      // creamos un objeto final con la informacion necesaria para pasar a nuestro firebase
      const finalObject= {
        primos:{
        peticion: peticion,
        resultado: this.arrNum
        }
      }
      console.log(this.arrNum)
      console.log(finalObject)
      await this.firestore.setValue(finalObject)
      this.firestore.getCollectionData() 
    }
    return;
    
  }
//alert por si hay error en el dato ingresado
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  }

