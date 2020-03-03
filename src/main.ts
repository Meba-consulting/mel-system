import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  // enableProdMode();
  try {
    enableProdMode();
    console.log('enabled prod mode');
  } catch (exception) {
    console.error(
      'BUGFIX: calling isDevMode() in imports before enableProdMode() throws exception - https://github.com//issues/8340#\n',
      exception
    );
  }
  if (window) {
    window.console.log = function() {};
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('./ngsw-worker.js');
    }
  })
  .catch(err => console.log(err));
