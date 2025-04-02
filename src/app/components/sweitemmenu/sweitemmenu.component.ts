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
        if (item.idSupItemMenu != null) {
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
}
