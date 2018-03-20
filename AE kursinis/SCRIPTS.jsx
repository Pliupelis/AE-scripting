//
app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
app.newProject();
//COMP SUKURIMAS       
app.beginUndoGroup("Creating composition");
compName = null;
var compW = 1920; 
var compH =1080;
var compA = 1;
var compD = 70;
var compF = 25;
// COMP.PAV IVEDIMAS
while (compName == null){
	var compName = prompt("Enter composition name","Default name");
	if (compName == null){
		alert("Please enter a composition name");
	}
}    

var myComp = app.project.items.addComp(compName,compW, compH, compA, compD, compF);
myComp.openInViewer();
app.endUndoGroup();

// FONAS
app.beginUndoGroup("Creating background");
var background = myComp.layers.addSolid([255/255,255/255,255/255], "background", compW, compH, compA,compD);
app.endUndoGroup();
app.beginUndoGroup("text");

// TEKSTO LAYERIO SUKURIMAS
var textLayer                   = myComp.layers.addText( "VILNIAUS GEDIMINO TECHNIKOS UNIVERSITETAS");
var textProperty                = textLayer.property("Source Text");
var textPropertyValue           = textProperty.value;

//TEKSTO DIDINIMAS
textLayer.property("Transform").property("Scale").expression= ''' scaleUpTime = 4.5;
tStart = 2; // start at 2 sec from beginning of comp
startScale =0 ;
endScale =44;
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s,s]
'''
textLayer.property("Transform").property("Anchor Point").setValue([422,27]);
textLayer.property("Transform").property("Position").setValue([948,440]);
//TEXT LAYERIO PROPERTIES
textPropertyValue.resetCharStyle();
textPropertyValue.font= "Arial Unicode MS";
textPropertyValue.tracking = 87 ;
textPropertyValue.fontSize      = 93;
textPropertyValue.fillColor     = [140/255, 141/255, 143/255];
textPropertyValue.justification = ParagraphJustification.CENTER_JUSTIFY;
textProperty.setValue(textPropertyValue);

// MASKAS(APSKRITIMAS)
var newMask = textLayer.Masks.addProperty("Mask");
newMask.inverted = true;
myMaskShape = newMask.property("maskShape");
myShape = myMaskShape.value;
myShape.vertices = [[422,-350], [-30,27],[422,420],[870,27]];
myShape.inTangents = [[220,0],[0,-220],[-220,0],[0,220]];
myShape.outTangents = [[-220,0],[0,220],[220,0],[0,-220]];
myShape.closed = true;
myMaskShape.setValue(myShape);
app.endUndoGroup();



