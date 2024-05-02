import { Injectable } from '@angular/core';
import { BrowserVault, DeviceSecurityType, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { VaultFactoryService } from './vault-factory.service';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private vault: Vault | BrowserVault;
  private vaultReady: Promise<void> | undefined;

  constructor(vaultFactory: VaultFactoryService) {
    this.vault = vaultFactory.create();
  }

  async getDatabaseKey(): Promise<string> {
    let key = await this.vault.getValue('database-key');
    if (!key) {
      key = 'this-is-not-secure-please-change-it'; // Normally, you would generate a secure key here or fetch it from a secure source
      await this.vault.setValue('database-key', key);
    }
    return key;
  }

  initialize(): Promise<void> {
    if (!this.vaultReady) {
      this.vaultReady = new Promise(async (resolve) => {
        await this.vault.initialize({
          key: 'io.ionic.csdemosecurestoragekeys',
          type: VaultType.SecureStorage,
          deviceSecurityType: DeviceSecurityType.None,
          unlockVaultOnLoad: false,
        });
        resolve();
      });
    }
    return this.vaultReady;
  }
}
