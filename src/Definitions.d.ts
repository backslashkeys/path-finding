export type GetNeighbors<T> = (cell: T) => T[];
/**
 * A `Map` of `T` leading to another `T`.
 */
export type FlowMap<T extends defined> = Map<T, T>;
