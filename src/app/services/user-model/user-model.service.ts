import { Injectable } from '@angular/core';

@Injectable()
export class UserModelService {

  public _isUserLoggedIn:boolean;
  public _user_id :number;
  public _organisation_id:number;
  public _user_type_id:number;
  public _user_first_name:string;
  public _user_last_name:string;
  public _user_password:string;
  public _user_email:string;
  public _user_phone_number:string;
  public _user_department:string;
  public _user_about_me:string;
  public _user_date_of_birth:string;

  constructor() {
  }

  getIsUserLoggedIn(): boolean {
    return this._isUserLoggedIn;
  }

  setIsUserLoggedIn(value: boolean) {
    this._isUserLoggedIn = value;
  }

  getUser_id(): number {
    return this._user_id;
  }

  setUser_id(value: number) {
    this._user_id = value;
  }

  getOrganisation_id(): number {
    return this._organisation_id;
  }

  setOrganisation_id(value: number) {
    this._organisation_id = value;
  }

  getUser_type_id(): number {
    return this._user_type_id;
  }

  setUser_type_id(value: number) {
    this._user_type_id = value;
  }

  getUser_first_name(): string {
    return this._user_first_name;
  }

  setUser_first_name(value: string) {
    this._user_first_name = value;
  }

  getUser_last_name(): string {
    return this._user_last_name;
  }

  setUser_last_name(value: string) {
    this._user_last_name = value;
  }

  getUser_password(): string {
    return this._user_password;
  }

  setUser_password(value: string) {
    this._user_password = value;
  }

  getUser_email(): string {
    return this._user_email;
  }

  setUser_email(value: string) {
    this._user_email = value;
  }

  getUser_phone_number(): string {
    return this._user_phone_number;
  }

  setUser_phone_number(value: string) {
    this._user_phone_number = value;
  }

  getUser_department(): string {
    return this._user_department;
  }

  setUser_department(value: string) {
    this._user_department = value;
  }

  getUser_about_me(): string {
    return this._user_about_me;
  }

  setUser_about_me(value: string) {
    this._user_about_me = value;
  }

  getUser_date_of_birth(): string {
    return this._user_date_of_birth;
  }

  setUser_date_of_birth(value: string) {
    this._user_date_of_birth = value;
  }


}
