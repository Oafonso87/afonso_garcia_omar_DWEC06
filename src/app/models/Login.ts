export class Login {

    public id : number;
    public user : string;
    public password : string;
    public email : string;

    constructor(id : number, user : string, password : string, email : string) {

        this.id = id;
        this.user = user;
        this.password = password;
        this.email = email;
    }
}