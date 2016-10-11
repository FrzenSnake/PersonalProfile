//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private _touchStatus:boolean = false;              //当前触摸状态，按下时，值为true
    private _distance:egret.Point = new egret.Point(); //鼠标点击时，鼠标全局坐标与_bird的位置差
   
    private createGameScene():void {
        this.$touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        var sky:egret.Bitmap = this.createBitmapByName("background2_jpeg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var sky2:egret.Bitmap = this.createBitmapByName("background2_jpeg");
        this.addChild(sky2);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky2.y=sky.y+1136
        sky2.width = stageW;
        sky2.height = stageH;

        
        var introuduce1 = new egret.TextField();
        introuduce1 .textColor = 0xffbbff;
        introuduce1 .width = 132;
        introuduce1 .textAlign ="center";
        introuduce1 .text = "姓名：李逸丰   性别：男         职业：学生    星座：射手座 生日：12.21";
        introuduce1 .size = 20;
        introuduce1 .x = 30;
        introuduce1 .y = 1136+120;
        this.addChild(introuduce1 );

        var introuduce2 = new egret.TextField();
        introuduce2 .textColor = 0xcaff70;
        introuduce2 .width = 112;
        introuduce2 .textAlign ="center";
        introuduce2 .text = "爱好1：lol   段位：塑料         擅长：上野    想法：老师如果有时间的话一起开黑吧";
        introuduce2 .size = 20;
        introuduce2 .x = 190;
        introuduce2 .y = 1136+120;
        this.addChild(introuduce2 );


        var introuduce3 = new egret.TextField();
        introuduce3 .textColor = 0xbbffff;
        introuduce3 .width = 112;
        introuduce3 .textAlign ="center";
        introuduce3 .text = "爱好2：动漫   最爱：高达         人物：基拉    愿望：想要一台自己的高达";
        introuduce3 .size = 20;
        introuduce3 .x = 325;
        introuduce3 .y = 1136+120;
        this.addChild(introuduce3 );


        var introuduce4 = new egret.TextField();
        introuduce4 .textColor = 0xeeee00;
        introuduce4 .width = 142;
        introuduce4 .textAlign ="center";
        introuduce4 .text = "偶像：小岛秀夫   作品：合金装备        理想：和小岛一起做游戏，成为想他那样的游戏人";
        introuduce4 .size = 20;
        introuduce4 .x = 450;
        introuduce4 .y = 1136+120;
        this.addChild(introuduce4 );

        var reminder1 = new egret.TextField();
        reminder1 .textColor = 0xffffff;
        reminder1 .width = this.stage.stageWidth-60;
        reminder1 .textAlign ="center";
        reminder1 .text = "请点击图片";
        reminder1 .size =60;
        reminder1 .x = 30;
        reminder1.y = 1136+900;
        this.addChild(reminder1);

        var picture1:egret.Bitmap = this.createBitmapByName("p1_png");
        this.addChild(picture1);
        picture1.x=0;
        picture1.y=50+1136;
        picture1.touchEnabled=true;
        picture1.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        if(picture1.y==1136+50){
        egret.Tween.get(picture1).to({x:0,y:1136+780},300,egret.Ease.sineIn);
        }
        if(picture1.y==1136+780){
        egret.Tween.get(picture1).to({x:0,y:1136+50},300,egret.Ease.sineIn);
        }
        },this);

        var picture2:egret.Bitmap = this.createBitmapByName("p2_png");
        this.addChild(picture2);
        picture2.x=193;
        picture2.y=50+1136;
        picture2.touchEnabled=true;
        picture2.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        if(picture2.y==1136+50){
        egret.Tween.get(picture2).to({x:193,y:1136+780},300,egret.Ease.sineIn);
        }
        if(picture2.y==1136+780){
        egret.Tween.get(picture2).to({x:193,y:1136+50},300,egret.Ease.sineIn);
        }
        },this);

        var picture3:egret.Bitmap = this.createBitmapByName("p3_png");
        this.addChild(picture3);
        
        picture3.x=324;
        picture3.y=50+1136;
        picture3.touchEnabled=true;

        picture3.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        if(picture3.y==1136+50){
        egret.Tween.get(picture3).to({x:324,y:1136+780},300,egret.Ease.sineIn);
        }
        if(picture3.y==1136+780){
        egret.Tween.get(picture3).to({x:324,y:1136+50},300,egret.Ease.sineIn);
        }


        },this);

        var picture4:egret.Bitmap = this.createBitmapByName("p4_png");
        this.addChild(picture4);        
        picture4.x=450;
        picture4.y=50+1136;
        picture4.touchEnabled=true;
        picture4.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        if(picture4.y==1136+50){
        egret.Tween.get(picture4).to({x:450,y:1136+780},300,egret.Ease.sineIn);
        }
        if(picture4.y==1136+780){
        egret.Tween.get(picture4).to({x:450,y:1136+50},300,egret.Ease.sineIn);
        }
        },this);

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("kojima_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 50;

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "14081115";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
   
     private mouseDown(evt:egret.TouchEvent)
    {
        console.log("Mouse Down.");
        this._touchStatus = true;
        //this._distance.x = evt.stageX - this.x;
        this._distance.y = evt.stageY - this.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    private mouseMove(evt:egret.TouchEvent)
    {
        if( this._touchStatus )
        {
            console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            //this.x = evt.stageX - this._distance.x;
            this.y = evt.stageY - this._distance.y;
        }
     
        
    }

    private mouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        this._touchStatus = false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        
        if(this.y<-568)
        {
           egret.Tween.get(this).to({y:-1136},300,egret.Ease.backOut);
           this.y=-1136;
        }
        
        else(this.y>-568)
        {
           egret.Tween.get(this).to({y:0},300,egret.Ease.backOut);
           this.y=0
        }
    }

}
