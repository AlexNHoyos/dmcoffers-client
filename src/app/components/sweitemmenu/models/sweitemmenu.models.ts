export interface MenuItem {
    id: string;
    label: string;
    route: string;
    subMenus?: null | MenuItem[];
    expanded?: boolean;
}
