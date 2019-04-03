import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'uidetail-view', loadChildren: './uidetail-view/uidetail-view.module#UIDetailViewPageModule' },
    { path: 'add-ui1', loadChildren: './add-ui1/add-ui1.module#AddUI1PageModule' },
    { path: 'add-ui2', loadChildren: './add-ui2/add-ui2.module#AddUI2PageModule' },
    { path: 'ui', loadChildren: './ui/ui.module#UIPageModule' },
    { path: 'delete-modal', loadChildren: './modals/delete-modal/delete-modal.module#DeleteModalPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map