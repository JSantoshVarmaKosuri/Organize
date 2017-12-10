import * as ActionsList from './org.organize.list.actions';

import { ListReducer, ListItemModel } from '../Models/org.list.model';

import { MOCK_LIST_DATA } from '../../Services/MockData/org.organize.list.data';

const INIT_STATE: ListReducer = {
    list : MOCK_LIST_DATA
};

export function ListReducers(state = INIT_STATE, action) {

    switch (action.type) {
        case ActionsList.ADD_ITEM:
            const new_state1 = {
                ...state,
                list: [...state.list, action.payload]
            };
            return new_state1;
        case ActionsList.UPDATE_ITEM:
            const new_state2 = {
                ...state
            };
            const index = new_state2.list.findIndex((item) => item.id === action.payload.id);

            if (index > -1) {
                new_state2.list[index] = action.payload;
            }

            return new_state2;
        default:
            const new_state3 = {
                ...state
            };
            return new_state3;
    }
}
