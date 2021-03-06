import { Action } from '@ngrx/store';

import { ListItemModel } from '../Models/org.list.model';

export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export class AddListItem implements Action {
    readonly type = ADD_ITEM;
    constructor(public payload: ListItemModel) {}
}

export class UpdateListItem implements Action {
    readonly type = UPDATE_ITEM;
    constructor(public payload: ListItemModel) {}
}

export class DeleteListItem implements Action {
    readonly type = DELETE_ITEM;
    constructor(public payload: string) {}
}

export type ActionsList = AddListItem | UpdateListItem | DeleteListItem;
