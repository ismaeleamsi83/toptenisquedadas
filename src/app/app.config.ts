import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, ArrowUpRight, File, Home, Menu, UserCheck, SendHorizontal  } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick({File, Home, Menu, UserCheck, ArrowUpRight, SendHorizontal })),
    
  ]
};
