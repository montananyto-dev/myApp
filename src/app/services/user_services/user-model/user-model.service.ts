import { Injectable } from '@angular/core';

@Injectable()
export class UserModelService {

  public isUserLoggedIn:boolean;
  public user_id :number;
  public organisation_id:number;
  public user_type_id:number;
  public user_first_name:string;
  public user_last_name:string;
  public user_password:string;
  public user_email:string;
  public user_phone_number:string;
  public user_department:string;
  public user_about_me:string;
  public user_date_of_birth:string;

  constructor() {
  }

  getIsUserLoggedIn(): boolean {
    return Boolean(window.localStorage.getItem('user_id'));
  }

  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value;
    window.localStorage.setItem('isUserLoggedIn',String(value));

  }

  getUser_id(): number {
    return Number(window.localStorage.getItem('user_id'));
  }

  setUser_id(value: number) {
    this.user_id = value;
    window.localStorage.setItem('user_id',String(value));
  }

  getOrganisation_id(): number {
    return Number(window.localStorage.getItem('organisation_id'));
  }

  setOrganisation_id(value: number) {
    this.organisation_id = value;
    window.localStorage.setItem('organisation_id',String(value));
  }

  getUser_type_id(): number {
    return Number(window.localStorage.getItem('type_id'));
  }

  setUser_type_id(value: number) {
    this.user_type_id = value;
    window.localStorage.setItem('type_id',String(value));
  }

  getUser_first_name(): string {
    return window.localStorage.getItem('first_name');
  }

  setUser_first_name(value: string) {
    this.user_first_name = value;
    window.localStorage.setItem('first_name',value);
  }

  getUser_last_name(): string {
    return window.localStorage.getItem('last_name');
  }

  setUser_last_name(value: string) {
    this.user_last_name = value;
    window.localStorage.setItem('last_name',value);
  }

  getUser_password(): string {
    return  window.localStorage.getItem('password');
  }

  setUser_password(value: string) {
    this.user_password = value;
    window.localStorage.setItem('password',value);
  }

  getUser_email(): string {
    return window.localStorage.getItem('email');
  }

  setUser_email(value: string) {
    this.user_email = value;
    window.localStorage.setItem('email',value);
  }

  getUser_phone_number(): string {
    return window.localStorage.getItem('phone_number');
  }

  setUser_phone_number(value: string) {
    this.user_phone_number = value;
    window.localStorage.setItem('phone_number',value);
  }

  getUser_department(): string {
    return window.localStorage.getItem('department');
  }

  setUser_department(value: string) {
    this.user_department = value;
    window.localStorage.setItem('department',value);
  }

  getUser_about_me(): string {
    return window.localStorage.getItem('about_me');
  }

  setUser_about_me(value: string) {
    this.user_about_me = value;
    window.localStorage.setItem('about_me',value);
  }

  getUser_date_of_birth(): string {
    return window.localStorage.getItem('date_of_birth');
  }

  setUser_date_of_birth(value: string) {
    this.user_date_of_birth = value;
    window.localStorage.setItem('date_of_birth',value);
  }


}
