﻿//    <!--Repository Name for source code on github: finalProject-- >
//    <!--Description: A game that allows to users practise with memorising English finalProject in different categories in a fun manner -- >
//    <!--Author Name: Liliya Artyukh -- >
//    <!--Creation Date: 06 - Nov - 2015 -- >
//    <!--Last Modified Date: 12 - Nov - 2015 -- >
//    <!--Last Modified by: Liliya Artyukh -- >

/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/stats/stats.d.ts" />
/// <reference path="../typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../typings/easeljs/easeljs.d.ts" />
/// <reference path="../typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../typings/webaudioapi/waa.d.ts" />
/// <reference path="../typings/soundjs/soundjs.d.ts" />
/// <reference path="../typings/preloadjs/preloadjs.d.ts" />

/// <reference path="../utility/utility.ts" />
/// <reference path="../config/wordsets.ts" />
/// <reference path="../config/config.ts" />
/// <reference path="../managers/asset.ts" />

/// <reference path="../objects/background.ts" />
/// <reference path="../objects/word.ts" />
/// <reference path="../objects/truck.ts" />

/// <reference path="../objects/label.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/scene.ts" />
/// <reference path="../states/instructions.ts" />
/// <reference path="../states/menu.ts" />
/// <reference path="../states/over.ts" />
/// <reference path="../states/game.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />


// Global Game Framework Variables
var canvas: HTMLElement;
var stage: createjs.Stage;
var stats: Stats;
var state: number;
var currentState: finalProject.Scene; // alias for our current state


// Game variables
var menuFinalProject: finalProject.Menu;
var gameFinalProject: finalProject.Game;
var overFinalProject: finalProject.Over;
var instructionFinalProject: finalProject.Instructions;
var name: string;
var outcome: number=0;
var wordCategory: string;
var background: finalProject.Background;
var numOfCollectedWords: number;
var numOfLivesLost: number;


//Game managers
var assets: finalProject.Asset;
var collision: finalProject.Collision;
var scoreboard: finalProject.Scoreboard;


function preload(): void {
    assets = new finalProject.Asset();
    (<HTMLInputElement>document.getElementById("txtName")).value = "";
    name = "";
}

function init(): void {
    console.log("Game started...");
    canvas = document.getElementById("canvas"); // reference to canvas element
    stage = new createjs.Stage(canvas); // passing canvas to stage 
    stage.enableMouseOver(20); //enable mouse events
    createjs.Ticker.setFPS(60); // set frame rate to 60 frames per second
    createjs.Ticker.on("tick", gameLoop, this); // update gameLoop every frame

    background = new finalProject.Background("back");
    stage.addChild(background);
    setupStats();// setup statistics object

    state = finalProject.MENU_STATE;
    changeState(state);
}

// Main Game Loop
function gameLoop(event: createjs.Event): void {
    stats.begin(); //begin measuring

    background.update();

    currentState.update();
    stage.update(); // redraw/refresh stage every frame

    stats.end(); // end measuring
}

// function to setup stat counting
function setupStats(): void {
    stats = new Stats();
    stats.setMode(0); //show fps

    //align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';

  //  document.getElementById("main").appendChild(stats.domElement);
    document.body.appendChild(stats.domElement);
}




// state machine
function changeState(state): void {
    //lauch various scenes

    switch (state) {
        case finalProject.MENU_STATE:
            stage.removeAllChildren();
            menuFinalProject = new finalProject.Menu();
            console.log(menuFinalProject);
            currentState = menuFinalProject;
            break;
        case finalProject.PLAY_STATE:
            stage.removeAllChildren();
            gameFinalProject = new finalProject.Game();
            currentState = gameFinalProject;
            break;

        case finalProject.OVER_STATE:
            stage.removeAllChildren();
            overFinalProject = new finalProject.Over(outcome);
            currentState = overFinalProject;
            break;
        case finalProject.INSTRUCTIONS_STATE: 
            stage.removeAllChildren();
            instructionFinalProject = new finalProject.Instructions();
            currentState = instructionFinalProject;
            break;
    }
    currentState.start();
    console.log(currentState.numChildren);

}