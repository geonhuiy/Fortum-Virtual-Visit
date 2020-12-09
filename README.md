# Fortum-Virtual-Visit
Project repository for Metropolia Innovation Project 2020, Fortum Virtual Visits  

#### 3D model placement application/platform which revolutionizes industrial planning with placing 3D models of machinery & equipment in Google Earth like virtual reality. 

This application/platform is built on top of the [Navvis](https://www.navvis.com/) platform, utilizing the IndoorViewer API. The APIDoc for the IndoorViewer API can be found [here](https://docs.navvis.com/cloud/current/en/html/_static/ts_docs/index.html).  
The main features were built with [three.js](https://threejs.org/) for the 3D environment functionality.  

This project was developed by students of [Metropolia University of Applied Sciences](https://www.metropolia.fi/) under the supervision of [eSite](https://esitevr.com/).  

![GitHub last commit](https://img.shields.io/github/last-commit/geonhuiy/Fortum-Virtual-Visit) ![GitHub contributors](https://img.shields.io/github/contributors/geonhuiy/Fortum-Virtual-Visit) ![GitHub commit activity](https://img.shields.io/github/commit-activity/m/geonhuiy/Fortum-Virtual-Visit) ![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/geonhuiy/Fortum-Virtual-Visit) ![GitHub All Releases](https://img.shields.io/github/downloads/geonhuiy/Fortum-Virtual-Visit/total)

## Table of Contents  
* [Prerequisites](#prerequisites)
* [How to run](#how-to-run)  
* [Changing IndoorViewer instance](#changing-indoorviewer-instance)  

## Prerequisites  
- Node.js  
>https://nodejs.org  
This project requires Node.js to be installed to initiate/set up and further run the application.  

## How to run  
1. Clone the files from the repository to your local machine via [git](https://git-scm.com/downloads).  
   `git clone https://github.com/geonhuiy/Fortum-Virtual-Visit.git`  

2. Navigate to the project directory and install the required npm packages with  
   `npm i`  

3. After the necessary npm packages are installed, the project can be launched with  
   `npm run serve`  

## Changing IndoorViewer instance  
The current version of the project is built on top of a demo instance of the IndoorViewer instance.  
>https://nvdev-0.iv.navvis.com/  

To load the features onto a desired IndoorViewer instance, the URL to the instance needs to be modified before the application is launched. 
Under the project directory, navigate to `src/ts/index.ts`.  

The URL for the desired IndoorViewer instance should be placed instead of the text `IndoorViewerURLHere` :  
```
getApi("IndoorViewerURLHere").then((iv: ApiInterface) => {
      this.modal = new Modal(iv);
      this.modal.setLayer();
      this.modal.assignEventListeners();
      this.main_view = iv.legacyApi.getMainView();
      new SideBarMenuModifier(iv);
    });
```



