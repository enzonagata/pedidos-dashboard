import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import Swal from 'sweetalert2';
import { CompaniesService } from '../companies/companies.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afa: AngularFireStorage, private companyService: CompaniesService) { }

  startUpload(event: File, company: any) {
    const file = event;

    if (file?.type.split('/')[0] !== 'image') {
        console.error('unsupported file type');
        // return;
    }

    const path = `profile/${new Date().getTime()}_${file.name}`;
    // const customMetadata = { app: 'My App' };

    const fileRef: AngularFireStorageReference = this.afa.ref(path);
    const task: AngularFireUploadTask = fileRef.put(file);
    task.then(data => {
      data.ref.getDownloadURL().then(url => {
        console.log(url);
        company.foto = url
        this.companyService.update(company)
          Swal.fire("Salvo com Sucesso.", "", "success")
      })
    })
  }
}
