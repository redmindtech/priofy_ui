import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public sidebarMenuOpened = true;
 // public menu = MENU;
 public menu: any[] = [];
  currentUser: any;
  username: any;
  headname:any;


  constructor() { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
   let name= this.currentUser.username
   if(name=="Operator1"){
    this.headname="Equate- Process Digitization"
      this.username="Shift-Operator1"
      this.menu = this.getOperator1Menu();
   }
   else if(name=="Operator2"){
    this.headname="Equate- Process Digitization"
    this.username="Shift-Operator2"
    this.menu = this.getOperator1Menu();
   }
   else if(name=="Operator3"){
    this.headname="Equate- Process Digitization"
    this.username="Shift-Operator3"
    this.menu = this.getOperator1Menu();
   }
   else if(name=="Operator4"){
    this.headname="Equate- Process Digitization"
    this.username="Shift-Operator4"
    this.menu = this.getOperator1Menu();
   }
   else if(name=="Admin"){
    this.headname="Equate- Process Digitization"
    this.username="Shift-Leader";
    this.menu = this.getAdminMenu();
   }
  else if(name=='Processactivitycoordinator') 
   {
    this.headname="Safe Work Permit"
    this.username="Process Activity Co-Ordinator";
   }
   else if(name=='Safeworkpermitissuer' )
    {
      this.headname="Safe Work Permit"
     this.username="Safe Work Permit Issuer";
    }
    else if( name=='Facilityrep'){
      this.headname="Safe Work Permit"
      this.username="Facility Representative";
    }
    else if( name=='Energycontrolplan'){
      this.headname="Safe Work Permit"
      this.username="Energy Control Plan";
    }
    else if(  name=='Jobrep'){
      this.headname="Safe Work Permit"
      this.username="Job Representative";
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
//   },
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
    { name: 'Shift Leader Dashboard', path: ['/main/dashboard'] },
    { name: 'Process Initialization', path: ['/main/Admin'] }
  ];
}
private getOperator1Menu() {
  return [
    { name: 'Procedural Dashboard', path: ['/main/dashboard'] },
    { name: 'Operational Dashboard', path: ['/main/home'] },
  ];
}
}
