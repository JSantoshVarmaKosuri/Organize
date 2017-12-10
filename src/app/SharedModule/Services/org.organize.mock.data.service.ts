import { Injectable } from '@angular/core';

import { MOCK_LIST_DATA } from './MockData/org.organize.list.data';

@Injectable()
export class MockDataService {
    getListData() {
        return MOCK_LIST_DATA;
    }
}
