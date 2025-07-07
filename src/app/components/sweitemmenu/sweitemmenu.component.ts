import { Component, OnInit } from '@angular/core';
import { SweItemMenuService } from './sweitemmenu.service';
import { idRolesPorItemMenu, MenuItem } from './sweitemmenu.models';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-sweitemmenu',
  templateUrl: './sweitemmenu.component.html',
  styleUrls: ['./sweitemmenu.component.scss']
})

export class SweItemMenuComponent implements OnInit {


  menuItems: MenuItem[] = [];
  espaciadoLateral: string = '';
  userRoles: string = '';

  constructor(
    private sweItemMenuService: SweItemMenuService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    let menuItems: MenuItem[] = [];

    menuItems.forEach(item => {
      item.subMenus = [];
    });

    this.sweItemMenuService.getMenuItem().subscribe((items: MenuItem[]) => {
      const itemMap = new Map<number, MenuItem>();
      let flag: number = 0;

      items.forEach(item => {
        itemMap.set(item.id, { ...item, subMenus: [], expanded: false });

        flag = this.validaRoles(item);

        if (flag == 1) {
          if (!item.idSupItemMenu) {
            menuItems.push(itemMap.get(item.id)!);
          }
        }
      });

      flag = 0;

      items.forEach(itemHijo => {

        flag = this.validaRoles(itemHijo);

        if (flag == 1) {
          items.forEach(itemPadre => {
            let indexItemPadre: number;
            if (itemPadre.id == Number(itemHijo.idSupItemMenu)) {
              indexItemPadre = menuItems.indexOf(itemPadre);
              menuItems[indexItemPadre].subMenus.push(itemHijo);
            }
          });
        }
      });
    });

    this.menuItems = [...menuItems];

  }

  validaRoles(item: MenuItem): number {
    let flag: number = 0;
    let idUser: number;
    let rolesUsuario: number[];
    let rolMenu: idRolesPorItemMenu = new idRolesPorItemMenu();
    let roles: string[] = [];

    this.userService.getUserId().subscribe(data => {
      if (data != null) {
        this.userService.getAllUserRoles(data).subscribe(data => {
          rolesUsuario = data;

          rolMenu.idItemMenu = item.id

          roles = item.roles_permitidos.split(',');

          roles.forEach(r => {
            rolMenu.idRoles.push(Number(r));
          });

          rolesUsuario.forEach(ru => {
            rolMenu.idRoles.forEach(idRol => { // ===============> SEGUIR CORRIGIENDO DESDE ACA
              if (idRol == ru) {
                return 1;
              }
            })
          });
        });
      }
    });
    return 0;
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
