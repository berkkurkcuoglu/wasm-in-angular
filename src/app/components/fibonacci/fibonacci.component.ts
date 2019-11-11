import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { FibonacciWasmService } from './../../services/fibonacci-wasm.service';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss'],
  providers: [FibonacciWasmService]
})
export class FibonacciComponent implements OnInit, OnDestroy {
  public wasmReady: boolean = false;
  public fiboNum: number;
  public result: number;
  public elapsedTime: number;
  public calculating: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(private wasmService: FibonacciWasmService) {}

  ngOnInit() {
    this.checkWasmStatus();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private checkWasmStatus(): void {
    this.subscription.add(
      this.wasmService.wasmReady$
        .pipe(
          filter(isReady => isReady),
          tap(isReady => (this.wasmReady = isReady))
        )
        .subscribe()
    );
  }

  private fibonacci(n: number): number {
    if (n === 0 || n === 1) {
      return n;
    }
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  public calculate(type: string): void {
    if (!this.calculating) {
      this.calculating = true;
      this.elapsedTime = 0;
      this.result = undefined;
      setTimeout(() => {
        const start = new Date();
        if (type === 'WASM') {
          this.result = this.wasmService.fibonacci(this.fiboNum);
        }
        if (type === 'JS') {
          this.result = this.fibonacci(this.fiboNum);
        }
        const end = new Date();
        this.elapsedTime = end.getTime() - start.getTime();
        this.calculating = false;
      }, 100);
    }
  }
}
