running = 0
button = 0
myCodeMirror = 0
msg = 0
student_draw = 0
student_setup = 0

setup = ->
	c = createCanvas 600, 600
	pixelDensity 1
	c.parent 'canvas'

	msg = $('#msg')

	button = createButton "run"
	button.position 560,600
	button.size 40,20
	button.mousePressed run

draw = ->
	if running == 1
		student_draw()
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
	b = myCodeMirror.getValue()

	orig_setup = setup
	orig_draw = draw
	setup = ->
	draw = ->

	run1 transpile b  

	student_draw = draw
	student_setup = setup
	draw = orig_draw 
	setup = orig_setup

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
	running = 1 - running 
	if running == 1
		run0()
		window.student_setup()
	else 
		background 255

window.onload = ->

	myCodeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
		lineNumbers: true,
		mode: "coffeescript",
		keyMap: "sublime",
		theme: "dracula",
		autoCloseBrackets: true,
		lineWiseCopyCut: true,
		tabSize: 2,
		indentWithTabs: true})

	$(".CodeMirror").css('font-size',"16pt")

	myCodeMirror.setValue initial_code
	myCodeMirror.refresh()

	background 128

	myCodeMirror.focus()
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
	msg.val(txt)
	if txt == '' 
		msg.css('background-color', '#FFFFFF')
	else
		msg.css('background-color', '#FF0000')

initial_code = """
@balls = []

class Ball
	constructor : (@x,@y,@size, @vx,@vy, @r=random(1),@g=random(1),@b=random(1)) -> print @

	draw : ->
		fc @r,@g,@b
		circle @x,@y,@size
		@x += @vx
		@y += @vy
		@vx = -@vx unless @size < @x < width-@size
		@vy = if @y < height-@size then @vy+0.1 else -@vy

@draw = ->
	bg 0.5
	for ball in @balls
		ball.draw()
		
@mousePressed = ->
	if mouseX < width and mouseY < height
		@balls.push new Ball mouseX,mouseY,random(10,50), vx=random(1,2),vy=0
"""