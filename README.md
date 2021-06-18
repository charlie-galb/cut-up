# Cut-up Creator  

This is a static web app designed to help the user create [cut-up poems](https://en.wikipedia.org/wiki/Cut-up_technique) in the style of [Willam S. Burroughs](https://en.wikipedia.org/wiki/William_S._Burroughs).  

The aim of this project was 1) to showcase and build my front-end skills and 2) to make the kind of thing that I would want to use in my spare time.  

It is currently deployed at https://cut-up-creator.netlify.app/  

## Screenshots  

![cut-up-creator-full](https://user-images.githubusercontent.com/50401779/122591208-890e9380-d05a-11eb-94fd-406ca1956959.png)  

## Project Status   

### Features  

- Shreds text into snippets, jumbles and removes formatting 
- Can drag and drop snippets into  spaces
- Can add or remove lines  
- Outputs poem as fixed text  

### To do  

- Tidy sorting of text snippets within the pasteboard area  
- Add a share button so that users can share their creations  

## Technologies  

- [TypeScript](https://github.com/microsoft/TypeScript)  
- [React](https://github.com/facebook/react)  
- [Jest](https://github.com/facebook/jest)  
- [Cypress](https://github.com/cypress-io/cypress)    

## Setup  

1) Clone the repository: `git clone https://github.com/charlie-galb/cut-up.git`  
2) Go into the repository: `cd cut-up`  
3) Start the app: `yarn start`  

## Testing  

### Unit testing  

Run `yarn test` from anywhere inside the project repo. 

### E2E testing  

1) Start the app with `yarn start`  
2) Run `yarn cypress run`.  

## Mobile Support  

<p align="middle">
    <img src="https://user-images.githubusercontent.com/50401779/122591792-60d36480-d05b-11eb-9c60-4c7c7db900e6.png" width="45%">
    <img src="https://user-images.githubusercontent.com/50401779/122591811-64ff8200-d05b-11eb-84a9-20573a5e3b16.png" width="45%">
</p>