import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSliderModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    // MatAutocompleteModule,
    MatButtonModule,
    // MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    // MatChipsModule,
    MatTableModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatDividerModule,
    // MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    // MatMenuModule,
    // MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    // MatSortModule,
    // MatStepperModule,
    // MatTabsModule,
    // MatToolbarModule,
    MatTooltipModule,
    // MatNativeDateModule,
    // CdkTableModule,
    // A11yModule,
    // BidiModule,
    // CdkAccordionModule,
    // ObserversModule,
    // OverlayModule,
    // PlatformModule,
    // PortalModule,
    BrowserAnimationsModule
  ]
})
export class MaterialDesignModule {
}
