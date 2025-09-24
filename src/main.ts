// TODO check why bootstrap js is needed here, it's also imported in angular.json
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch((error) => {
  throw error;
});
