import { Page } from "src/app/models/pagination";

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    idSupItemMenu: Promise<MenuItem>;
    idSweAccModApl: any;
    endpoint: string;
    ordernumber: number;
    creationtimestamp: Date;
    creationuser: string;
    modificationtimestamp: Date;
    modificationuser: string;
    subMenus?: null | MenuItem[];
    expanded?: boolean;
}

export interface SweItemMenuPage extends Page<MenuItem> {
    content: MenuItem[];
}