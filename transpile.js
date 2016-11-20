function assert(a,b) {
  if (a!=b) {
    console.log(a + " != " + b)
  }
}

function tabcount(s) {
  var i=0;
  while (s[i]=='\t') i+=1
  return i
}

function spacesToTabs(line) {
  if (line.indexOf('  ')==0) return '\t' + spacesToTabs(line.substring(2))
  if (line.indexOf('\t')==0) return '\t' + spacesToTabs(line.substring(1))
  if (line.indexOf(' \t')==0) return '\t' + spacesToTabs(line.substring(2))
  return line
}  
assert(spacesToTabs('    '),'\t\t')
assert(spacesToTabs('\t  '),'\t\t')
assert(spacesToTabs('  \t'),'\t\t')
assert(spacesToTabs(' \t  '),'\t\t')

// tar bort alla blanka, tabbar och kommentarer
function clean(s) {
  s = s.split(' ').join("")
  s = s.split('\t').join("")
  var pos = s.indexOf("#")
  if (pos>=0) s = s.substr(0,pos)
  return s
}

function transpile(code) {
  var lines = code.split('\n')
  if (lines[0].indexOf('//ECMA') == 0) return code
  var temp = []
  for (var line of lines) {
    line = spacesToTabs(line)
    tabs = tabcount(line)
    if (clean(line).length > 0) {
      temp.push(line)
    }
  } 
  code = temp.join('\n')
  return CoffeeScript.compile(code, { bare : true })
}