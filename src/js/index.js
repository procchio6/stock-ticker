import React from 'react';
import ReactDOM from 'react-dom';
import App from '../js/App.js';
import 'core-js';
import './lib/intrinio-realtime'

require  ("../sass/entry.scss");

document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    initCommon();
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

function initCommon() {

  ReactDOM.render(
      (
        <div>
          <App />
        </div>
      ),
      document.getElementById('app')
  );
}

function initWithOpenFin(){
    console.log("OpenFin is available");
    // Your OpenFin specific code to go here...
}

function initNoOpenFin(){
    console.log("OpenFin is not available - you are probably running in a browser.");
}
