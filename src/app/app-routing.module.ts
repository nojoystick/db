import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'uidetail-view', loadChildren: './uidetail-view/uidetail-view.module#UIDetailViewPageModule' },
  { path: 'add-ui1', loadChildren: './add-ui1/add-ui1.module#AddUI1PageModule' },
  { path: 'add-ui2', loadChildren: './add-ui2/add-ui2.module#AddUI2PageModule' },
  { path: 'ui', loadChildren: './ui/ui.module#UIPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
