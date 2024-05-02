import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { StorageService } from '../core/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, IonLabel, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab2Page {
  myPairs: Array<{ key: string; value: string }> = [];

  constructor(private storage: StorageService) {}

  async ionViewDidEnter() {
    this.myPairs = await this.storage.pairs();
  }
}
