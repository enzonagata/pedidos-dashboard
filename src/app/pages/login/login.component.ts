import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/reducers/actions/company.actions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: UntypedFormGroup;
  loading: boolean = false;
  message: string = ''
  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private companiesService: CompaniesService,
  ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
  }

  createForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.get('email')?.markAsTouched();
      this.formLogin.get('password')?.markAsTouched();
      return;
    } else {
      this.loading = true;
      this.authService.login(this.formLogin.value).then(res => {
        this.companiesService.getCompanyInfo().then((res: any) => {
          localStorage.setItem('_cpnj', res.id);
        });
        this.loading = false;
      }).catch(error => {
        this.loading = false;
        switch (error?.code) {
          case 'auth/wrong-password': this.message = "E-mail ou senha inválidos."

            break;
          case 'auth/invalid-email': this.message = "Informe um e-mail inválido."
            break;

          case 'auth/user-not-found': this.message = "Nenhum usuário encontrado."
            break;

          case 'auth/user-disabled': this.message = "Usuário desativado"
            break;
        }

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false,
        })

        swalWithBootstrapButtons.fire({
          text: this.message,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
          cancelButtonText: 'Não, cancelar!',
          reverseButtons: false
        })
      })
    }
  }

}
