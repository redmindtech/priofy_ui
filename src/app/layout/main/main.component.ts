import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
  public menu = MENU;
  currentUser: any;
  username: any;
 

  constructor() { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
   let name= this.currentUser.username
   if(name=="Operator1"){
      this.username="Siva"
   }
   else if(name=="Operator2"){
    this.username="Sakthi"
   }
   else if(name=="Operator3"){
    this.username="Manoj"
   }
   else if(name=="Operator4"){
    this.username="Karthik"
   }
   else if(name=="Admin"){
    this.username="Arun"
   }
    document.querySelector('body')?.removeAttribute('class');
    document.querySelector('body')?.classList.add('sidebar-mini','sidebar-open','layout-fixed');
  }

  toggleMenuSidebar() {
    if (this.sidebarMenuOpened) {
      document.querySelector('body')?.classList.remove('sidebar-open');
      document.querySelector('body')?.classList.add('sidebar-collapse');
      this.sidebarMenuOpened = false;
    } else {
      document.querySelector('body')?.classList.remove('sidebar-collapse');
      document.querySelector('body')?.classList.add('sidebar-open');
      this.sidebarMenuOpened = true;
    }
  }

}

export const MENU = [
  // {
  //   name: 'Hazards & Precaution',
  //   path: ['/main/today'],
    
  // },
  // {
  //   name: 'Tools & Equipment',
  //   path: ['/main/toolcomp']
  // },
  // {
  //   name: 'Administration',
  //   icon: 'fa-users-cog',
  //   children: [
  //     {
  //       name: 'User management',
  //       path: ['/user-management'],
  //       icon: 'fa-users',
  //     },
  //     {
  //       name: 'API',
  //       path: ['/docs'],
  //       icon: 'fa-book',
  //     },
  //     {
  //       name: 'Sub Menu 1',
  //       path: ['/sub-menu-1']
  //     },
  //     {
  //       name: 'Sub Menu 2',
  //       path: ['/sub-menu-2']
  //     }
  //   ]
  // }
];