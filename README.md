[![Build Status](https://travis-ci.org/hisptz/nmcp-dashboard-app.svg?branch=master)](https://travis-ci.org/hisptz/nmcp-dashboard-app)
[![dependencies Status](https://david-dm.org/hisptz/nmcp-dashboard-app/status.svg)](https://david-dm.org/hisptz/nmcp-dashboard-app)
[![devDependencies Status](https://david-dm.org/hisptz/nmcp-dashboard-app/dev-status.svg)](https://david-dm.org/hisptz/nmcp-dashboard-app?type=dev)

# NMCP Dashboard

The NMCP dashboard is DHIS2 application aimed at facilitating the visualization, interpretation and use of all malaria related information in the DHIS2 platform.

The dashboard is currently divided in 5 sections according to the HMIS collection tools and respective indicators: a) Uncomplicated malaria diagnosis (OPD), b) malaria testing (Laboratory/testing sites), c) Malaria commodities (pharmaceuticals), d) Severe malaria morbidity and mortality (IPD), and e) Preventive services (reproductive and child health)

## Setup

Run `npm install` to install all required dependencies for the app

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.

This command will require proxy-config.json file available in the root of your source code, usually this file has this format

```
{
  "/api": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  },
  "/": {
    "target": "https://play.dhis2.org/2.29/",
    "secure": "false",
    "auth": "admin:district",
    "changeOrigin": "true"
  }
}

```

We have provided `proxy-config.example.json` file as an example, make a copy and rename to `proxy-config.json`

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/`, this will included a zip file ready for deploying to any DHIS2 instance.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
