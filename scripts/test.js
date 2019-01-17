

String.prototype.capitalize = function(justFirst=false){
	var string = this;

	if (justFirst) {
		return string.charAt(0).toUpperCase() + string.substring(1);
	} else {
		//var arr = this.split("[^a-zA-Z0-9]")
		var arr = this.split(" ");
		for (var w in arr) {
			string = arr[w];
			arr[w] = string.charAt(0).toUpperCase() + string.substring(1);
		}
		return arr.join(" ");
	}

}




String.prototype.present = function(gender,isPlayer=false){
	var str = this;
	var genderSub =[];
	var playerSub =[];

	if (gender=="female"){
		 genderSub = [
			"!Xe",	"She",	"!xe", "she",
			"!Xis",	"Her", "!xis", "her",
			"!Xim",	"Her", "!xim", "her"];
	} else if (gender=="male") {
		 genderSub = [
			"!Xe",	"He",	"!xe", "he",
			"!Xis",	"His", "!xis", "his",
			"!Xim",	"Him", "!xim", "him"];
	} else {
		 genderSub = [
			"!Xe",	"They",	"!xe", "they",
			"!Xis",	"Their", "!xis", "their",
			"!Xim",	"Them", "!xim", "them"];
	}
	for (var s = 0; s<genderSub.length; s+=2){
		str = str.replaceAll(genderSub[s],genderSub[s+1]);
	}
	
	if (!isPlayer){
		 playerSub = [
			"You",	"They",	"you", "they",
			"Your",	"Their", "your", "their",
			"Your",	"Them", "your", "them"];

		for (var s = 0; s<playerSub.length; s+=2){
			str = str.replaceAll(playerSub[s],playerSub[s+1]);
		}
	}
	return str
}
/*
var garble = "!Xe workships multiple gods. Can't make up !xis mind, I guess. Kill !xim! !Xe killed !ximself.";
alert(garble.present())
alert(garble.present("female"))
alert(garble.present("male"))
*/



String.prototype.stringify = function(format) {

	str=this;

	if (format=="table"){
		var str = "<ul class='stats boxes thirds'><li>";
		str = str.replaceAll(',', '</li> <li>');
		str = str.replaceAll('"', '');
		str = str.replaceAll(':', ': ');
		str = str.replaceAll('{', '');
		str = str.replaceAll('}', '');
		str += "</li></ul>";
		str = str.replaceAll('<li>', '<li><span class="threequarter">');
		str = str.replaceAll(': ', '</span><span class="quarter" style="text-align:right;">');
		str = str.replaceAll('</li>', '</span></li>');
	
	} else if (format=="flat"){
		str = str.replaceAll('"', '');
		str = str.replaceAll(',', '</b>, ');
		str = str.replaceAll(':', ':<b>');
		str = str.replaceAll('{', '');
		str = str.replaceAll('}', '</b>');
	}

	return str;
}


















function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}



String.prototype.formatName = function() {
	var arr = this.split(",");
	if (arr.length > 1){
		return arr[1] + " " + arr[0];
	} else {
		return this.toString();
	}
}

function ifReal(str) {
	if (str != null){
		return str + " "
	} else {
		return ""
	}
}





function objectTable(obj, typeFilter, subtypeFilter){

	var html = "";
	var colList = [];
	var newRow = "";
	var newCell = "";
	var cssClass = "";
	
	// fill colList
	
	for (var k in obj){
		colList = colList.concat(Object.keys(obj[k]));
	}
	colList = removeDuplicates(colList);
	colList.sort();
	
	colList.delete("stats");
	colList.delete("name");
	colList.delete("id");
	
	colList.unshift("stats");
	colList.unshift("name");
	colList.unshift("id");
	

	html += "<h1>"+ifReal(typeFilter)+""+ifReal(subtypeFilter)+"table</h1>"

	//html += "<p>" + colList.join(", ") + "</p>";
	html += "<div class='maxWidth'>";
	html += "<table border='4'>";
	
	
	// header row
	
	newRow = "";
	for (var n in colList){
		newRow += "<th>"+colList[n]+"</th>";
	}
	html += "<tr>"+newRow+"</tr>";

	
	// content rows
	
	for (var k in obj){
		var item = obj[k];

		if (subtypeFilter || typeFilter){
			if (subtypeFilter && item.subtype != subtypeFilter){
				//alert(item.subtype + " is not " + subtypeFilter)
				//continue
			}
			if (typeFilter && item.type != typeFilter){
				//alert(item.type + " is not " + typeFilter)
				continue
			}
		}

		newRow = "";
		for (var n in colList){

			newCell = "";
			cssClass = "";
			
			if (item[colList[n]]){
				newCell = item[colList[n]];	
				
				if (colList[n] == "name"){
					cssClass = "name";
					// newCell = newCell.formatName(); // FORMAT THE NAME
				}
				
				if (!isNaN(newCell)){
					cssClass = "number";
					newCell = newCell.toLocaleString('en-US').toString();
				}
				if (newCell !== null && typeof newCell === 'object'){
					cssClass = "object";
					newCell = JSON.stringify(newCell).replaceAll(",",", ");
				}
				if (newCell.length > 30 && cssClass != "object"){
					cssClass = "multiline";
				}
				
			} else {
				newCell += "-";
				cssClass = "empty";
			}
			
			newRow += "<td class='"+cssClass+"'>"+newCell+"</td>";
		}
		
		html += "<tr>"+newRow+"</tr>";
	}
	
	html += "</table>";
	html += "</div>";

	return " "+html+" ";

}

