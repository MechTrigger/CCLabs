namespace zombieApp.lists {

    // Typescript class that holds our profile info
    export class planListViewModel {
        // not properties that are saved, but are used as 
        // a way to keep track of an item being added.
        newItem: string;
        newItemError: boolean;

        // property for tracking if in edit or display state
        isEdit: boolean;


        id: number;
        name: string;
        items: Array<planListItemViewModel>;
    }
}