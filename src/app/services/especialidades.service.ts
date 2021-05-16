import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Especialidad } from '../models/especialidad';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private dbPath = '/especialidadFire';
  EspecialidadRef: AngularFirestoreCollection<Especialidad>;

  constructor(private db: AngularFirestore) { 
    this.EspecialidadRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Especialidad> {
    return this.EspecialidadRef;
  }

  create(especialidad: Especialidad): any {
    return this.EspecialidadRef.add({ ...especialidad });
  }

  update(id: string, data: any): Promise<void> {
    return this.EspecialidadRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.EspecialidadRef.doc(id).delete();
  }
}
