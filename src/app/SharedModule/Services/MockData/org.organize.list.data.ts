import { ListItemModel } from '../../Stores/Models/org.list.model';

export const MOCK_LIST_DATA: ListItemModel[] = [
    {
        id: '1512850511535',
        createdAt: new Date().toUTCString(),
        type: 'note',
        title: 'asdbsdama,s dasmd basdjasbdkjahssd',
        // tslint:disable-next-line:max-line-length
        description: 'asdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdj',
        todo: {
            active: [],
            completed: []
        },
        drawing: [],
        recording: [],
        image: []
    },
    {
        id: '15128505115321',
        createdAt: new Date().toUTCString(),
        type: 'note',
        title: null,
        // tslint:disable-next-line:max-line-length
        description: 'asdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdjasdbsdama,s dasmd basdjasbdkjahssdjsdjhkasjkkjadsbaskbaskjbaskjhasahdj',
        todo: {
            active: [],
            completed: []
        },
        drawing: [],
        recording: [],
        image: []
    },
    {
        id: '123412850511535',
        createdAt: new Date().toUTCString(),
        type: 'note',
        title: 'asdbsdama,s dasmd basdjasbdkjahssd',
        // tslint:disable-next-line:max-line-length
        description: null,
        todo: {
            active: [],
            completed: []
        },
        drawing: [],
        recording: [],
        image: []
    },
    {
        id: '151224350511535',
        createdAt: new Date().toUTCString(),
        type: 'list',
        title: 'Todo List',
        // tslint:disable-next-line:max-line-length
        description: null,
        todo: {
            active: ["Todo 2", "Todo 3"],
            completed: ["Todo 1"]
        },
        drawing: [],
        recording: [],
        image: []
    }
];
