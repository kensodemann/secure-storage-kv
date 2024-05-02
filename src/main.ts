import { APP_INITIALIZER, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { KeyValueStorage } from '@ionic-enterprise/secure-storage/ngx';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { EncryptionService } from './app/core/encryption.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const appInitFactory =
  (encryption: EncryptionService): (() => Promise<void>) =>
  async () => {
    await encryption.initialize();
  };

bootstrapApplication(AppComponent, {
  providers: [
    KeyValueStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [EncryptionService],
      multi: true,
    },
    provideIonicAngular(),
    provideRouter(routes),
  ],
});
