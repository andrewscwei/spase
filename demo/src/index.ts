/**
 * @file This is a very dumb demo. It needs to be revised, but for now, it's
 *       just a quick way during development to test the API.
 */

import { Rect } from '../../build';

const parent = document.getElementById('a');

console.log(Rect.from(window));
console.log(Rect.fromChildrenAfter(0, parent));
