import { Injectable, signal } from '@angular/core';
import { getFirestore, collection, getDocs, setDoc, doc, query, orderBy, limit, startAfter } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private db = getFirestore();
  private collectionData = signal<any[]>([]);
 
  private lastDoc: any = null;
  private readonly pageSize = 4 ;

  async getCollectionData(isFirstLoad: boolean = true) {
    try {
      const col = collection(this.db, 'numeros');
      let q;
      
      if (isFirstLoad) {
        q = query(col, orderBy('primos.peticion', 'desc'), limit(this.pageSize));
        this.collectionData.set([]); 
      } else {
        if (!this.lastDoc) return [];
        q = query(
          col,
          orderBy('primos.peticion', 'desc'),
          startAfter(this.lastDoc),
          limit(this.pageSize)
        );
      }

      const snapshot = await getDocs(q);
      if (snapshot.empty) return [];

      this.lastDoc = snapshot.docs[snapshot.docs.length - 1];
      const newData = snapshot.docs.map(doc => doc.data());

      if (isFirstLoad) {
        this.collectionData.set(newData);
      } else {
        this.collectionData.update(current => [...current, ...newData]);
      }

      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  getCollectionDataSignal() {
    return this.collectionData;
  }

  async setValue(arr:any){
   await  setDoc(doc(this.db,'numeros', this.generateUniqueId()),arr)
  }

 generateUniqueId() {
  return Math.random().toString(36).substring(2, 15);
}


}
