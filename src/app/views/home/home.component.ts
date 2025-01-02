import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { IonInput, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner } from '@ionic/angular/standalone';
import { Multiples } from '../../interfaces/Multiples';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { request } from '../../interfaces/Request';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSpinner, FormsModule, CommonModule  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  items: Multiples = {
    multi3: [],
    multi5: [],
    multi7: [],
    leftovers: []
  };

  numberSelected: number = 0;
  numberToshow: number[] = [];
  documents: any[] = [];

  request:request={
    numberRequest:0,
    multi3: [],
    multi5: [],
    multi7: [],
    leftovers: [],
    serie: []
  }

  constructor(private firebaseService: FirebaseService){
    
  }

  ngOnInit() {
    // this.loadDocuments();
   
  }


  async loadDocuments() {
    try {
      // Usamos await para esperar la resolución de la promesa
      this.documents = await this.firebaseService.getDocuments();
      console.log(this.documents); // Mostrar los documentos obtenidos
    } catch (error) {
      console.error("Error loading documents:", error); // Manejo de errores
    }
  }
  


  async generate () {

    try {

      console.log(this.numberSelected);

      this.resetItems();
      for (let index = 0; index <= this.numberSelected; index++) {
        this.numberToshow.push(index)
  
        if (index === 0) {
          continue
        }
  
        if (index % 3 === 0) {
          this.items.multi3.push(index);
        }
        if (index % 5 === 0) {
          this.items.multi5.push(index);
        }
        if (index % 7 === 0) {
          this.items.multi7.push(index);
        }
  
        if (index % 3 !== 0 && index % 5 !== 0 && index % 7 !== 0) {
          this.items.leftovers.push(index);
        }
  
      }

      if(this.numberSelected && this.numberSelected>0){
        
        this.request={
          numberRequest:this.numberSelected,
          multi3:this.items.multi3,
          multi5:this.items.multi5,
          multi7:this.items.multi7,
          leftovers:this.items.leftovers,
          serie:this.numberToshow
        }
        const docId = await this.firebaseService.createDocument(this.request);
        console.log("Documento guardado con ID:", docId);
      }

      console.log(this.items);
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

  resetItems() {
    this.items = {
      multi3: [],
      multi5: [],
      multi7: [],
      leftovers: []
    };

    this.numberToshow=[];
  }


  checkLength(event: any) {
    const value = event.target.value;
    const maxLength = 5; 

    
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
  }




}
