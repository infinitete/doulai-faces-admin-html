export interface App {
    id: string,
    app: string,
    key: string,
    secret: string,
    desc: string,
    createdAt: number,
    expiredAt: number,
    locked: boolean,
    expired: boolean
}


export interface Person {
    name: string,
    gender: string,
    idNumber: string,
    address: string,
}

export interface Picture {
    id: string,
    longcodee: string,
    path: string,
    person: Person
}
