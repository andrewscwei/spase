import { type ArrayDescriptor } from './ArrayDescriptor.js'
import { type JSONDescriptor } from './JSONDescriptor.js'

/**
 * A type that can be used to create a {@link Size}.
 */
export type Descriptor = ArrayDescriptor | JSONDescriptor
