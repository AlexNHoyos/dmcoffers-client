import { Component, OnInit } from '@angular/core';
import { SweItemMenuService } from './sweitemmenu.service';
import { idRolesPorItemMenu, MenuItem } from './sweitemmenu.models';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';


@Component({
  selector: 'app-sweitemmenu',
  templateUrl: './sweitemmenu.component.html',
  styleUrls: ['./sweitemmenu.component.scss']
})

export class SweItemMenuComponent implements OnInit {


  menuItems: MenuItem[] = [];
  espaciadoLateral: string = '';
  userRoles: string = '';
  itemMenuRoles: idRolesPorItemMenu[] = [];

  constructor(
    private sweItemMenuService: SweItemMenuService,
    private router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.sweItemMenuService.getMenuItem().subscribe((items: MenuItem[]) => {
      const itemMap = new Map<number, MenuItem>();

      items.forEach(item => {
        itemMap.set(item.id, { ...item, subMenus: [], expanded: false });
      });

      let menuItems: MenuItem[] = [];

      menuItems.forEach(item => {
        item.subMenus = [];
      })

      items.forEach(item => {
        let rolMenu: idRolesPorItemMenu = new idRolesPorItemMenu();
        let roles: string[] = [];

        rolMenu.idItemMenu = item.id

        roles = item.roles_permitidos.split(',');

        roles.forEach(r => {
          rolMenu.idRoles.push(Number(r));
        });

        this.itemMenuRoles.push(rolMenu);

        if (!item.idSupItemMenu) {
          menuItems.push(itemMap.get(item.id)!);
        }
      });

      //console.log(this.itemMenuRoles);

      items.forEach(itemHijo => {
        if (itemHijo.idSupItemMenu) {
          items.forEach(itemPadre => {
            let indexItemPadre: number;
            if (itemPadre.id == Number(itemHijo.idSupItemMenu)) {
              indexItemPadre = items.indexOf(itemPadre);
              menuItems[indexItemPadre].subMenus.push(itemHijo);
            }
          });
        }
      });

      this.menuItems = menuItems;


    });
  }


  toggleSubMenu(item: MenuItem): void {
    item['expanded'] = !item['expanded'];
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  getItemHeight(item: MenuItem): string {
    if (!item.expanded) {
      return '50px'; // Altura normal cuando está colapsado
    }
    const baseHeight = 50; // Altura base del ítem principal
    const subItemHeight = 50; // Altura de cada submenú
    return `${baseHeight + (item.subMenus?.length || 0) * subItemHeight}px`;
  }

}
