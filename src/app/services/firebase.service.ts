import { Injectable } from '@angular/core';
import { DocumentData, Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestoreService: Firestore) { }

  async getDocuments() {
    const querySnapshot = await getDocs(collection(this.firestoreService, 'test'));
    const documents = querySnapshot.docs.map(doc => doc.data());
    return documents;
  }

  async createDocument(data: DocumentData): Promise<string> {
    try {
      // 'test' es el nombre de la colección
      const docRef = await addDoc(collection(this.firestoreService, 'test'), data);
      return docRef.id;  // Ahora devolvemos el ID del documento
    } catch (error) {
      console.error('Error creando el documento: ', error);
      throw error;  // Lanza el error para que lo puedas manejar en el componente
    }
  }
}
