/**
 * @file This is a very dumb demo. It needs to be revised, but for now, it's
 *       just a quick way during development to test the API.
 */

import { Rect } from '../../build';

const debug = require('debug')('spase');
const mainNode = document.getElementById('main');
const aNode = document.getElementById('a');
const bNode = document.getElementById('b');

window.localStorage.debug = 'spase*';

debug('Viewport', Rect.fromViewport());

debug('<body>', Rect.from(window));
debug('<body> (with overflow)', Rect.from(window, { overflow: true }));
debug('<body> (from children)', Rect.fromChildrenOf(window));

debug('#main', Rect.from(mainNode));
debug('#main (with overflow)', Rect.from(mainNode, { overflow: true }));
debug('#main (from children)', Rect.fromChildrenOf(mainNode));

debug('#b', Rect.from(bNode));
debug('#b (relative to #main)', Rect.from(bNode, { reference: mainNode }));
