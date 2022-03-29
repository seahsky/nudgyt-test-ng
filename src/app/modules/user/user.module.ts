import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, MaterialModule, FlexLayoutModule, UserRoutingModule],
})
export class UserModule {}
