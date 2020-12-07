import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  product: any;
  produits: any;
  produitse = [];
  constructor(private produit: ProduitService) { }


  async ngOnInit() {
    try {
      await this.produit.Main().
        then((res) => this.product = res).catch(() => console.error('Failed!'));
      console.log(this.product);
    } catch (error) {
      console.log(error);
    }
    this.produit.Reload()
  }

  Article = (ordinateur: any) => {
    this.produit.Ajouter(ordinateur);
    this.produit.Reload();
  }
}
