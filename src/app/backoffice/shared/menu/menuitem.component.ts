import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { MenuService } from 'src/app/services/service.index';
import { PagesComponent } from '../../pages/pages.component';

@Component({
  selector: '[app-menuitem]',
  template: `
		<ng-container>
			<a (click)="itemClick($event)" *ngIf="!item.url || item.submenu"
			   (keydown.enter)="itemClick($event)" [ngClass]="item.class" pRipple>
				<i [ngClass]="item.icono" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.titulo}}</span>
				<i class="pi pi-fw pi-chevron-down layout-submenu-toggler" *ngIf="item.submenu"></i>
			</a>
			<a (click)="itemClick($event)" *ngIf="item.url && !item.submenu"
			   [routerLink]="item.url" routerLinkActive="active-route" [ngClass]="item.class" pRipple
			   [routerLinkActiveOptions]="{exact: true}">
				<i [ngClass]="item.icono" class="layout-menuitem-icon"></i>
				<span class="layout-menuitem-text">{{item.titulo}}</span>
				<i class="pi pi-fw pi-chevron-down layout-submenu-toggler" *ngIf="item.submenu"></i>
			</a>
      <div class="layout-menu-tooltip">
          <div class="layout-menu-tooltip-arrow"></div>
          <div class="layout-menu-tooltip-text">{{item.titulo}}</div>
      </div>
			<ul *ngIf="item.submenu && active" [@children]="(active ? 'visibleAnimated' : 'hiddenAnimated')" role="menu" id='submenuItems'>
				<ng-template ngFor let-child let-i="index" [ngForOf]="item.submenu">
					<li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
				</ng-template>
			</ul>
		</ng-container>
    `,
  host: {
    '[class.active-menuitem]': 'active'
  },
  animations: [
    trigger('children', [
      state('void', style({
        height: '0px'
      })),
      state('hiddenAnimated', style({
        height: '0px'
      })),
      state('visibleAnimated', style({
        height: '*'
      })),
      state('visible', style({
        height: '*',
        'z-index': 100
      })),
      state('hidden', style({
        height: '0px',
        'z-index': '*'
      })),

      transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('void => visibleAnimated, visibleAnimated => void',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
      transition('void => slimVisibleAnimated', animate('400ms cubic-bezier(.05,.74,.2,.99)')),
    ])
  ]
})
export class MenuitemComponent implements OnInit, OnDestroy {

  @Input() item: any;

  @Input() index!: number;

  @Input() root!: boolean;

  @Input() parentKey!: string;

  active = false;

  menuSourceSubscription: Subscription;

  menuResetSubscription: Subscription;

  key!: string;

  constructor(public appMain: PagesComponent, public router: Router, private menuService: MenuService) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe((key: string | string[]) => {
      // deactivate current active menu
      if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
        this.active = false;
      }
    });

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(params => {
        if (this.item.url) {
          this.updateActiveStateFromRoute();
        } else {
          this.active = false;
        }
      });
  }

  ngOnInit() {
    if (this.item.url) {
      this.updateActiveStateFromRoute();
    }

    this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
  }

  updateActiveStateFromRoute() {
    this.active = this.router.isActive(this.item.url, !this.item.submenu);
  }

  itemClick(event: Event): any {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return true;
    }

    // navigate with hover in horizontal mode
    if (this.root) {
      this.appMain.menuHoverActive = !this.appMain.menuHoverActive;
    }

    // notify other items
    this.menuService.onMenuStateChange(this.key);


    // toggle active state
    if (this.item.submenu) {
      this.active = !this.active;
    } else {
      // activate item
      this.active = true;

      this.appMain.staticMenuMobileActive = false;
      this.appMain.menuHoverActive = !this.appMain.menuHoverActive;

      this.appMain.unblockBodyScroll();
    }
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }

}

