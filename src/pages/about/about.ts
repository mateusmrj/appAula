import { Component } from '@angular/core';
import { SQLite } from 'ionic-native';
import {Md5} from 'ts-md5/dist/md5';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  username:string;
  password:string;
  db:SQLite;

  constructor(public alerCtrl: AlertController, public navCtrl: NavController) {
    this.initBD();
  }

  initBD(){
    this.db = new SQLite();
    this.db.openDatabase({
      name: 'data.db',
      location: 'default' // the location field is required
    }).then(() => {
      this.db.executeSql('create table if not exists usuarios(login VARCHAR(32), senha VARCHAR(32))', {}).then(() => {
        console.log('Base criada');
      }, (err) => {
        console.error('Unable to execute sql: ', err);
      });
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  clickLogin(){
    var query = "SELECT * FROM usuarios WHERE login=? and senha=?";
    var values = [this.username, Md5.hashStr(this.password).toString()];

    this.db.executeSql(query, values).then((res) =>{
      if (res.rows.length > 0){
        this.showLoginSuccess();
      }else{
        this.cadastroUsuario();
      }
    }, (error) =>{
      this.showError(error.message);
    });
  }

  cadastroUsuario(){
    var sql = "insert into usuarios(login, senha) values (?, ?)";
    var values = [this.username, Md5.hashStr(this.password).toString()];
    this.db.executeSql(sql, values).then((res) =>{
      this.showCadastroSuccess();
    }, (error) =>{
      this.showError(error.message);
    });
  }

  showLoginSuccess() {
    let alert = this.alerCtrl.create({
      title: 'Login Sucesso!',
      message: 'Usuario logado:\nUsername:' + this.username + '\nPassword:' + this.password,
      buttons: ['Ok']
    });
    alert.present();
  }

  showCadastroSuccess() {
    let alert = this.alerCtrl.create({
      title: 'Usuario cadastrado!',
      message: 'Usuario cadastrado com sucesso:',
      buttons: ['Ok']
    });
    alert.present();
  }

  showError(msg:string) {
    let alert = this.alerCtrl.create({
      title: 'Error',
      message: msg,
      buttons: ['Ok']
    });
    alert.present();
  }

}
