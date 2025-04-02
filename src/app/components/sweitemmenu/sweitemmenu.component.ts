import { Component, OnInit } from '@angular/core';
import { SweItemMenuService } from './sweitemmenu.service';
import { MenuItem } from './sweitemmenu.models';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sweitemmenu',
  templateUrl: './sweitemmenu.component.html',
  styleUrls: ['./sweitemmenu.component.scss']
})
export class SweItemMenuComponent implements OnInit {


  menuItems: MenuItem[] = [];
  //userRole: string = '';

  constructor(private sweItemMenuService: SweItemMenuService, private router: Router) { }

  ngOnInit(): void {
    this.loadMenuItems();

  }

  loadMenuItems(): void {
    this.sweItemMenuService.getMenuItem().subscribe((items: MenuItem[]) => {
      this.menuItems = items.map(item => ({
        ...item,
        subMenus: [],
        expanded: false
      }));
      this.menuItems.forEach(item => {
        console.log(item);

        if (item.idSupItemMenu != null) {
          /* console.log(item); */
          let subItemIndex = this.menuItems.indexOf(item);
          this.menuItems.splice(subItemIndex, 1);
          this.menuItems.forEach(item2 => {
            if (item2.id == Number(item.idSupItemMenu)) {
              let itemIndex = this.menuItems.indexOf(item2);
              this.menuItems[itemIndex].subMenus.push(item);
            }
          })
        }
      })
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
    const subItemHeight = 40; // Altura de cada submenú
    return `${baseHeight + (item.subMenus?.length || 0) * subItemHeight}px`;
  }

}
