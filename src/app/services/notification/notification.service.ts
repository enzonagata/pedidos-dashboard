import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageCollection!: AngularFirestoreCollection<any>
  constructor(private afs: AngularFirestore) {
    this.messageCollection = this.afs.collection<any>('messages', ref => ref.where('companyId', '==', `${localStorage.getItem('_cpnj')}`));
  }

  create(message: any): any {
    return this.messageCollection.add(message);
  }

  getMessages() {
    return this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      })
    )
  }
}
