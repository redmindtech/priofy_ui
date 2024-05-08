import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
  // public menu = MENU;
  public menu: any[] = [];
  currentUser: any;
  username: any;
  headname: any;
  screen: any='Dashboard';
  fullUrl: any;
  role: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
  
  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    let name = this.currentUser.username;
    console.log(name);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Get the full URL
        this.fullUrl = event.url;
        console.log(this.fullUrl);
        console.log(name);
        if (name === 'Admin') {
          console.log('else');
          if (this.fullUrl === '/main/maindashboard') {
            this.screen = 'Dashboard';
          }
          if (this.fullUrl === '/main/dashboard') {
            this.screen = 'Procedure Catalogue';
          }
          if (this.fullUrl === '/main/Admin') {
            this.screen = 'Work Orders';
           
          }
          if(this.fullUrl === '/main/mainmenu')
            {
             this.screen='Furnace Startup' ; 
              }
              if(this.fullUrl === '/main/showadmin')
                {
                 this.screen='Furnace Startup' ; 
                
                }
        }
        if (
          name == 'Operator1' ||
          name == 'Operator2' ||
          name == 'Operator3' ||
          name == 'Operator4'
        ) {
          if (this.fullUrl === '/main/dashboard') {
            this.screen = 'Dashboard';
          }
          if (this.fullUrl === '/main/home') {
            this.screen = 'My Work Orders';
          }
          if(this.fullUrl === '/main/mainmenu')
            {
             this.screen='Furnace Startup' ;   
                     }
                     if(this.fullUrl === '/main/showadmin')
                      {
                       this.screen='Furnace Startup' ;            }
                       if(this.fullUrl === '/main/dashboard')
                        {
                              this.screen='Procedure Catalogue'           }
                              if(this.fullUrl === 'main/operdashboard')
                                {
                                      this.screen='Dashboard'}
                              
        }
      }
    });

    if (name == 'Operator1') {
      this.headname = 'Process Digitization';
      this.username = 'Prakash';
      this.role = 'Outside Operator'
      this.menu = this.getOperator1Menu();
    } else if (name == 'Operator2') {
      this.headname = 'Process Digitization';
      this.role = 'Inside Operator'
      this.username = 'Bala';
      this.menu = this.getOperator1Menu();
    } else if (name == 'Operator3') {
      this.headname = 'Process Digitization';
      this.role = 'Outside Operator'
      this.username = 'Arun';
      this.menu = this.getOperator1Menu();
    } else if (name == 'Operator4') {
      this.headname = 'Process Digitization';
      this.role = 'Inside Operator'
      this.username = 'Rangith';
      this.menu = this.getOperator1Menu();
    } else if (name == 'Admin') {
      this.headname = 'Process Digitization';
      this.username = 'Kumar';
      this.role = 'Shift Leader'
      this.menu = this.getAdminMenu();
    } else if (name == 'Processactivitycoordinator') {
      this.headname = 'Safe Work Permit';
      this.username = 'Process Activity Co-Ordinator';
    } else if (name == 'Safeworkpermitissuer') {
      this.headname = 'Safe Work Permit';
      this.username = 'Safe Work Permit Issuer';
    } else if (name == 'Facilityrep') {
      this.headname = 'Safe Work Permit';
      this.username = 'Facility Representative';
    } else if (name == 'Energycontrolplan') {
      this.headname = 'Safe Work Permit';
      this.username = 'Energy Control Plan';
    } else if (name == 'Jobrep') {
      this.headname = 'Safe Work Permit';
      this.username = 'Job Representative';
    }

    document.querySelector('body')?.removeAttribute('class');
    document
      .querySelector('body')
      ?.classList.add('sidebar-mini', 'sidebar-open', 'layout-fixed');
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

  // export const MENU = [
  //   {
  //     name: 'Dashboard',
  //     path: ['/main/maindashboard']
  //   },
  //   {
  //     name: 'Shift Leader Dashboard',
  //     path: ['/main/dashboard']
  //   },

  //   {
  //    name: 'Process Initialization',
  //    path: ['/main/Admin']
  //   },
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
  //];
  private getAdminMenu() {
    return [
      { name: 'Dashboard', path: ['/main/maindashboard'] },
      { name: 'Procedure Catalogue', path: ['/main/dashboard'] },
      { name: 'Work Orders', path: ['/main/Admin'] },
    ];
  }
  private getOperator1Menu() {
    return [
      { name: 'Dashboard', path: ['/main/operdashboard'] },
      { name: 'Procedure Catalogue', path: ['/main/dashboard'] },
      { name: 'My Work Orders', path: ['/main/home'] },
];
}
}