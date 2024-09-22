import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  messageForm: UntypedFormGroup;
  company: any;
  categories: any[] = [];
  messages: any[];

  constructor(
    private notificationService: NotificationService,
    private companiesService: CompaniesService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ company: any }>
  ) {
  }

  ngOnInit() {
    this.getState(this.store);
    this.getMessages();
  }

  getState(store: Store<any>): any {
    store.select('company').subscribe(
      res => {
        this.company = res.company;
        this.createForm(res.company);
      }
    )
  }

  getMessages() {
    this.notificationService.getMessages().subscribe({
      next: (res) => {
        this.messages = res;
      }
    });
  }

  createForm(data?: any) {
    this.messageForm = this.formBuilder.group({
      title: ['', Validators.required],
      notification: ['', Validators.required],
    })
  }


  formSubmit() {
    console.log(this.messageForm.value);
    if (this.messageForm.invalid) {
      Swal.fire("Atenção", "Existem campos obrigatórios que não foram preenchidos.", "warning")
      return;
    } else {
      try {
        const saveForm = this.messageForm.value;
        saveForm.companyId = localStorage.getItem('_cpnj');        
        this.notificationService.create(this.messageForm.value)
        Swal.fire("Salvo com Sucesso.", "", "success")
      } catch (error) {
        Swal.fire("Erro!", "Não foi possível atualizar os seus dados. Tente novamente mais tarde.", "error")
      }
    }
  }

}
