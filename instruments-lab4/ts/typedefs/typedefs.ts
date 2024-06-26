export type Predicate<T> = (t: T) => boolean;
export type Comparator<T> = (t1: T, t2: T) => number;
export type ObjectValues<T> = T[keyof T];