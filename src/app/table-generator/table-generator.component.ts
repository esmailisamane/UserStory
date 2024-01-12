import { Component } from '@angular/core';

@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.css']
})
export class TableGeneratorComponent {
  rows: number = 2;
  columns: number = 2;
  tableData: number[][] = [];
  rowsErrorMessage: string = '';
  columnsErrorMessage: string = '';

  generateTable() {
    this.validateInput();
    if (this.isValidInput()) {
      this.tableData = [];
      for (let i = 0; i < this.rows; i++) {
        const row = [];
        for (let j = 0; j < this.columns; j++) {
          row.push(Math.floor(Math.random() * 4) + 1);
        }
        this.tableData.push(row);
      }
    }
  }

  isValidInput(): boolean {
    return this.isNumberInRange(this.rows) && this.isNumberInRange(this.columns);
  }

  isNumberInRange(value: number): boolean {
    return Number.isInteger(value) && value >= 2 && value <= 100;
  }

  validateInput() {
    this.rowsErrorMessage = this.isNumberInRange(this.rows) ? '' : 'Please enter a number between 2 and 100.';
    this.columnsErrorMessage = this.isNumberInRange(this.columns) ? '' : 'Please enter a number between 2 and 100.';
  }

  getCellColor(value: number): string {
    switch (value) {
      case 1: return 'green';
      case 2: return 'yellow';
      case 3: return 'red';
      case 4: return 'blue';
      default: return 'white';
    }
  }
}
