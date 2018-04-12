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
    return this.isUserLoggedIn;
  }

  setIsUserLoggedIn(value: boolean) {
    this.isUserLoggedIn = value;
  }

  getUser_id(): number {
    return this.user_id;
  }

  setUser_id(value: number) {
    this.user_id = value;
  }

  getOrganisation_id(): number {
    return this.organisation_id;
  }

  setOrganisation_id(value: number) {
    this.organisation_id = value;
  }

  getUser_type_id(): number {
    return this.user_type_id;
  }

  setUser_type_id(value: number) {
    this.user_type_id = value;
  }

  getUser_first_name(): string {
    return this.user_first_name;
  }

  setUser_first_name(value: string) {
    this.user_first_name = value;
  }

  getUser_last_name(): string {
    return this.user_last_name;
  }

  setUser_last_name(value: string) {
    this.user_last_name = value;
  }

  getUser_password(): string {
    return this.user_password;
  }

  setUser_password(value: string) {
    this.user_password = value;
  }

  getUser_email(): string {
    return this.user_email;
  }

  setUser_email(value: string) {
    this.user_email = value;
  }

  getUser_phone_number(): string {
    return this.user_phone_number;
  }

  setUser_phone_number(value: string) {
    this.user_phone_number = value;
  }

  getUser_department(): string {
    return this.user_department;
  }

  setUser_department(value: string) {
    this.user_department = value;
  }

  getUser_about_me(): string {
    return this.user_about_me;
  }

  setUser_about_me(value: string) {
    this.user_about_me = value;
  }

  getUser_date_of_birth(): string {
    return this.user_date_of_birth;
  }

  setUser_date_of_birth(value: string) {
    this.user_date_of_birth = value;
  }


}
