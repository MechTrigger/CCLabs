namespace zombieApp.locations {

    // Typescript class that holds our profile info
    export class locationVm {
        constructor(id?: number, title?: string, latitude?: number, longitude?: number, locationType?: locationType) {
            this.id = id;
            this.title = title;
            this.latitude = latitude;
            this.longitude = longitude;
            this.locationType = locationType;
        }

        id: number;
        title: string;
        latitude: number;
        longitude: number;
        locationType: locationType;
    }
}