export type TokenRequest = {
    username: string;
    password: string;
}

export type ErrorResponse = {
    code: number;
    message: string;
}

export type UserType = {
    UserID: number;
    Username: string;
    Password: string;
    nickname: string;
    roles: Array<string>;
    permissions:Array<string>;
    address: string;
}

export type RegisterRequest = {
    username: string;
    password: string;
    realname: string;
    idcard: string;
    KeysConfirm: string;
}

export type dashboardType = {
    Username: string;
    RealName: string;
    NoteSum:  string;
    StoreSum: string;
    EditTime: number;
}

export type repoType = {
    Username: string;
    StoreName: string;
    CreateTime:string;
    Resume: string;
}

export type todolistType = {
    data: Array<string>;
}

export type KeysType = {
    CreateTime: number;
    TodoName: string
}

export interface Paging {
    page?: number;
    size?: number;
    total?: number;
}

export type ListResult<T> = {
    paging: Paging;
    data: Array<T>;
}

export interface UserFilter extends Paging {
    name: string;
}

export interface Searchable<T> {
    list(filter: object): Promise<ListResult<T>>;
}

export interface Editable<R,T> {
    create(request:R): Promise<T>
    edit(id:string, request:R): Promise<T>
}

export interface UserCreateRequest {
    username: string;
    address: string;
    roles?: Array<string>;
}

export interface RoleCreateRequest {
    name: string;
    label: string;
    permission: Array<string>;
}

export type RoleType = {
    id: string;
    name: string;
    label: string;
    permissions: Array<string>;
}

export interface RoleFilter extends Paging {
    name: string;
    label: string;
}
export interface MarkdownCreateRequest {
  name: string;
}

export type NoteType = {
    notename: string;
    createtime: string;
    keyword: string;
    summary: string;
    storename: string;
}

export interface MarkdownFilter extends Paging {
  name: string;
}

export type MarkdownType = {
  id: string;
  name: string;
};
export type MarkwriteGetRequest = {
  notename: string;
}

export interface MarkwriteFilter extends Paging {
  name: string;
}

export type MarkwriteType = {
  id: string;
  name: string;
};

export type PersonType = {
    username: string;
    realname: string;
    password: string;
    ID_card: string;
}

export type MarkCreateType = {
    // text: string;
    // storename: string;
    // notename: string;
    // keys: string;
    message: string;
}