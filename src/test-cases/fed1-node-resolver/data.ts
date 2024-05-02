export interface Node {
    __typename: string;
    id: string;
    [key: string]: any;
}
export interface User {
    __typename: 'User';
    id: string;
    name: string;
}

export interface Post {
    __typename: 'Post';
    id: string;
    title: string;
}

export const nodes: Node[] = [
    {
        __typename: 'User',
        id: '1',
        name: 'Alice',
    },
    {
        __typename: 'User',
        id: '2',
        name: 'Bob',
    },
    {
        __typename: 'Post',
        id: '3',
        title: 'Hello, World!',
    },
];