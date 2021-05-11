import { Component } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { NbuService } from './services/nbu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  xLables: string[] = [];
  rate: string[] = [];
  currency = 'USD';
  tableData: {exchangedate: string, rate: string}[] = [];
  type = 'line';
  data: any;
  currencyList = ['USD', 'EUR', 'RUB'];
  startDay = '2018-07-22';
  endDay = '2018-07-23';
  selectedOption = this.currencyList[0];
  options = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private nbuService: NbuService) {

  }

  getRate(): void {
  const arrayOfRequests = this.getDatesInRange().map(value =>  this.nbuService.getExchacngeRate(`${this.selectedOption}`, value));
  const observables = forkJoin(arrayOfRequests);
  this.currency = this.selectedOption;
  this.setInitialValues();
  const subscription: Subscription = observables.subscribe(data => {
    for (const value of data) {
      this.xLables.push(value[0].exchangedate);
      this.rate.push(value[0].rate);
      this.tableData.push({exchangedate: value[0].exchangedate, rate: value[0].rate});
    }
    this.initChart();
    }, null, () => subscription.unsubscribe());
  }

  setInitialValues(): void {
    this.xLables = [];
    this.rate = [];
    this.tableData = [];
  }

  getDatesInRange(): Array<string> {
    const daylist = this.getDaysArray(new Date(`${this.startDay}`), new Date(`${this.endDay}`));
    const newDataArray = daylist.map((v) => v.toISOString().slice(0, 10)).join(',');
    return this.stringToNbuString(newDataArray);
  }

  getDaysArray(start: Date, end: Date): Array<Date> {
    const arr = [];
    for (const dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
    }
    return arr;
  }

  stringToNbuString(str: string): Array<string> {
    return str.replaceAll('-', '').split(',');
  }

  initChart(): void {
    this.data = {
      labels: this.xLables,
      datasets: [
        {
          label: `1 ${this.selectedOption} in UAH`,
          data: this.rate
        }
      ]
    };
  }

}
