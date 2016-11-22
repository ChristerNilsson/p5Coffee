
student = {}
student.running = 0
student.button = 0
student.myCodeMirror = 0
student.msg = 0

setup = ->
	c = createCanvas 600, 600
	pixelDensity 1
	c.parent 'canvas'

	student.msg = $('#msg')

	student.button = createButton "run"
	student.button.position 560,600
	student.button.size 40,20
	student.button.mousePressed run

# Add all possible events.
keyPressed = -> xstudent.keyPressed() if xstudent? and student.running==1
keyReleased = -> xstudent.keyReleased() if xstudent? and student.running==1
keyTyped = -> xstudent.keyTyped() if xstudent? and student.running==1
mouseMoved = -> xstudent.mouseMoved() if xstudent? and student.running==1
mouseDragged = -> xstudent.mouseDragged() if xstudent? and student.running==1
mousePressed = -> xstudent.mousePressed() if xstudent? and student.running==1
mouseReleased = -> xstudent.mouseReleased() if xstudent? and student.running==1
mouseClicked = -> xstudent.mouseClicked() if xstudent? and student.running==1
mouseWheel = (event) -> xstudent.mouseWheel(event) if xstudent? and student.running==1
touchStarted = -> xstudent.touchStarted() if xstudent? and student.running==1
touchMoved = -> xstudent.touchMoved() if xstudent? and student.running==1
touchEnded = -> xstudent.touchEnded() if xstudent? and student.running==1

draw = ->
	if student.running == 1
		xstudent.draw() 
	else
		bg 1

reset = -> 
	colorMode RGB,255
	background 0
	fill 0
	stroke 255

grid = -> 
	push()
	sc 1
	for i in range 30
		line 0, 20 * i, 200, 20 * i
		line 20 * i, 0, 20 * i, 200
	pop()

fixColor = (args) ->
	n = args.length
	r=0
	g=0
	b=0 
	a=1
	if n == 1
		r = args[0]
		g = r
		b = r
	else if n == 3
		r = args[0]
		g = args[1]
		b = args[2]
	else if n==4
		r = args[0]
		g = args[1]
		b = args[2]
		a = args[3]    
	return color 255 * r, 255 * g, 255 * b, 255 * a

bg = ->	background fixColor arguments
sw = (n) -> strokeWeight n 
circle = (x,y,r) -> ellipse x,y,2*r,2*r
rd = (vinkel) -> return rotate radians vinkel
print = (s) -> console.log s
co = -> return fixColor arguments

fc = ->
	n = arguments.length
	if n == 0
		noFill()
	else
		fill fixColor arguments

sc = (r, g, b) ->
	n = arguments.length
	if n == 0
		noStroke()
	else
		stroke fixColor arguments

range = () ->
	n = arguments.length
	if n==1
		return _.range arguments[0]
	else if n==2
		return _.range arguments[0],arguments[1]
	else if n==3
		return _.range arguments[0],arguments[1],arguments[2]

run0 = ->
	b = student.myCodeMirror.getValue()

	run1 transpile b  

run1 = (code) ->
	resetMatrix()
	rectMode CORNER
	push()
	reset()

	try 
		setMsg ''
		eval code
		pop()
	catch err
		pop()
		setMsg err.stack

run = ->
	student.running = 1 - student.running 
	if student.running == 1
		run0()
		xstudent.setup() 
	else 
		background 255

window.onload = ->

	student.myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineNumbers: true,
		mode: "coffeescript",
		keyMap: "sublime",
		theme: "dracula",
		autoCloseBrackets: true,
		lineWiseCopyCut: true,
		tabSize: 2,
		indentWithTabs: true})

	$(".CodeMirror").css('font-size',"16pt")

	student.myCodeMirror.setValue initial_code
	student.myCodeMirror.refresh()

	background 128

	student.myCodeMirror.focus()
	window.resizeTo 1000,750
	changeLayout()

changeLayout = () ->
	w = $(window).width()
	$(".CodeMirror").width(w-600)
	$(".CodeMirror").css({top: 0, left: 600, height: 600, position:'absolute'});   
	$("#canvas").css({left:0, top: 0, position:'absolute'});    
	$("#msg").width(w-600)

resizeTimer = 0
f_resize = () ->
	clearTimeout(resizeTimer)
	resizeTimer = setTimeout(changeLayout, 10)

#$(window).resize(f_resize)

setMsg = (txt) ->
	student.msg.val(txt)
	if txt == '' 
		student.msg.css('background-color', '#FFFFFF')
	else
		student.msg.css('background-color', '#FF0000')

initial_code = """
class Ball
	constructor : (@x,@y, @vx,@vy, @size=50) -> 
	draw : ->
		fc()
		circle @x,@y,@size
		@x += @vx
		@y += @vy
		@vx = -@vx unless @size < @x < width-@size
		@vy = if @y < height-@size then @vy+0.1 else -@vy

showCount = -> text balls.length, 10,40
balls = []

setup : -> balls.push new Ball x=300,y=300, vx=random(-1,1),vy=0
draw : ->
	bg 0.5
	ball.draw() for ball in balls
	fc 0
	textSize 40
	showCount()
mousePressed : ->
	if mouseX < width and mouseY < height
		balls.push new Ball x=mouseX,y=mouseY, vx=random(-1,1),vy=0
"""