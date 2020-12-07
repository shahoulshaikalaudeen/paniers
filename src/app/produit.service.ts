import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable, Subject, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { async } from '@angular/core/testing';
import { JsonPipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  items = [];
  item = new Subject<any[]>();
  panier = new Subject<boolean>();
  panierempty: boolean = false;
  cookieValue: any;


  constructor(private cookieService: CookieService) { this.Reload() }

  Main = async () => {
    try {
      const response = await axios.get('http://localhost:8080/');
      return response.data;

    }
    catch (error) {
      console.error(error);
    }

  };

  // fonction qui permet de recharger la valeur du subject qui met à jour et les envoi au abonnée subscribe au component//
  Reload = () => {

    this.GetCookie().subscribe((value: any) => { this.item.next(value) })

    this.panier.next(this.panierempty);
  }
  Ajouter = (panier: any) => {
    this.items.push(panier);
    this.cookieService.set('test', JSON.stringify(this.items));
    this.panierempty = false;
    this.Reload()
  }
  Supprimer = (produit: any) => {
    this.items = this.items.filter(x => x.id !== produit.id);
    this.cookieService.set('test', JSON.stringify(this.items));
    if (this.items.length === 0)
      this.panierempty = true;
  }

  GetCookie = () => {
    return of(JSON.parse(this.cookieService.get("test")));
    this.Reload();
  }

}


