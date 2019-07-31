import { PopupComponent } from './../popup/popup.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public http: HttpClient, 
    public router: Router, 
    public sam_form: FormBuilder, 
    public dialog: MatDialog) { }
  username: any;
  password: any;
  url = environment.server_url;
  form : FormGroup;

  ngOnInit() {
    this.form = this.sam_form.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px',
      data: {"msg": "this is an sample popup"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  login(event: any) {
    if (this.form.valid){

    console.log(event)
    console.log(this.username, this.password);
    const httpOptions = {
      headers: new HttpHeaders({
        'content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    }
    var body = {"username": this.username, "password": this.password};
    console.log(body);
    this.http.post(this.url+"auth", body, httpOptions).subscribe(
      data => {
        console.log(data);
        if(data['login'] == true){
          localStorage.setItem("userProfile", data["username"]);
          console.log(localStorage.getItem("userProfile"));
          this.router.navigate(['/home']);
        }
      }, error => {
        console.log(error);
      })
    }
  }

}
