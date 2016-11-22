// Generated by CoffeeScript 1.11.1
var bg, changeLayout, circle, co, draw, f_resize, fc, fixColor, grid, initial_code, keyPressed, keyReleased, keyTyped, mouseClicked, mouseDragged, mouseMoved, mousePressed, mouseReleased, mouseWheel, print, range, rd, reset, resizeTimer, run, run0, run1, sc, setMsg, setup, student, sw, touchEnded, touchMoved, touchStarted;

student = {};

student.running = 0;

student.button = 0;

student.myCodeMirror = 0;

student.msg = 0;

setup = function() {
  var c;
  c = createCanvas(600, 600);
  pixelDensity(1);
  c.parent('canvas');
  student.msg = $('#msg');
  student.button = createButton("run");
  student.button.position(560, 600);
  student.button.size(40, 20);
  return student.button.mousePressed(run);
};

keyPressed = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.keyPressed();
  }
};

keyReleased = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.keyReleased();
  }
};

keyTyped = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.keyTyped();
  }
};

mouseMoved = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mouseMoved();
  }
};

mouseDragged = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mouseDragged();
  }
};

mousePressed = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mousePressed();
  }
};

mouseReleased = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mouseReleased();
  }
};

mouseClicked = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mouseClicked();
  }
};

mouseWheel = function(event) {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.mouseWheel(event);
  }
};

touchStarted = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.touchStarted();
  }
};

touchMoved = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.touchMoved();
  }
};

touchEnded = function() {
  if ((typeof xstudent !== "undefined" && xstudent !== null) && student.running === 1) {
    return xstudent.touchEnded();
  }
};

draw = function() {
  if (student.running === 1) {
    return xstudent.draw();
  } else {
    return bg(1);
  }
};

reset = function() {
  colorMode(RGB, 255);
  background(0);
  fill(0);
  return stroke(255);
};

grid = function() {
  var i, j, len, ref;
  push();
  sc(1);
  ref = range(30);
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    line(0, 20 * i, 200, 20 * i);
    line(20 * i, 0, 20 * i, 200);
  }
  return pop();
};

fixColor = function(args) {
  var a, b, g, n, r;
  n = args.length;
  r = 0;
  g = 0;
  b = 0;
  a = 1;
  if (n === 1) {
    r = args[0];
    g = r;
    b = r;
  } else if (n === 3) {
    r = args[0];
    g = args[1];
    b = args[2];
  } else if (n === 4) {
    r = args[0];
    g = args[1];
    b = args[2];
    a = args[3];
  }
  return color(255 * r, 255 * g, 255 * b, 255 * a);
};

bg = function() {
  return background(fixColor(arguments));
};

sw = function(n) {
  return strokeWeight(n);
};

circle = function(x, y, r) {
  return ellipse(x, y, 2 * r, 2 * r);
};

rd = function(vinkel) {
  return rotate(radians(vinkel));
};

print = function(s) {
  return console.log(s);
};

co = function() {
  return fixColor(arguments);
};

fc = function() {
  var n;
  n = arguments.length;
  if (n === 0) {
    return noFill();
  } else {
    return fill(fixColor(arguments));
  }
};

sc = function(r, g, b) {
  var n;
  n = arguments.length;
  if (n === 0) {
    return noStroke();
  } else {
    return stroke(fixColor(arguments));
  }
};

range = function() {
  var n;
  n = arguments.length;
  if (n === 1) {
    return _.range(arguments[0]);
  } else if (n === 2) {
    return _.range(arguments[0], arguments[1]);
  } else if (n === 3) {
    return _.range(arguments[0], arguments[1], arguments[2]);
  }
};

run0 = function() {
  var b;
  b = student.myCodeMirror.getValue();
  return run1(transpile(b));
};

run1 = function(code) {
  var err;
  resetMatrix();
  rectMode(CORNER);
  push();
  reset();
  try {
    setMsg('');
    eval(code);
    return pop();
  } catch (error) {
    err = error;
    pop();
    return setMsg(err.stack);
  }
};

run = function() {
  student.running = 1 - student.running;
  if (student.running === 1) {
    run0();
    return xstudent.setup();
  } else {
    return background(255);
  }
};

