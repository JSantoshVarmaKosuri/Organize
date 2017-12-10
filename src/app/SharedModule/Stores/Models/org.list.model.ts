export interface ListItemModel {
    id: string;
    type: string;
    title: string;
    description: string;
    todo: string[];
    drawing: boolean;
    recording: boolean;
    image: boolean;
    source: string;
}

export class ListItem implements ListItemModel {
    constructor(public id: string,
                public type: string,
                public title: string,
                public description: string,
                public todo: string[],
                public drawing: boolean,
                public recording: boolean,
                public image: boolean,
                public source: string
            ) {}
}

export interface ListReducer {
    list: ListItemModel[];
}
