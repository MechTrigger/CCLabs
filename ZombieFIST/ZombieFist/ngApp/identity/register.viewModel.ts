namespace zombieApp.identity {

    // Typescript class that matches up with the C# class used by Web Api
    export class registerViewModel {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
    }
}