import { Component, OnInit } from '@angular/core';

import { FibonacciWasmService } from './../../services/fibonacci-wasm.service';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
  providers: [FibonacciWasmService]
})
export class FibonacciComponent implements OnInit {
  jsResult: any;
  wasmResult: any;

  constructor(private wasmService: FibonacciWasmService) {}

  ngOnInit() {
    const num = 40;
    this.wasmResult = this.wasmService.fibonacci(num);
    this.jsResult = this.fibonacci(num);
  }

  private fibonacci(n: number): number {
    if (n === 0 || n === 1) {
      return n;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }
}
