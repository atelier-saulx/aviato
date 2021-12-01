/**
 * Adds support for nominal types. Provides a solution for those situations where duck-typing is not appropriate, or
 * where one wants to use semantically distinct subtypes of primitive types (e.g., to avoid passing centimeters to a
 * function that expects inches).
 *
 * @example
 * ```
 * // Declaring a nominal subtype of a primitive type (in this case, a subtype of number representing time in milliseconds)
 * export type Milliseconds = Nominal<number, "milliseconds">;
 *
 * // Declaring a function that takes this nominal type as a parameter
 * function delay(delayInMilliseconds: Milliseconds): void {
 *   sleep(delayInMilliseconds); // works just like a number
 * }
 *
 * // Invoking a function that takes a nominal type as a parameter
 * delay(10 as Milliseconds);
 * ```
 * @public
 */
export type Nominal<Type, Brand> = Type & Branded<Brand>

export class Branded<Brand> {
  protected readonly _____brand: Brand = undefined as unknown as Brand
}
