# p5Coffee

p5 and Coffeescript editor.

Use colon instead of equal sign for all events
* setup : ->
* draw : ->
* mousePressed : ->
* and so on...

Tabs are two spaces.

F12 will give you debug information

Assert fungerar:

f = (x) -> x*x
setup : ->		
	@assert f(6),26