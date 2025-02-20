import { NgModule } from "@angular/core";

import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { InfoComponent } from "./no-data/info.component";
import { CachedImageComponent } from "./cached-image/cached-image.component";

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [InfoComponent, CachedImageComponent],
    exports: [InfoComponent, CachedImageComponent]
})
export class ComponentsModule{}