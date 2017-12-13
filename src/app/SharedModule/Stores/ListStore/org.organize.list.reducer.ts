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
            const index1 = new_state2.list.findIndex((item) => item.id === action.payload.id);

            if (index1 > -1) {
                new_state2.list[index1] = action.payload;
            } else {
                new_state2.list.push(action.payload);
            }

            return new_state2;
        case ActionsList.DELETE_ITEM:
            const new_state3 = {
                ...state
            };

            const index2 = new_state3.list.findIndex((item) => item.id === action.payload);
            if (index2 > -1) {
                new_state3.list.splice(index2, 1);
            }

            return new_state3;
        default:
            const new_state4 = {
                ...state
            };
            return new_state4;
    }
}
