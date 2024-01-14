import { Component, OnInit } from '@angular/core';
import { debounce, DebouncedFunc } from 'lodash';


@Component({
  selector: 'app-table-generator',
  templateUrl: './table-generator.component.html',
  styleUrls: ['./table-generator.component.css']
})
export class TableGeneratorComponent implements OnInit  {
  rows: number = 2;
  columns: number = 2;
  tableData: number[][] = [];
  rowsErrorMessage: string = '';
  columnsErrorMessage: string = '';
  maxConnectedArea: number = 0;

  debouncedGetCellColor?: DebouncedFunc<(value: number) => string>;

  ngOnInit() {
  
    this.debouncedGetCellColor = debounce(this.getCellColor, 300);
  }
 

 
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

  // getCellColor(value: number): void {
  //   if (typeof Worker !== 'undefined') {
  //     const worker = new Worker(new URL('../color.worker.ts', import.meta.url));
  
  //     worker.onmessage = ({ data }) => {
  //         this.result = data.value;
  //         worker.terminate();
  //     };
  
  //     worker.onerror = (error) => {
  //       console.error('Error in web worker:', error);
  //     };
  
  //     worker.postMessage(value);
  //   } else {
  //     console.error('Web workers are not supported in this environment.');
  //   }
  // }
  
  getCellColor(value: number): string {
    switch (value) {
      case 1:
        return 'green';
      case 2:
        return 'yellow';
      case 3:
        return 'red';
      case 4:
        return 'blue';
      default:
        return 'white';
    }
  }

  analyzeTable() {
    this.maxConnectedArea = this.findMaxConnectedArea();
  }

  findMaxConnectedArea(): number {
    const visited: boolean[][] = new Array(this.rows).fill(null).map(() => new Array(this.columns).fill(false));
    let maxArea: number = 0;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (!visited[i][j]) {
          const currentColor = this.tableData[i][j];
          const currentArea = this.dfs(i, j, currentColor, visited);
          maxArea = Math.max(maxArea, currentArea);
        }
      }
    }
    return maxArea;
  }

  dfs(row: number, col: number, targetColor: number, visited: boolean[][]): number {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.rows ||
      col >= this.columns ||
      visited[row][col] ||
      this.tableData[row][col] !== targetColor
    ) {
      return 0;
    }

    visited[row][col] = true;
    let area = 1;

    area += this.dfs(row - 1, col, targetColor, visited);
    area += this.dfs(row + 1, col, targetColor, visited);
    area += this.dfs(row, col - 1, targetColor, visited);
    area += this.dfs(row, col + 1, targetColor, visited);

    return area;
  }

  
}

