import {State as App} from './app'
import {State as Common} from './common'

// 根State
export interface Root{
    app: App;
    common: Common;
};