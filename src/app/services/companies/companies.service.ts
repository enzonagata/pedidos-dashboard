import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { Companies } from 'src/app/interfaces/companies';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private companiesCollection!: AngularFirestoreCollection<any>
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.companiesCollection = this.afs.collection('companies', ref => ref.where('companyId', '==', `${this.authService.userToken()}`))
  }

  getCompany() {
    return this.companiesCollection?.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }

  getCompanyInfo() {
    return this.afs.collection('companies', ref => ref.where('companyId', '==', `${this.authService.userToken()}`)).ref.get().then((res) => res.docs[0].data());
  }

  getCompanyById(id: string) {
    return this.afs.collection('companies').doc(id)
  }
  update(company: any) {
    return this.companiesCollection.doc<any>(company.id).update(company)
  }
}
