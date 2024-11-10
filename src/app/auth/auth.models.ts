export class User {
    id: string = '';
    idUserAuth?: string;
    realname: undefined | string = '';
    surname: undefined | string = '';
    username: string = '';
    birth_date?: Date;
    delete_date?: Date;
    creationuser?: string;
    creationtimestamp?: Date;
    password?: string;
    salt?: string;
    status?: boolean;
    modificationuser?: string;
    modificationtimestamp?: Date;
}
