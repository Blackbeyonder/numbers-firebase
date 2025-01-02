import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideIonicAngular({}),
    { provide: FormsModule, useValue: FormsModule }, provideFirebaseApp(() => initializeApp({"projectId":"numberstest-36346","appId":"1:606762384653:web:98f5e7faffd558a2c24444","storageBucket":"numberstest-36346.firebasestorage.app","apiKey":"AIzaSyB4WYfWS4OSfaybAXQVubKYgZ2qpkyXMUQ","authDomain":"numberstest-36346.firebaseapp.com","messagingSenderId":"606762384653"})), provideFirestore(() => getFirestore())]
};
