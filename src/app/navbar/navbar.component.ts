import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../produit.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  paniernombre: Subscription;
  nombre: any;
  produititem: any
  total: any = 0;
  produits = [];
  constructor(private produit: ProduitService) { }

  async ngOnInit() {
    this.paniernombre = await this.produit.item.subscribe(
      (paniers: any) => {
        this.total = 0;

        this.nombre = paniers.length;
        this.produititem = paniers;
        this.produits = paniers;
        this.produits.forEach(x => {this.total += x.prix});
      
      })
    
    this.produit.Reload()
  }

}
