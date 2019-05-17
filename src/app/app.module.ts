import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { HelloComponent } from './hello.component';
import { PopupComponent } from './popup.component';
import { PopupService } from './popup.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

// Include the `PopupService` provider,
// but exclude `PopupComponent` from compilation,
// because it will be added dynamically.

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule],
  providers: [PopupService, ApiService],
  declarations: [PopupComponent, HelloComponent],
  entryComponents: [PopupComponent, HelloComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const custom = createCustomElement(HelloComponent, {injector: injector});
    customElements.define('app-hello', custom);
  }
  ngDoBootstrap() {}
}