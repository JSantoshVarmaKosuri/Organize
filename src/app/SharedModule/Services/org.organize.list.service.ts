import { Injectable } from '@angular/core';
import { TodoListModel, ListItem, ListItemModel } from "../../SharedModule/Stores/Models/org.list.model";

@Injectable()
export class OrganizeListService {
    public activeListItem: ListItemModel;

    createListItem(type: string, id: string, title:string, description: string, todo: TodoListModel, 
                   drawing: string[], record: string[], image: string[]) {
        this.activeListItem =  new ListItem(
            (id) ? id : (new Date).valueOf().toString(),
            new Date().toUTCString(),
            type,
            '',
            '',
            {
                active: [],
                completed: []
            },
            [],
            [],
            image);
    }
}
