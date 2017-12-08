import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

import { OrgCoreModule } from './app/CoreModule/org.core.module';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(OrgCoreModule)
  .catch(err => console.log(err));
