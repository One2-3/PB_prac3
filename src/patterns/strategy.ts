// src/patterns/strategy.ts

export interface DiscountStrategy {
    label: string;
    calc(price: number): number;
  }
  
  export class NoDiscount implements DiscountStrategy {
    label = '기본가';
    calc(price: number): number {
      return price;
    }
  }
  
  export class StudentDiscount implements DiscountStrategy {
    label = '학생 할인 (20%)';
    calc(price: number): number {
      return price * 0.8;
    }
  }
  
  export class BlackFridayDiscount implements DiscountStrategy {
    label = '블랙프라이데이 (40%)';
    calc(price: number): number {
      return price * 0.6;
    }
  }
  
  export class PriceCalculator {
    constructor(private strategy: DiscountStrategy) {}
  
    setStrategy(strategy: DiscountStrategy) {
      this.strategy = strategy;
    }
  
    getTotal(price: number): number {
      return this.strategy.calc(price);
    }
  }
  