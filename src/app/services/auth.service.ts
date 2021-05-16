import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  user:Usuario = new Usuario();
  private dbpath: string = '/usuariosFire'; 
  usuarioRef: AngularFirestoreCollection<Usuario>;

  constructor(private db: AngularFirestore,
    private route:Router) {
    this.usuarioRef = db.collection(this.dbpath);
  }

  getAll(): AngularFirestoreCollection<Usuario> {
    return this.usuarioRef;
  }

  create(usuario: Usuario): any {
    return this.usuarioRef.add({ ...usuario });
  }

  update(id: string, data: any): Promise<void> {
    return this.usuarioRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.usuarioRef.doc(id).delete();
  }

  setUserAuthenticated() {
    this.isAuthenticated = true;
  }

  setAuthenticatedUser(uid:string | undefined, email:string | null | undefined, token:string | null | undefined){
    this.user.email = email == undefined ? '' : email;
    //this.user.token = token == undefined ? '' : token;
  }

  getIdToken(): any {
    firebase.auth().currentUser?.getIdToken(/* forceRefresh */ true).then(function (idToken: any) {
      // Send token to your backend via HTTPS
      return idToken
      
      // ...
    }).catch(function (error: any) {
      // Handle error
    });
  }

   /* verifyAuthIdToken(idToken: string): void {
      admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken: any) => {
          const uid = decodedToken.uid;
          console.log('uid',uid)
          // ...
        })
        .catch((error: any) => {
          // Handle error
          console.log('error', error)

        })
  }  */

  async authStateChanged():Promise<void>{
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //var uid = user.uid;
        //this.user.token = user.refreshToken;
      } else {
        // User is signed out
        this.isAuthenticated = false;
        this.user = new Usuario();
      }
    });
  }

  logout():void{
    /* firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.isAuthenticated = false;
      //this.route.navigate(['/welcome'])
    }).catch((error) => {
      // An error happened.
    }); */
    this.isAuthenticated = false;
    this.route.navigate(['/welcome'])
  }

  getUserByEmail(email:string){
    return this.db.collection(this.dbpath, ref => ref.where('email', '==', email));
  }
}
