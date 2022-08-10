export interface Menu{
    id: bigint;
    name: string;
    path: string;
    type: string;
    icon: string;
    sort: number;
    level: number;
    spread: boolean;
    open: boolean;
    selected: boolean;
    disabled: boolean;
    hasChildren: boolean;
    parentId: bigint;
    children: Array<Menu>;
}