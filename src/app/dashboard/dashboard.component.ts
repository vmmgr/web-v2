import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../service/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private options: FormGroup;
  public name: string = localStorage.getItem('user');

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public authService: AuthService,
  ) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }


  ngOnInit(): void {
    this.authService.loginCheck();
  }
}