//PAVEIKSLIUKU IKELIMAS
var w = new Window ("dialog");
var importFromFolder = w.add ("button", undefined, "Import From Folder");
importFromFolder.onClick = ImportFilesFromFolder ;


      function ImportFilesFromFolder () {
      
 
                var targetFolder = Folder.selectDialog("Import Files From Folder");
               
                if (targetFolder) {
                                        var files = targetFolder.getFiles();
                                                           
                                            for (var i = 0; i < files.length; i++)
                                            {
                                                try {
                                                var importOptions = new ImportOptions (files[i]);                                                                
                                                app.project.importFile (importOptions);
                                                } catch (error) { /*alert(error.toString());*/}
                                          }
                        }
                    var masyvas=[];
                var proj = app.project;
                var selection = proj.selection;
                for (var i = 0; i < selection.length; i++){
              masyvas[i]=myComp.layers.add(selection[i]);
                }      
            
//1BOX
            masyvas[0].startTime=0.5;
                            masyvas[0].threeDLayer=true;
                 masyvas[0].property("Transform").property("Anchor Point").setValue([1.0,184.5,0.0]);
                     masyvas[0].property("Transform").property("Scale").setValue([29.0,25.4,100]);
                  masyvas[0].property("Transform").property("Position").expression=''' scaleUpTime = 1;
tStart = 5; // start at 2 sec from beginning of comp
startScale =789 ;
endScale =783;
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s,445]
'''

                           masyvas[0].property("Transform").property("Y Rotation").expression=''' scaleUpTime = 1;
tStart = 0.5; // start at 2 sec from beginning of comp
startScale = -94 ;
endScale =0;
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s]
'''
//2BOX
masyvas[1].startTime=1.5;
                                   masyvas[1].threeDLayer=true;
                 masyvas[1].property("Transform").property("Anchor Point").setValue([1.0,184.5,0.0]);
                     masyvas[1].property("Transform").property("Scale").setValue([29.0,25.4,100]);
                  masyvas[1].property("Transform").property("Position").setValue([896,445,0]);
                           masyvas[1].property("Transform").property("Y Rotation").expression=''' scaleUpTime = 1;
tStart =1.5; // start at 2 sec from beginning of comp
startScale = -94 ;
endScale =0;
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s]
'''
//3BOX
           masyvas[2].startTime=2.5;
                               masyvas[2].threeDLayer=true;
                 masyvas[2].property("Transform").property("Anchor Point").setValue([1.0,184.5,0.0]);
                     masyvas[2].property("Transform").property("Scale").setValue([29.0,25.4,100]);
                  masyvas[2].property("Transform").property("Position").expression=''' scaleUpTime = 1;
tStart = 5; // start at 2 sec from beginning of comp
startScale =1003 ;
endScale =1009
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s,445]

'''
                           masyvas[2].property("Transform").property("Y Rotation").expression='''scaleUpTime = 1;
tStart = 2.5; // start at 2 sec from beginning of comp
startScale =-94 ;
endScale =0;
s = ease(time, tStart, tStart + scaleUpTime, startScale, endScale);
[s]
'''
                app.endUndoGroup();   
                }

            w.show ();
            
//NULL LAYERIS SU SLIDERIAIS
app.beginUndoGroup("Creating Sliders");
var slider= myComp.layers.addNull();
slider.name=("ExpController");
slider.effect.addProperty("ADBE Slider Control")("Slider");
slider.effect("Slider Control").property("Slider").expression = ''' clamp(value, min=1, max=1000);'''  // min and max value 
slider.effect("Slider Control").name = ("speed");
slider.effect.addProperty("ADBE Slider Control")("Slider");
slider.effect("Slider Control").property("Slider").expression = ''' clamp(value, min=1, max=100);'''  // min and max value 
slider.effect("Slider Control").name = ("last sec of rotation");
slider.effect.addProperty("ADBE Slider Control")("Slider");
slider.effect("Slider Control").property("Slider").expression = ''' clamp(value, min=1, max=100);'''  // min and max value 
slider.effect("Slider Control").name = ("freq");


//PATH -> MASK1
textLayer.property("Text").property("Path Options").property("Path").setValue(1);
//SUKIMASIS
textLayer.property("Text").property("Path Options").property("First Margin").expression='''spd=thisComp.layer("ExpController").effect("speed")("Slider");
t=time;
t1=0;
t2=thisComp.layer("ExpController").effect("last sec of rotation")("Slider"); // paskutine sukimosi sec
if(t>t1){
inc=(t2-t)*spd;
}
else{
inc=0;
}
value+inc;
'''
//BLURAS
textLayer.Effects.addProperty("ADBE Fast Blur");
textLayer.property("Effects").property("ADBE Fast Blur").property("Blurriness").expression='''freq=thisComp.layer("ExpController").effect("freq")("Slider"); 
t = time;
amp=12;
n = freq.numKeys; //amount of frames
if (n > 0 && freq.key(1).time < t){ 
  INC = freq.key(1).value*(freq.key(1).time- inPoint); //inpoint-pradzia sec layerio
  for (i = 2; i <= n; i++){
    if (freq.key(i).time > t) break;
    k1 = freq.key(i-1);
    k2 = freq.key(i);
    INC += (k1.value + k2.value)*(k2.time - k1.time)/2;
  }
  INC += (freq.value + freq.key(i-1).value)*(t - freq.key(i-1).time)/2;
}else{
  INC = freq.value*(t - inPoint);
}
value +amp*Math.sin(INC*2);
'''
//REVERSE PATH ON
textLayer.property("Text").property("Path Options").property("Reverse Path").setValue(true);


app.endUndoGroup();

     
