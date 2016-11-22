spacesToTabs = (line) ->
	if line.indexOf('  ')==0
		return '\t' + spacesToTabs line.substring 2
	if line.indexOf('\t')==0
		return '\t' + spacesToTabs line.substring 1
	if line.indexOf(' \t')==0
		return '\t' + spacesToTabs line.substring 2
	line

# tar bort alla blanka, tabbar och kommentarer
clean = (s) ->
	s = s.split(' ').join("")
	s = s.split('\t').join("")
	pos = s.indexOf("#")
	if pos>=0
		s = s.substr 0,pos
	s

transpile = (code) ->
	lines = code.split '\n'
	return code if lines[0].indexOf('//ECMA') == 0 
	temp = ['class Student']
	temp.push('\tsetup : ->')
	temp.push('\tdraw : ->')
	temp.push('\tkeyPressed : ->')
	temp.push('\tmousePressed : ->')
	for line in lines
		line = "\t" + spacesToTabs line
		if clean(line).length > 0 
			temp.push line
	temp.push "@xstudent = new Student()"
	code = temp.join '\n'
	CoffeeScript.compile code, { bare : true }