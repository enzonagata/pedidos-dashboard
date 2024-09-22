import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/compat/firestore';
import { Observable, combineLatest, firstValueFrom, map, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  private checkinCollection!: AngularFirestoreCollection<any>;
  itemCustomer: Observable<any[]>;
  constructor(private afs: AngularFirestore) { }


  async getCustomerAsync(idCustomer) {
    const response = this.afs.collection('customers', ref => ref.where('uid', '==', `${idCustomer}`).limit(1)).get();
    const result = await firstValueFrom(response).then((result) => result.docs[0].data());
    return result;
  }

  //Lista todos os checktins
  getCheckins() {
    return this.afs.collection('checkin', ref => ref.where('companyId', '==', `${localStorage.getItem('_cpnj')}`).orderBy('dateTime', 'desc').limit(10)).snapshotChanges()
      .pipe(
        switchMap((checkins) => {
          const res = checkins.map((item) => {
            const row: any = item.payload.doc.data()
            return this.afs.collection<any>("customers", ref => ref.where("uid", "==", row.customerId)).valueChanges().pipe(map(res => {
              const customer = res[0];
              return Object.assign(row, { customer });
            }
            ))
          });
          return combineLatest([...res]);
        }),
      );
  }

}
