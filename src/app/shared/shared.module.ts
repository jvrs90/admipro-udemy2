import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NofoundpageComponent } from './nofoundpage/nofoundpage.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';




@NgModule({

    imports: [ 
        RouterModule,
        CommonModule,
        PipesModule
        
    ],

    declarations: [
        NofoundpageComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        NofoundpageComponent,
        ModalUploadComponent
        
    ]

})

export class SharedModule {  }
