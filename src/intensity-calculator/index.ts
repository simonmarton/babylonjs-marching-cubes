import { Parser, Expression } from 'expr-eval';

interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export default class IntensityCalculator {
  private expression: Expression;
  private cache: Record<string, number> = {};
  constructor(rawExpression: string, private debug?: boolean) {
    this.expression = Parser.parse(rawExpression);
  }

  getIntensity({ x, y, z }: Vector3Like): number {
    const cacheKey = `${x}-${y}-${z}`;
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    const value = this.expression.evaluate({ x, y, z });

    if (this.debug) {
      console.log('intensity: ', { value, x, y, z });
    }

    this.cache[cacheKey] = value;

    return value;
  }
}
