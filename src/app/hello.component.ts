import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ApiService, CBS_VERSION } from './api.service';
import { Observable, Subscription } from 'rxjs';

export interface Hello_Data extends CBS_VERSION {
  count: number;
  name: string;
  result: any;
}
@Component({
  selector: 'app-hello',
  template: `
    <div class="container">
    <h1>Hello {{name}}!</h1>
    <div *ngIf="data$ | async as data">
      <div>Api Info</div>
      <div class="version">External : {{data.externalVersion}}</div>
      <div class="version">Internal : {{data.internalVersion}}</div>
    </div>
    <div>Count: {{count}}</div>
    <div>
      <label>Gross pay</label>
      <input [(ngModel)]="grossPay"/>
    </div>
    <button (click)="calculate()">Calculate</button>
    <div *ngIf="result">
    <label>Net pay</label>
    <div>
      <div>Gross pay: {{result.content.grossPay}}</div>
      <div>Federal: {{result.content.federal}}</div>
      <div>Fica: {{result.content.fica}}</div>
      <div>Medicare: {{result.content.medicare}}</div>
      <div>State: {{result.content.state}}</div>
      <hr/>
      <div>Net pay: {{result.content.netPay}}</div>
    </div>
    </div>
    <button (click)="webClick()">Tell parent</button>
    </div>
  `,
  styles: [`
    h1 { font-family: Lato; }
    .version { font-size: 12px;}
    .container { display: flex; flex-direction: column}
  `]
})
export class HelloComponent implements OnDestroy  {

  dataSub: Subscription;
  resultSub: Subscription;
  data$: Observable<CBS_VERSION>;
  data: CBS_VERSION;
  result: any;
  grossPay: number = 0;

  count: number = 0;

  @Input() name: string;

  @Output() versionClicked = new EventEmitter<Hello_Data>();

  @Output() webClicked = new EventEmitter<Hello_Data>();

  constructor(private api: ApiService) {
    this.data$ = this.api.getApiInfo();
    this.dataSub = this.data$.subscribe(s => this.data = s);
  }

  calculate() {
    this.count++;
    this.resultSub = this.api.calculate(this.grossPay).subscribe(res => {
      this.result = res;
      this.resultSub.unsubscribe();
    });
  }

  webClick() {
    this.webClicked.emit({
      externalVersion: this.data.externalVersion,
      internalVersion: this.data.internalVersion,
      count: this.count,
      name: this.name,
      result: this.result
    });
  }

  ngOnDestroy() {
    this.dataSub.unsubscribe();
  }
}
