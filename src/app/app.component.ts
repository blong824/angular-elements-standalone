import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PopupService } from './popup.service';
import { PopupComponent } from './popup.component';

@Component({
  selector: 'app-root',
  template: `
  <h1>Welcome To Angular Elements</h1>
  <div id="hello"></div>
  <button (click)="showMessage()">Display?</button>
  `,
})
export class AppComponent {
  constructor(injector: Injector, public popup: PopupService) {
    // Convert `PopupComponent` to a custom element.
    const PopupElement = createCustomElement(PopupComponent, {injector});
    // Register the custom element with the browser.
    customElements.define('popup-element', PopupElement);
  }

  showMessage() {
    const hello = document.getElementById('hello');
    hello.innerHTML = '<app-hello></app-hello>';
  }
}