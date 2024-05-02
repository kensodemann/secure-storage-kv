import { Injectable } from '@angular/core';
import { KeyValueStorage } from '@ionic-enterprise/secure-storage/ngx';
import { Platform } from '@ionic/angular/standalone';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private ready: Promise<void> | null = null;

  constructor(
    private encryption: EncryptionService,
    private platform: Platform,
    private storage: KeyValueStorage,
  ) {}

  async get(key: string): Promise<string> {
    await this.initialize();
    return this.storage.get(key);
  }

  async set(key: string, value: string): Promise<void> {
    await this.initialize();
    await this.storage.set(key, value);
  }

  async pairs(): Promise<Array<{ key: string; value: string }>> {
    await this.initialize();
    const keys = await this.storage.keys();
    return Promise.all(
      keys.map(async (key) => {
        const value = (await this.storage.get(key)) as string;
        return { key, value };
      }),
    );
  }

  private async initialize(): Promise<void> {
    if (!this.ready) {
      this.ready = this.createStorage();
    }
    return this.ready;
  }

  private async createStorage(): Promise<void> {
    if (this.platform.is('hybrid')) {
      const key = await this.encryption.getDatabaseKey();
      return this.storage.create(key);
    }
    return this.storage.create('');
  }
}
