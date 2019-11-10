import { Component, OnInit } from '@angular/core';

import { FibonacciWasmService } from './../../services/fibonacci-wasm.service';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
  providers: [FibonacciWasmService]
})
export class FibonacciComponent implements OnInit {
  constructor(private wasmService: FibonacciWasmService) {}

  ngOnInit() {}
}
