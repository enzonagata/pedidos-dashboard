import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryCollection!: AngularFirestoreCollection<any>
  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection<any>('categories');
   }

  getCategories() {
    return this.categoryCollection.snapshotChanges().pipe(
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
