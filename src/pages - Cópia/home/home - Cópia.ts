import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Md5} from 'ts-md5/dist/md5';

import { SecureStorage } from 'ionic-native';

import { AlertController } from 'ionic-angular';

let secureStorage: SecureStorage = new SecureStorage();
secureStorage.create('my_store_name')
 .then(
   () => console.log('Storage is ready!'),
   error => console.log(error)
);

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  alertCtrl: AlertController;

  showAlert(Titulo,Subtitulo) {
    let alert = this.alertCtrl.create({
      title: Titulo,
      subTitle: Subtitulo,
      buttons: ['OK']
    });
    alert.present();
  };

username : string;
password : string;

Login(){
 
 if (localStorage.getItem(this.username) == null) {
//   localStorage.setItem(this.username,Md5.hashStr(this.password).toString())
  secureStorage.set(this.username,Md5.hashStr(this.password).toString())
  .then(
    data => console.log(data),
    error => console.log(error)
  );

 }
 else{
   secureStorage.get(this.username)
   .then(
     data => {
       if (data == Md5.hashStr(this.password).toString()) {
//         alert("Bem Vindo");   
       this.showAlert("OK","Bem Vindo");
   }
     },
     error => {
//       alert("Usuário ou Senha Incorreta.")
       this.showAlert("Erro","Usuário ou Senha Incorreta");
     }
   );

 //  else{
 //    alert("Usuário ou Senha Incorreta.")
//   }
 }
}  

}
