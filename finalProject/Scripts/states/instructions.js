var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var finalProject;
(function (finalProject) {
    //class instructions ++++++++++++++++++++++++++++++++++++++++++++
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        //constructor ++++++++++++++++++++++++++++++++++++++++++++++++++
        function Instructions() {
            _super.call(this);
            this._instructionsVisible = false;
            this._rulesText = "1. Select word category to practise. \n\n2. Move mouse up and down to control collector rectangle. \n\n3. Collect 10 finalProject from selected category to win. \n\n4. Collecting 3 wrong finalProject lead to a loss.";
        }
        Instructions.prototype.setRulesText = function (rules) {
            this._rulesText = rules;
        };
        Instructions.prototype.getRulesText = function () {
            return this._rulesText;
        };
        //private method
        //callback function that allows to respond to start button click events
        Instructions.prototype._startClicked = function (event) {
            console.log("event.target " + event.target);
            createjs.Sound.play("soundtrack");
            //get the name of user
            name = document.getElementById("txtName").value;
            if (name == null || name == "") {
                name = "YOU";
            }
            console.log("check name after button is clicked " + name);
            document.getElementById("txtName").style.display = "none";
            this.removeAllChildren();
            changeState(finalProject.PLAY_STATE);
        };
        //callback function that allows to respond to button click events
        Instructions.prototype._menuClicked = function (event) {
            //check if lable is already displayed
            if (this._instructionsContainer.visible == true) {
                this._instructionsContainer.visible = false;
            }
            else {
                this._instructionsContainer.visible = true;
            }
            this._instructionsLable.text = this._rulesText; // set text for rules
        };
        Instructions.prototype._categoryClicked = function (event) {
            wordCategory = event.target.name;
        };
        //public methods
        Instructions.prototype.start = function () {
            this.addChild(background);
            //add buttons for about and rules
            this._rulesButton = new finalProject.Button("rulesButton", finalProject.centerX, 50);
            this._rulesButton.setWidth(183);
            this._rulesButton.centerAlongX();
            this._rulesButton.name = "rulesBtn";
            this._rulesButton.on("click", this._menuClicked, this);
            this.addChild(this._rulesButton);
            //display categories
            this._getDetails();
            //add instruction container
            this._instructionsContainer = new createjs.Container;
            this._instructionsContainer.x = 24;
            this._instructionsContainer.y = 150;
            this._rect = new createjs.Shape;
            this._rect.graphics.beginFill("red").drawRect(0, 0, 800, 300);
            this._instructionsContainer.addChild(this._rect);
            this._instructionsLable = new finalProject.Label("placeholder text", "20px Consolas", "#000000", 20, 20, false);
            this._instructionsContainer.addChild(this._instructionsLable);
            this.addChild(this._instructionsContainer);
            this._instructionsContainer.visible = false;
            //instantiate and add a start button
            this._startButton = new finalProject.Button("startButton", finalProject.centerX, 360);
            this._startButton.setWidth(206);
            this._startButton.centerAlongX();
            this.addChild(this._startButton);
            this._startButton.on("click", this._startClicked, this);
            //add this menu container to the stage
            stage.addChild(this);
        };
        Instructions.prototype._getDetails = function () {
            this._nameLabel = new finalProject.Label("What's your name?", "20px Consolas", "#FFF000", 181, 140, false);
            this.addChild(this._nameLabel);
            document.getElementById("txtName").style.display = "inline";
            console.log("check name " + name);
            this._selectCategoryLabel = new finalProject.Label("Select Category:", "20px Consolas", "#FFF000", 181, 170, false);
            this.addChild(this._selectCategoryLabel);
            //add category buttons and their labels
            this._foodBtn = new finalProject.Button("categoryButton", 181, 200);
            this._foodBtn.setHeight(61);
            this._foodBtn.setWidth(190);
            this._foodBtn.name = "foodBtn";
            this.addChild(this._foodBtn);
            this._foodBtn.on("click", this._categoryClicked, this);
            this._foodLabel = new finalProject.Label("FOOD", "30px Consolas", "#000000", 272.5, 231, true);
            this.addChild(this._foodLabel);
            this._furnitureBtn = new finalProject.Button("categoryButton", 484, 200);
            this._furnitureBtn.setHeight(61);
            this._furnitureBtn.setWidth(190);
            this._furnitureBtn.name = "furnitureBtn";
            this.addChild(this._furnitureBtn);
            this._furnitureBtn.on("click", this._categoryClicked, this);
            this._foodLabel = new finalProject.Label("FURNITURE", "30px Consolas", "#000000", 575.5, 231, true);
            this.addChild(this._foodLabel);
            this._clothesBtn = new finalProject.Button("categoryButton", 181, 300);
            this._clothesBtn.setHeight(61);
            this._clothesBtn.setWidth(190);
            this._clothesBtn.name = "clothesBtn";
            this.addChild(this._clothesBtn);
            this._clothesBtn.on("click", this._categoryClicked, this);
            this._foodLabel = new finalProject.Label("CLOTHES", "30px Consolas", "#000000", 272.5, 331, true);
            this.addChild(this._foodLabel);
            this._animalsBtn = new finalProject.Button("categoryButton", 484, 300);
            this._animalsBtn.setHeight(61);
            this._animalsBtn.setWidth(190);
            this._animalsBtn.name = "animalsBtn";
            this.addChild(this._animalsBtn);
            this._animalsBtn.on("click", this._categoryClicked, this);
            this._foodLabel = new finalProject.Label("ANIMALS", "30px Consolas", "#000000", 575.5, 331, true);
            this.addChild(this._foodLabel);
            stage.addChild(this);
        };
        Instructions.prototype.update = function () {
        };
        return Instructions;
    })(finalProject.Scene);
    finalProject.Instructions = Instructions;
})(finalProject || (finalProject = {}));
//# sourceMappingURL=instructions.js.map