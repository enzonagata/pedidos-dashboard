import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import Swal from 'sweetalert2';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/company-profile', title: 'Perfil', icon: 'ni-single-02 text-blue', class: '' },
  //{ path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/check-ins', title: 'Check-Ins', icon: 'ni-check-bold text-primary', class: '' },
  { path: '/messages', title: 'Notificações', icon: 'ni-notification-70 text-primary', class: '' },
  //{ path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', class: '' },


  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
  // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public company: any = {};

  constructor(
    private router: Router,
    private companiesService: CompaniesService,
    private authService: AuthService,
    private store: Store<{ company: any }>
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.getState(this.store);
  }

  getState(store: Store<any>): any {
    store.select('company').subscribe(
      res => {
        this.company = res.company;
      }
    )
  }

  logout() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Deseja sair?',
      text: 'Você vai fazer logout!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair!',
      cancelButtonText: 'Não, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        try {
          this.authService.logout();
        } catch (error) {
          console.error(error);
          Swal.fire("Erro!", "Não foi possível sair. Tente novamente mais tarde.", "error")
        }
      }
    });
  }
}
