export interface ListItemModel {
    id: string;
    createdAt: string;
    type: string;
    title: string;
    description: string;
    todo: TodoListModel;
    drawing: string[];
    recording: string[];
    image: string[];
}

export interface TodoListModel {
    active: string[],
    completed: string[]
}

export class ListItem implements ListItemModel {
    constructor(public id: string,
                public createdAt: string,
                public type: string,
                public title: string,
                public description: string,
                public todo: TodoListModel,
                public drawing: string[],
                public recording: string[],
                public image: string[]
            ) {}
}

export interface ListReducer {
    list: ListItemModel[];
}