window.onload = function() {
  student.myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "coffeescript",
    keyMap: "sublime",
    theme: "dracula",
    autoCloseBrackets: true,
    lineWiseCopyCut: true,
    tabSize: 2,
    indentWithTabs: true
  });
  $(".CodeMirror").css('font-size', "16pt");
  student.myCodeMirror.setValue(initial_code);
  student.myCodeMirror.refresh();
  background(128);
  student.myCodeMirror.focus();
  window.resizeTo(1000, 750);
  return changeLayout();
};

changeLayout = function() {
  var w;
  w = $(window).width();
  $(".CodeMirror").width(w - 600);
  $(".CodeMirror").css({
    top: 0,
    left: 600,
    height: 600,
    position: 'absolute'
  });
  $("#canvas").css({
    left: 0,
    top: 0,
    position: 'absolute'
  });
  return $("#msg").width(w - 600);
};

resizeTimer = 0;

f_resize = function() {
  clearTimeout(resizeTimer);
  return resizeTimer = setTimeout(changeLayout, 10);
};

setMsg = function(txt) {
  student.msg.val(txt);
  if (txt === '') {
    return student.msg.css('background-color', '#FFFFFF');
  } else {
    return student.msg.css('background-color', '#FF0000');
  }
};

initial_code = "class Ball\n	constructor : (@x,@y, @vx,@vy, @size=50) -> \n	draw : ->\n		fc()\n		circle @x,@y,@size\n		@x += @vx\n		@y += @vy\n		@vx = -@vx unless @size < @x < width-@size\n		@vy = if @y < height-@size then @vy+0.1 else -@vy\n\nshowCount = -> text balls.length, 10,40\nballs = []\n\nsetup : -> balls.push new Ball x=300,y=300, vx=random(-1,1),vy=0\ndraw : ->\n	bg 0.5\n	ball.draw() for ball in balls\n	fc 0\n	textSize 40\n	showCount()\nmousePressed : ->\n	if mouseX < width and mouseY < height\n		balls.push new Ball x=mouseX,y=mouseY, vx=random(-1,1),vy=0";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2tldGNoLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBQTs7QUFBQSxPQUFBLEdBQVU7O0FBQ1YsT0FBTyxDQUFDLE9BQVIsR0FBa0I7O0FBQ2xCLE9BQU8sQ0FBQyxNQUFSLEdBQWlCOztBQUNqQixPQUFPLENBQUMsWUFBUixHQUF1Qjs7QUFDdkIsT0FBTyxDQUFDLEdBQVIsR0FBYzs7QUFFZCxLQUFBLEdBQVEsU0FBQTtBQUNQLE1BQUE7RUFBQSxDQUFBLEdBQUksWUFBQSxDQUFhLEdBQWIsRUFBa0IsR0FBbEI7RUFDSixZQUFBLENBQWEsQ0FBYjtFQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsUUFBVDtFQUVBLE9BQU8sQ0FBQyxHQUFSLEdBQWMsQ0FBQSxDQUFFLE1BQUY7RUFFZCxPQUFPLENBQUMsTUFBUixHQUFpQixZQUFBLENBQWEsS0FBYjtFQUNqQixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQWYsQ0FBd0IsR0FBeEIsRUFBNEIsR0FBNUI7RUFDQSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQWYsQ0FBb0IsRUFBcEIsRUFBdUIsRUFBdkI7U0FDQSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQWYsQ0FBNEIsR0FBNUI7QUFWTzs7QUFhUixVQUFBLEdBQWEsU0FBQTtFQUFHLElBQXlCLHNEQUFBLElBQWMsT0FBTyxDQUFDLE9BQVIsS0FBaUIsQ0FBeEQ7V0FBQSxRQUFRLENBQUMsVUFBVCxDQUFBLEVBQUE7O0FBQUg7O0FBQ2IsV0FBQSxHQUFjLFNBQUE7RUFBRyxJQUEwQixzREFBQSxJQUFjLE9BQU8sQ0FBQyxPQUFSLEtBQWlCLENBQXpEO1dBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBQSxFQUFBOztBQUFIOztBQUNkLFFBQUEsR0FBVyxTQUFBO0VBQUcsSUFBdUIsc0RBQUEsSUFBYyxPQUFPLENBQUMsT0FBUixLQUFpQixDQUF0RDtXQUFBLFFBQVEsQ0FBQyxRQUFULENB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QUFBLENBQUUsYUFBRixDQUFnQixDQUFDLEdBQWpCLENBQXFCO0lBQUMsR0FBQSxFQUFLLENBQU47SUFBUyxJQUFBLEVBQU0sR0FBZjtJQUFvQixNQUFBLEVBQVEsR0FBNUI7SUFBaUMsUUFBQSxFQUFTLFVBQTFDO0dBQXJCO0VBQ0EsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLEdBQWIsQ0FBaUI7SUFBQyxJQUFBLEVBQUssQ0FBTjtJQUFTLEdBQUEsRUFBSyxDQUFkO0lBQWlCLFFBQUEsRUFBUyxVQUExQjtHQUFqQjtTQUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxLQUFWLENBQWdCLENBQUEsR0FBRSxHQUFsQjtBQUxjOztBQU9mLFdBQUEsR0FBYzs7QUFDZCxRQUFBLEdBQVcsU0FBQTtFQUNWLFlBQUEsQ0FBYSxXQUFiO1NBQ0EsV0FBQSxHQUFjLFVBQUEsQ0FBVyxZQUFYLEVBQXlCLEVBQXpCO0FBRko7O0FBTVgsTUFBQSxHQUFTLFNBQUMsR0FBRDtFQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBWixDQUFnQixHQUFoQjtFQUNBLElBQUcsR0FBQSxLQUFPLEVBQVY7V0FDQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQVosQ0FBZ0Isa0JBQWhCLEVBQW9DLFNBQXBDLEVBREQ7R0FBQSxNQUFBO1dBR0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFaLENBQWdCLGtCQUFoQixFQUFvQyxTQUFwQyxFQUhEOztBQUZROztBQU9ULFlBQUEsR0FBZSIsInNvdXJjZXNDb250ZW50IjpbIlxuc3R1ZGVudCA9IHt9XG5zdHVkZW50LnJ1bm5pbmcgPSAwXG5zdHVkZW50LmJ1dHRvbiA9IDBcbnN0dWRlbnQubXlDb2RlTWlycm9yID0gMFxuc3R1ZGVudC5tc2cgPSAwXG5cbnNldHVwID0gLT5cblx0YyA9IGNyZWF0ZUNhbnZhcyA2MDAsIDYwMFxuXHRwaXhlbERlbnNpdHkgMVxuXHRjLnBhcmVudCAnY2FudmFzJ1xuXG5cdHN0dWRlbnQubXNnID0gJCgnI21zZycpXG5cblx0c3R1ZGVudC5idXR0b24gPSBjcmVhdGVCdXR0b24gXCJydW5cIlxuXHRzdHVkZW50LmJ1dHRvbi5wb3NpdGlvbiA1NjAsNjAwXG5cdHN0dWRlbnQuYnV0dG9uLnNpemUgNDAsMjBcblx0c3R1ZGVudC5idXR0b24ubW91c2VQcmVzc2VkIHJ1blxuXG4jIEFkZCBhbGwgcG9zc2libGUgZXZlbnRzLlxua2V5UHJlc3NlZCA9IC0+IHhzdHVkZW50LmtleVByZXNzZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxua2V5UmVsZWFzZWQgPSAtPiB4c3R1ZGVudC5rZXlSZWxlYXNlZCgpIGlmIHhzdHVkZW50PyBhbmQgc3R1ZGVudC5ydW5uaW5nPT0xXG5rZXlUeXBlZCA9IC0+IHhzdHVkZW50LmtleVR5cGVkKCkgaWYgeHN0dWRlbnQ/IGFuZCBzdHVkZW50LnJ1bm5pbmc9PTFcbm1vdXNlTW92ZWQgPSAtPiB4c3R1ZGVudC5tb3VzZU1vdmVkKCkgaWYgeHN0dWRlbnQ/IGFuZCBzdHVkZW50LnJ1bm5pbmc9PTFcbm1vdXNlRHJhZ2dlZCA9IC0+IHhzdHVkZW50Lm1vdXNlRHJhZ2dlZCgpIGlmIHhzdHVkZW50PyBhbmQgc3R1ZGVudC5ydW5uaW5nPT0xXG5tb3VzZVByZXNzZWQgPSAtPiB4c3R1ZGVudC5tb3VzZVByZXNzZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxubW91c2VSZWxlYXNlZCA9IC0+IHhzdHVkZW50Lm1vdXNlUmVsZWFzZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxubW91c2VDbGlja2VkID0gLT4geHN0dWRlbnQubW91c2VDbGlja2VkKCkgaWYgeHN0dWRlbnQ/IGFuZCBzdHVkZW50LnJ1bm5pbmc9PTFcbm1vdXNlV2hlZWwgPSAoZXZlbnQpIC0+IHhzdHVkZW50Lm1vdXNlV2hlZWwoZXZlbnQpIGlmIHhzdHVkZW50PyBhbmQgc3R1ZGVudC5ydW5uaW5nPT0xXG50b3VjaFN0YXJ0ZWQgPSAtPiB4c3R1ZGVudC50b3VjaFN0YXJ0ZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxudG91Y2hNb3ZlZCA9IC0+IHhzdHVkZW50LnRvdWNoTW92ZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxudG91Y2hFbmRlZCA9IC0+IHhzdHVkZW50LnRvdWNoRW5kZWQoKSBpZiB4c3R1ZGVudD8gYW5kIHN0dWRlbnQucnVubmluZz09MVxuXG5kcmF3ID0gLT5cblx0aWYgc3R1ZGVudC5ydW5uaW5nID09IDFcblx0XHR4c3R1ZGVudC5kcmF3KCkgXG5cdGVsc2Vcblx0XHRiZyAxXG5cbnJlc2V0ID0gLT4gXG5cdGNvbG9yTW9kZSBSR0IsMjU1XG5cdGJhY2tncm91bmQgMFxuXHRmaWxsIDBcblx0c3Ryb2tlIDI1NVxuXG5ncmlkID0gLT4gXG5cdHB1c2goKVxuXHRzYyAxXG5cdGZvciBpIGluIHJhbmdlIDMwXG5cdFx0bGluZSAwLCAyMCAqIGksIDIwMCwgMjAgKiBpXG5cdFx0bGluZSAyMCAqIGksIDAsIDIwICogaSwgMjAwXG5cdHBvcCgpXG5cbmZpeENvbG9yID0gKGFyZ3MpIC0+XG5cdG4gPSBhcmdzLmxlbmd0aFxuXHRyPTBcblx0Zz0wXG5cdGI9MCBcblx0YT0xXG5cdGlmIG4gPT0gMVxuXHRcdHIgPSBhcmdzWzBdXG5cdFx0ZyA9IHJcblx0XHRiID0gclxuXHRlbHNlIGlmIG4gPT0gM1xuXHRcdHIgPSBhcmdzWzBdXG5cdFx0ZyA9IGFyZ3NbMV1cblx0XHRiID0gYXJnc1syXVxuXHRlbHNlIGlmIG49PTRcblx0XHRyID0gYXJnc1swXVxuXHRcdGcgPSBhcmdzWzFdXG5cdFx0YiA9IGFyZ3NbMl1cblx0XHRhID0gYXJnc1szXSAgICBcblx0cmV0dXJuIGNvbG9yIDI1NSAqIHIsIDI1NSAqIGcsIDI1NSAqIGIsIDI1NSAqIGFcblxuYmcgPSAtPlx0YmFja2dyb3VuZCBmaXhDb2xvciBhcmd1bWVudHNcbnN3ID0gKG4pIC0+IHN0cm9rZVdlaWdodCBuIFxuY2lyY2xlID0gKHgseSxyKSAtPiBlbGxpcHNlIHgseSwyKnIsMipyXG5yZCA9ICh2aW5rZWwpIC0+IHJldHVybiByb3RhdGUgcmFkaWFucyB2aW5rZWxcbnByaW50ID0gKHMpIC0+IGNvbnNvbGUubG9nIHNcbmNvID0gLT4gcmV0dXJuIGZpeENvbG9yIGFyZ3VtZW50c1xuXG5mYyA9IC0+XG5cdG4gPSBhcmd1bWVudHMubGVuZ3RoXG5cdGlmIG4gPT0gMFxuXHRcdG5vRmlsbCgpXG5cdGVsc2Vcblx0XHRmaWxsIGZpeENvbG9yIGFyZ3VtZW50c1xuXG5zYyA9IChyLCBnLCBiKSAtPlxuXHRuID0gYXJndW1lbnRzLmxlbmd0aFxuXHRpZiBuID09IDBcblx0XHRub1N0cm9rZSgpXG5cdGVsc2Vcblx0XHRzdHJva2UgZml4Q29sb3IgYXJndW1lbnRzXG5cbnJhbmdlID0gKCkgLT5cblx0biA9IGFyZ3VtZW50cy5sZW5ndGhcblx0aWYgbj09MVxuXHRcdHJldHVybiBfLnJhbmdlIGFyZ3VtZW50c1swXVxuXHRlbHNlIGlmIG49PTJcblx0XHRyZXR1cm4gXy5yYW5nZSBhcmd1bWVudHNbMF0sYXJndW1lbnRzWzFdXG5cdGVsc2UgaWYgbj09M1xuXHRcdHJldHVybiBfLnJhbmdlIGFyZ3VtZW50c1swXSxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdXG5cbnJ1bjAgPSAtPlxuXHRiID0gc3R1ZGVudC5teUNvZGVNaXJyb3IuZ2V0VmFsdWUoKVxuXG5cdHJ1bjEgdHJhbnNwaWxlIGIgIFxuXG5ydW4xID0gKGNvZGUpIC0+XG5cdHJlc2V0TWF0cml4KClcblx0cmVjdE1vZGUgQ09STkVSXG5cdHB1c2goKVxuXHRyZXNldCgpXG5cblx0dHJ5IFxuXHRcdHNldE1zZyAnJ1xuXHRcdGV2YWwgY29kZVxuXHRcdHBvcCgpXG5cdGNhdGNoIGVyclxuXHRcdHBvcCgpXG5cdFx0c2V0TXNnIGVyci5zdGFja1xuXG5ydW4gPSAtPlxuXHRzdHVkZW50LnJ1bm5pbmcgPSAxIC0gc3R1ZGVudC5ydW5uaW5nIFxuXHRpZiBzdHVkZW50LnJ1bm5pbmcgPT0gMVxuXHRcdHJ1bjAoKVxuXHRcdHhzdHVkZW50LnNldHVwKCkgXG5cdGVsc2UgXG5cdFx0YmFja2dyb3VuZCAyNTVcblxud2luZG93Lm9ubG9hZCA9IC0+XG5cblx0c3R1ZGVudC5teUNvZGVNaXJyb3IgPSBDb2RlTWlycm9yLmZyb21UZXh0QXJlYShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZGVcIiksIHtcblx0XHRsaW5lTnVtYmVyczogdHJ1ZSxcblx0XHRtb2RlOiBcImNvZmZlZXNjcmlwdFwiLFxuXHRcdGtleU1hcDogXCJzdWJsaW1lXCIsXG5cdFx0dGhlbWU6IFwiZHJhY3VsYVwiLFxuXHRcdGF1dG9DbG9zZUJyYWNrZXRzOiB0cnVlLFxuXHRcdGxpbmVXaXNlQ29weUN1dDogdHJ1ZSxcblx0XHR0YWJTaXplOiAyLFxuXHRcdGluZGVudFdpdGhUYWJzOiB0cnVlfSlcblxuXHQkKFwiLkNvZGVNaXJyb3JcIikuY3NzKCdmb250LXNpemUnLFwiMTZwdFwiKVxuXG5cdHN0dWRlbnQubXlDb2RlTWlycm9yLnNldFZhbHVlIGluaXRpYWxfY29kZVxuXHRzdHVkZW50Lm15Q29kZU1pcnJvci5yZWZyZXNoKClcblxuXHRiYWNrZ3JvdW5kIDEyOFxuXG5cdHN0dWRlbnQubXlDb2RlTWlycm9yLmZvY3VzKClcblx0d2luZG93LnJlc2l6ZVRvIDEwMDAsNzUwXG5cdGNoYW5nZUxheW91dCgpXG5cbmNoYW5nZUxheW91dCA9ICgpIC0+XG5cdHcgPSAkKHdpbmRvdykud2lkdGgoKVxuXHQkKFwiLkNvZGVNaXJyb3JcIikud2lkdGgody02MDApXG5cdCQoXCIuQ29kZU1pcnJvclwiKS5jc3Moe3RvcDogMCwgbGVmdDogNjAwLCBoZWlnaHQ6IDYwMCwgcG9zaXRpb246J2Fic29sdXRlJ30pOyAgIFxuXHQkKFwiI2NhbnZhc1wiKS5jc3Moe2xlZnQ6MCwgdG9wOiAwLCBwb3NpdGlvbjonYWJzb2x1dGUnfSk7ICAgIFxuXHQkKFwiI21zZ1wiKS53aWR0aCh3LTYwMClcblxucmVzaXplVGltZXIgPSAwXG5mX3Jlc2l6ZSA9ICgpIC0+XG5cdGNsZWFyVGltZW91dChyZXNpemVUaW1lcilcblx0cmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGNoYW5nZUxheW91dCwgMTApXG5cbiMkKHdpbmRvdykucmVzaXplKGZfcmVzaXplKVxuXG5zZXRNc2cgPSAodHh0KSAtPlxuXHRzdHVkZW50Lm1zZy52YWwodHh0KVxuXHRpZiB0eHQgPT0gJycgXG5cdFx0c3R1ZGVudC5tc2cuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNGRkZGRkYnKVxuXHRlbHNlXG5cdFx0c3R1ZGVudC5tc2cuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywgJyNGRjAwMDAnKVxuXG5pbml0aWFsX2NvZGUgPSBcIlwiXCJcbmNsYXNzIEJhbGxcblx0Y29uc3RydWN0b3IgOiAoQHgsQHksIEB2eCxAdnksIEBzaXplPTUwKSAtPiBcblx0ZHJhdyA6IC0+XG5cdFx0ZmMoKVxuXHRcdGNpcmNsZSBAeCxAeSxAc2l6ZVxuXHRcdEB4ICs9IEB2eFxuXHRcdEB5ICs9IEB2eVxuXHRcdEB2eCA9IC1AdnggdW5sZXNzIEBzaXplIDwgQHggPCB3aWR0aC1Ac2l6ZVxuXHRcdEB2eSA9IGlmIEB5IDwgaGVpZ2h0LUBzaXplIHRoZW4gQHZ5KzAuMSBlbHNlIC1Adnlcblxuc2hvd0NvdW50ID0gLT4gdGV4dCBiYWxscy5sZW5ndGgsIDEwLDQwXG5iYWxscyA9IFtdXG5cbnNldHVwIDogLT4gYmFsbHMucHVzaCBuZXcgQmFsbCB4PTMwMCx5PTMwMCwgdng9cmFuZG9tKC0xLDEpLHZ5PTBcbmRyYXcgOiAtPlxuXHRiZyAwLjVcblx0YmFsbC5kcmF3KCkgZm9yIGJhbGwgaW4gYmFsbHNcblx0ZmMgMFxuXHR0ZXh0U2l6ZSA0MFxuXHRzaG93Q291bnQoKVxubW91c2VQcmVzc2VkIDogLT5cblx0aWYgbW91c2VYIDwgd2lkdGggYW5kIG1vdXNlWSA8IGhlaWdodFxuXHRcdGJhbGxzLnB1c2ggbmV3IEJhbGwgeD1tb3VzZVgseT1tb3VzZVksIHZ4PXJhbmRvbSgtMSwxKSx2eT0wXG5cIlwiXCIiXX0=
//# sourceURL=C:\github\p5Coffee\sketch.coffee