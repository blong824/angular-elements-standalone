import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello.component';
import { AppComponent } from './app.component';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';

// Include the `PopupService` provider,
// but exclude `PopupComponent` from compilation,
// because it will be added dynamically.

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [PopupService],
  declarations: [AppComponent, PopupComponent, HelloComponent],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent, HelloComponent],
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(HelloComponent, {injector: injector});
    customElements.define('app-hello', custom);
  }
}