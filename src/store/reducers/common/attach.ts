import { Action } from '../../actions';
import * as Actions from '../../actions/common/attach';
import * as State from '../../state/common';

export const initialState: State.Attach = {
};

export const reducer = (state: State.Attach = initialState, action: Action): State.Attach => {
    switch (action.type) {
        case Actions.GROUP_FETCH_LIST_SUCCESS:
            return {
                ...state,
                groupList: action.payload.list
            };

        case Actions.GROUP_FETCH_LIST_FAILURE:
            return {
                ...state,
                error: action.payload.error
            };
        default: return state;
    }
};