import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// run our app with a specific configuration 
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
