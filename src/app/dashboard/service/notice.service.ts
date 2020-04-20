import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    public afs: AngularFirestore,
  ) {
  }

  getNotify(): Promise<any> {
    const data = this.afs.collection('notify');
    return data.ref.get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
        });
        return querySnapshot;
      });
  }

  listNotify(): Promise<any> {
    let tmp: any;
    let datas: NoticeData[] = new Array();

    const data = this.afs.collection('notify');
    return data.ref.get()
      .then(function (d) {
        d.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
        });
        for (let i = 0; i < d.size; i++) {
          datas.push({
            title: d.docs[i].data().title,
            comment: d.docs[i].data().comment,
            date: d.docs[i].id,
            year: parseInt(d.docs[i].id.substr(0, 4)),
            month: parseInt(d.docs[i].id.substr(4, 2)),
            day: parseInt(d.docs[i].id.substr(6, 2)),
            hour: d.docs[i].id.substr(8, 2),
            minute: d.docs[i].id.substr(10, 2),
            isImportant: d.docs[i].data().important,
            isFailure: d.docs[i].data().failure,
          })
        }

        for (let i = 0; i < datas.length; i++) {
          for (let j = i + 1; j < datas.length; j++) {
            if (parseInt(datas[i].date) < parseInt(datas[j].date)) {
              tmp = datas[i];
              datas[i] = datas[j];
              datas[j] = tmp;
            }
          }
        }
        return datas;
      });
  }
}

interface NoticeData {
  date: string;
  year: number;
  month: number;
  day: number;
  hour: string;
  minute: string;
  title: string;
  comment: string;
  isImportant: boolean;
  isFailure: boolean;
}
