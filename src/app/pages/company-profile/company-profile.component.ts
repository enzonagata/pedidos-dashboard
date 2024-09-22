import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CategoryService } from 'src/app/services/category/category.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  companyProfileForm: UntypedFormGroup;
  company: any;
  categories: any[] = []

  constructor(
    private categoryService: CategoryService,
    private companiesService: CompaniesService,
    private formBuilder: UntypedFormBuilder,
    private store: Store<{ company: any }>
  ) {
  }

  ngOnInit() {
    this.listCategories();
    this.getState(this.store);
  }

  getState(store: Store<any>): any {
    store.select('company').subscribe(
      res => {
        this.company = res.company;
        this.createForm(res.company);
      }
    )
  }

  createForm(data?: any) {    
    this.companyProfileForm = this.formBuilder.group({
      id: [data ? data.id : null],
      companyId: [data ? data.companyId : ''],
      cnpj: [data.cnpj ?? 123456],
      nomeFantasia: [data.nomeFantasia ?? '', Validators.required],
      razaoSocial: [data.razaoSocial ?? '', Validators.required],
      endereco: [data.endereco ?? '', Validators.required],
      cep: [data.cep ?? '', Validators.required],
      bairro: [data.bairro ?? '', Validators.required],
      numero: [data.numero ?? '', Validators.required],
      uf: [data.uf ?? '', Validators.required],
      municipio: [data.municipio ?? '', Validators.required],
      geolocalizacao: this.formBuilder.group({
        lat: [data.geolocalizacao.lat ?? '', Validators.required],
        lng: [data.geolocalizacao.lng ?? '', Validators.required]
      }),
      categoria: data ? data.categoria : "",
      socials: this.formBuilder.group({
        facebook: data ? data?.socials?.facebook : "",
        instagram: data ? data?.socials?.instagram : "",
        linkedin: data ? data?.socials?.linkedin : "",
        whatsapp: data ? data?.socials?.whatsapp : "",
      }),
      // telefones: [data ? data.telefones : []],
      // isOnline: data ? data.isOnline : false,
      // discounts: [data ? data.discounts : []],
      // status: data ? data.status : 1
    })
  }

  listCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categories = res.sort((a, b) => a.description.localeCompare(b.description))
    })
  }

  formSubmit() {
    if (this.companyProfileForm.invalid) {
      Swal.fire("Atenção", "Existem campos obrigatórios que não foram preenchidos.", "warning")
      return;
    } else {
      try {
        this.companiesService.update(this.companyProfileForm.value)
        Swal.fire("Salvo com Sucesso.", "", "success")
      } catch (error) {
        Swal.fire("Erro!", "Não foi possível atualizar os seus dados. Tente novamente mais tarde.", "error")
      }
    }
  }

}
