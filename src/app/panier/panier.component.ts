import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitService } from '../produit.service';
import { async } from '@angular/core/testing';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  produits = [];
  subscription: Subscription;
  panieremptysub: Subscription;
  cookie: Subscription;
  paniernotif: boolean;
  somme: any;
  total: [];
  totals: any = 0;
  to = 0;
  appareils: any[];
  message_validation: boolean = false;

  constructor(private produit: ProduitService) {

  }

  async ngOnInit() {
    try {

      if (this.produits != undefined) {
        this.subscription = await this.produit.item.subscribe(
          (appareils: any) => {

            console.log(appareils)
            this.produits = appareils;
            this.to = 0;
            this.produits.forEach(element => this.to += element.prix);
          }
        )
        this.produit.Reload()

        this.panieremptysub = await this.produit.panier.subscribe(
          (paniers: boolean) => {
            this.paniernotif = paniers;
         console.log(this.paniernotif);
          })
        this.produit.Reload()

      }
      else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
  Remove = (supprimer) => {
    this.produit.Supprimer(supprimer);
    this.produit.Reload();
  }
  ngOnDestroy() {
    this.panieremptysub.unsubscribe();
    this.subscription.unsubscribe();
  }
}

