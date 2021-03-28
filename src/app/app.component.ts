import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  data: Array<any> = [];
  tableData: Array<Array<any>> = [];

  ngOnInit(): void {
    this.data = this.getDataRow();
    this.tableData = this.getRows()
      .map(row => {
        return this.getDataRow();
      });
  }

  jsonView(x: any): string {
    return JSON.stringify(x, null, 2);
  }

  getDataRow(): Array<any> {
    const fullName = {
      type: 'fullName',
      firstName: 'John',
      lastName: 'Doe'
    };
    const progress = {
      type: 'progress',
      value: Math.round(Math.random() * 100)
    };

    return [fullName, this.randomCurrency(), this.randomCurrency(), progress];
  }

  randomCurrency(): any {
    const dollars = Math.random() < 0.5;

    return {
      currency: dollars ? 'dollar' : 'euro',
      value: Math.round(Math.random() * 1000)
    };
  }

  getRows(): Array<number> {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }
}
