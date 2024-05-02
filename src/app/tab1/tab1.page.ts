import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonInput,
  IonItem,
  IonButton,
  IonLabel,
} from '@ionic/angular/standalone';
import { StorageService } from '../core/storage.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [FormsModule, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar],
})
export class Tab1Page {
  myKey: string = '';
  myValue: string = '';

  constructor(private storage: StorageService) {}

  async set() {
    await this.storage.set(this.myKey, this.myValue);
  }
}
