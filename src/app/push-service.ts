import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Events, AlertController } from 'ionic-angular';
import { Push } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

declare var window: any;
@Injectable()
export class PushRegisterService {

    constructor(protected events: Events, protected _http: Http, protected alertCtrl: AlertController) {
        var vm = this;
        window.accept = (data): void => {
            console.log(data);
        };
        window.reject = (data): void => {
            console.log("reject push");
            console.log(data);
        };
    }
    public register() {
        console.log('register')
        try {

            if (typeof (Push) === "undefined")
                return;
            console.log(pushRegistration)
            var pushRegistration: any;
            var vm = this;
            pushRegistration = Push.init({
                android: { senderID: '743402279899' },
                ios: {
                    sound: true,
                    alert: true,
                    badge: true,
                    clearBadge: true,

                    categories: {
                        "match": {
                            "yes": {
                                "callback": "accept", "title": "Accept", "foreground": true, "destructive": false
                            },
                            "no": {
                                "callback": "reject", "title": "Reject", "foreground": true, "destructive": false
                            }
                        }
                    }
                }
            });

            pushRegistration.on('registration', (data) => {
                var handle = data.registrationId;
                var platform = data.platform;
                console.log(data);
            });

            pushRegistration.on('notification', (data) => {
                let prompt = vm.alertCtrl.create({
                    title: "Receiving a call.",
                    message: data.message,
                    buttons: [
                        {
                            text: 'Accept',
                            handler: () => {
                                console.log(data);                                
                            }
                        },
                        {
                            text: 'Reject',
                            handler: () => {
                                console.log('Reject clicked');
                            }
                        }
                    ]
                });
                prompt.present();
            });
        }
        catch (ex) {
            console.log('Erro catch');
            console.log(ex);
        }
    }  
}