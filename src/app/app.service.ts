import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Score } from './score.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private firestore: AngularFirestore) {}

  public getScores(): Observable<Array<DocumentData>> {
    return this.firestore
      .collection('score', (ref) => ref.orderBy('score', 'desc').limit(10))
      .valueChanges() as Observable<Array<DocumentData>>;
  }

  public addNewScore(score: Score): void {
    this.firestore.collection('score').add(score);
  }
}
