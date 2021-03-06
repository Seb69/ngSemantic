import { Component, Query, QueryList, AfterViewInit, ElementRef, Input, Type } from "@angular/core";

declare var jQuery: any;

@Component({
  selector: "sm-tab",
  template: `<ng-content></ng-content>`
})
export class SemanticTabComponent {
  @Input("tab") dataTab: string;
  @Input("title") title: string;
  @Input("class") class: string;
}

@Component({
  selector: "sm-tabs",
  template: `<div class="ui top attached tabular menu">
  <a class="item" [ngClass]="{active: i === 0}" *ngFor="let tab of tabs; let i = index" attr.data-tab="{{tab.dataTab}}">{{tab.title}}</a>
</div>
<ng-content></ng-content>
`
})
export class SemanticTabsComponent implements AfterViewInit {
  tabs: QueryList<SemanticTabComponent>;

  constructor( @Query(<Type>SemanticTabComponent) tabs: QueryList<SemanticTabComponent>, public elementRef: ElementRef) {
    this.tabs = tabs;
  }

  ngAfterViewInit() {
    if (typeof jQuery === "undefined") {
      console.log("jQuery is not loaded");
      return;
    }

    jQuery(".menu.tabular .item").tab({
      childrenOnly: true,
      context: jQuery(this.elementRef.nativeElement)
    });
  }
}
