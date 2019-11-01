/**
 * @file This is a very dumb demo. It needs to be revised, but for now, it's
 *       just a quick way during development to test the API.
 */

import { Rect } from '../../build';

const debug = require('debug')('spase');
const mainNode = document.getElementsByTagName('main')[0];

window.localStorage.debug = 'spase*';

debug('Viewport', Rect.from(window));
debug('Viewport (with overflow)', Rect.from(window, { overflow: true }));
debug('Viewport (from children)', Rect.fromChildrenOf(window));

debug('<body>', Rect.from(document.body));
debug('<body> (with overflow)', Rect.from(document.body, { overflow: true }));
debug('<body> (from children)', Rect.fromChildrenOf(document.body));

debug('<main>', Rect.from(mainNode));
debug('<main> (with overflow)', Rect.from(mainNode, { overflow: true }));
debug('<main> (from children)', Rect.fromChildrenOf(mainNode));
