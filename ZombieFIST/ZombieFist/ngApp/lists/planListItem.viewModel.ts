namespace zombieApp.lists {

    // Typescript class that holds our profile info
    export class planListItemViewModel {
        id: number;
        listId: number;
        text: string;

        // property for tracking if in edit or display state
        isEdit: boolean;
    }
}