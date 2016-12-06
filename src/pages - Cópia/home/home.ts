import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {Md5} from 'ts-md5/dist/md5';
import { SecureStorage } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username:string;
  password:string;
  secureStorage: SecureStorage = new SecureStorage();

  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {

  }

  Login(){
      if (this.username && this.password){
        this.validadeUser();
      }else{
        this.showAlertError();
      }
  }

  showAlertSuccess() {
    let alert = this.alerCtrl.create({
      title: 'Login Sucesso!',
      message: 'Usuario logado:\nUsername:' + this.username + '\nPassword:' + this.password,
      buttons: ['Ok']
    });
    alert.present()
  }

  showAlertError() {
    let alert = this.alerCtrl.create({
      title: 'Login Error!',
      message: 'Por favor, verifique os campos',
      buttons: ['Ok']
    });
    alert.present()
  }

  showLoginError() {
    let alert = this.alerCtrl.create({
      title: 'Login Error!',
      message: 'Usuario e/ou senha invalidas.',
      buttons: ['Ok']
    });
    alert.present()
  }

  showAlertCadastro() {
    let alert = this.alerCtrl.create({
      title: 'Cadastro!',
      message: 'Usuario cadastrado.',
      buttons: ['Ok']
    });
    alert.present()
  }

  showError(msg : string) {
    let alert = this.alerCtrl.create({
      title: 'Error!',
      message: msg,
      buttons: ['Ok']
    });
    alert.present()
  }

  validadeUser(){
    this.secureStorage.create('teste_login')
        .then(
           () => {
           this.secureStorage.get(this.username)
            .then(
              data => {
                if(data == Md5.hashStr(this.password).toString()){
                  this.showAlertSuccess();
                }else{
                  this.showLoginError();
                }
              },
              error => {
                this.secureStorage.set(this.username, Md5.hashStr(this.password).toString())
                 .then(
                   data => this.showAlertCadastro(),
                   error => this.showError(error)
                );
              }
           );
           },
           error => this.showError(error)
        );
  }
}
