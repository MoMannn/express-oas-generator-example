/**
 * System Error code.
 */
export enum SystemErrorCode {
  UNHANDLED_SYSTEM_ERROR = 500000,
}
  
/**
 * Route Error code.
 */
export enum RouteErrorCode {
  INVALID_PATH = 400000,
}

/**
 * Serialized strategy.
 */
export enum SerializedStrategy {
  DB = 'db',
  PUBLIC = 'public',
}

/**
 * Populate strategy.
 */
export enum PopulateStrategy {
  DB = 'db',
  PUBLIC = 'public', // public input
}