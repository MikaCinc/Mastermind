window.onload = function() {
	// Pravila
	document.getElementById("pravila").addEventListener("mouseover", function() {
		document.getElementById("pravila_div").style.display = "block"
	})
	document.getElementById("pravila").addEventListener("mouseout", function() {
		document.getElementById("pravila_div").style.display = "none"
	})
	// Animiramo naslov
	var s = document.getElementById('naslov').innerHTML
	var a = "> Mastermind:"
	var b = "< Mastermind."
	var interval = setInterval (function() {
		s = a
		var timeout = setTimeout (function() {
			s = b
			document.getElementById('naslov').innerHTML = s
		}, 500)
		document.getElementById('naslov').innerHTML = s
	}, 1000)
	// ovde animiramo mikac_inc
	var ani = "mikac_inc"
	var i = 0
	var interval2 = setInterval(function() {
			document.getElementById("mikac_inc_span").appendChild(document.createTextNode(ani[i]))
			i+=1
			if(i>ani.length){
				document.getElementById("mikac_inc_span").innerHTML = ""
				i = 0
			}
	}, 500)
	// Bitne varijable
	nBr = parseInt(document.getElementById("nBrojeva").value)
	nR = parseInt(document.getElementById("nRedova").value)
	nK = parseInt(document.getElementById("nKolona").value)
	nBrojeva(nBr)
	nRedova(nR)
	nKolona(nK)
}

function nBrojeva(value) {
	document.getElementById("nBrojeva_span").innerHTML = value
	nBr = parseInt(value)
}

function nRedova(value) {
	document.getElementById("nRedova_span").innerHTML = value
	nR = parseInt(value)
}

function nKolona(value) {
	document.getElementById("nKolona_span").innerHTML = value
	nK = parseInt(value)
}

function table_visibility(n) {
	var table = document.getElementById("table")
	var trs = table.childNodes
	console.log(trs[1].childNodes[0])
	var k = n-1
	var vreme = document.getElementById("vreme_za_uklanjanje").value*1000
	for(var i=0; i<trs.length; i++){
		if(document.getElementById("aktuelni_red").checked == false) {
			if(i<=n){
				for(var a=0; a<trs[i].childNodes.length; a++){
					trs[i].childNodes[a].style.visibility = "visible"
				}
			} else {
				for(var a=0; a<trs[i].childNodes.length; a++){
					trs[i].childNodes[a].style.visibility = "hidden"
				}
			}
		} else {
			if(i==n || i==k){
				for(var a=0; a<trs[i].childNodes.length; a++){
					trs[i].childNodes[a].style.visibility = "visible"
				}
				setTimeout(function(){
					for(var a=0; a<trs[k].childNodes.length; a++){
						trs[k].childNodes[a].style.visibility = "hidden"
					}
				}, vreme)
			} else {
				for(var a=0; a<trs[i].childNodes.length; a++){
					trs[i].childNodes[a].style.visibility = "hidden"
				}
			}
		}	
	}
}

function zadata_kombinacija(n) {
	var arr = []
	for(var i=0; i<n; i++){
		var iarr = []
		iarr.push(Math.floor(Math.random()*nBr +1))
		iarr.push(false)
		iarr.push(false)
		arr.push(iarr)
	}
	return arr;
}

function miniTabela() {
	// Jednostavnije sa Spanovima
	var p = document.createElement(p)
	for(var i=0; i<nBr; i++){
		var span = document.createElement("span")
		span.innerHTML = i+1
		span.onclick = function() {
			//console.log(this.innerHTML)
			this.parentElement.parentElement.innerHTML = this.innerHTML
		}
		span.className = "brojevi_span"
		p.appendChild(span)
	}
	return p;
}

var nBr, nR, nK, cpu, cpu1

var nm = 0; // Na mestu
var nnm = 0; // Nisu na mestu
var interval;

function create_cpu1() {
	var arr = []
	for(var i=0; i<cpu.length; i++){
		arr.push(cpu[i][0])
	}
	return arr
}
var user = []
var user1 = function() {
	var arr = []
	for(var i=0; i<user.length; i++){
		arr.push(user[i][0])
	}
	return arr
}

function novo() {
	if(vreme_isk_uk()) {
		vreme()
	}
	var table_V = 0;
	cpu = zadata_kombinacija(nK)
	cpu1 = create_cpu1()
	document.getElementById("table").style.display = "block"
	document.getElementById("settings").style.display = "none"
	console.log(cpu)
	console.log(cpu1)
	for(var i=0; i<nR; i++){
		var tr = document.createElement("tr")
		for(var e = 0; e<nK+1; e++){
			var td = document.createElement("td")
			if(e<nK){
				td.appendChild(miniTabela()) 
			} else {
				td.className = "poslednji_td"
				var btn_reset = document.createElement("button")
				btn_reset.innerHTML = "Ponovo izaberi"
				btn_reset.className = "button_orange"
				btn_reset.onclick = function() {
					var nodes = this.parentElement.parentElement.childNodes
					for(var l = 0; l<nodes.length-1; l++){
						nodes[l].innerHTML = ""
						nodes[l].appendChild(miniTabela())
					}
				}
				var btn = document.createElement("button")
				btn.innerHTML = "Potvrdi"
				btn.className = "button_cyan"
				btn.onclick = function (){
					var nodes = this.parentElement.parentElement.childNodes
					//console.log(nodes.length-1)
					var all = 0; // Da li su svi selektovani
					for(var l = 0; l<nodes.length-1; l++){
						if(nodes[l].innerHTML.length == 1){
							var iarr = []
							iarr.push(parseInt(nodes[l].innerHTML))
							iarr.push(false)
							user.push(iarr)
						}
					}
					for(var g = 0; g<nodes.length-1; g++){
						if(nodes[g].innerHTML.length == 1){
							all += 1
							//user.push(parseInt(nodes[g].innerHTML))
							provera_nm(nodes[g].innerHTML, g)
							console.log("user: " + user)
							console.log("cpu: " + cpu)

						} else {
							var h = g+1
							alert("Nisi izabrao broj u " + h + ". polju!")
						}
						//console.log(nodes[g].innerHTML.length)
					}
					provera_nnm()
					if(all == nK){
						// console.log("sva 4")
						// Pojavi se broj tačnih/netačnih
						this.parentElement.innerHTML = "<span class='nm'>Na mestu: </span>" + nm + "<br>" + "<span class='nnm'>Nisu na mestu: </span>" + nnm;
						table_V += 1;
						table_visibility(table_V)
						nm = 0
						nnm = 0
						user = []
						cpu = []
						console.log(cpu1)
						for(var u=0; u<cpu1.length; u++){
							var arr = []
							arr.push(cpu1[u])
							arr.push(false)
							arr.push(false)
							cpu.push(arr)
							console.log("CPU REGENERISAN")
						}
					} else {
						nm = 0
						nnm = 0
						user = []
						cpu = []
						for(var u=0; u<cpu1.length; u++){
							var arr = []
							arr.push(cpu1[u])
							arr.push(false)
							arr.push(false)
							cpu.push(arr)
							console.log("CPU REGENERISAN")
						}
					}
				}
				
				td.appendChild(btn)
				td.appendChild(btn_reset)
			}
			
			tr.appendChild(td)
		}
		document.getElementById('table').appendChild(tr)
	}
	table_visibility(table_V)
}

function getAllIndexes(n, arr) {
	var indexes = []
	for(var b = 0; b<arr.length; b++){
		if(arr[b][0]/*[0] sam dodao zbog strukture CPU array-a*/ === parseInt(n)){
			indexes.push(b);
		}
	}
	return indexes;
}

// Potrebna su dva FLAG-a za cpu array, jedan za pogođene, jedan za nisu na svom mestu

function provera_nm(n, g) {
	//n je selektovani broj ===> String, mora da se pretvori u Integer pre testiranja :)
	//g je njegovo mesto (redni broj td-a u kome se nalazi)
	//cpu je zadata kombinacija
	//console.log(n + " / " + g + " / " + cpu )
	var mesta = getAllIndexes(n, cpu) // sva mesta u cpu array gde se nalazi n
	//var mesta_user = getAllIndexes(n, user) // da li je ovo potrebno?
	console.log("mesta_cpu: " + mesta)
	var position = cpu1.indexOf(parseInt(n)) // da li n postoji u cpu arrayu
	if(position != -1){
		if(mesta.indexOf(parseInt(g)) != -1 && cpu[parseInt(g)][1] == false){
			cpu[parseInt(g)][1] = true
			cpu[parseInt(g)][2] = true
			user[parseInt(g)][1] = true
			console.log("nm += 1")
			nm += 1			
		}
	}
}

function provera_nnm(){
	//console.log("-------Prešli smo na nnm:-------")
	for(var g=0; g<user.length; g++){
		if(user[g][1] == false){
			var n = user[g][0]
			var mesta = getAllIndexes(n, cpu) // sva mesta u cpu array gde se nalazi n
			//var mesta_user = getAllIndexes(n, user) // da li je ovo potrebno?
			console.log("mesta_cpu: " + mesta)
			var nema_flag = function() {
				for(var q=0; q<mesta.length; q++){
					if(cpu[mesta[q]][2] == false){
						return true
					}
				}
			}
			var position = cpu1.indexOf(parseInt(n)) // da li n postoji u cpu arrayu
			if(position != -1){
				if (mesta.indexOf(parseInt(g)) == -1 && nema_flag() == true	/* i ako postoji neki član u cpu[-mesta-] nizu koji nema flag */){
					console.log("nnm += 1")
					nnm += 1
					// i jednom od cpu[-mesta-] elemenata da setuje flag:
					for(var d=0; d<mesta.length; d++){
						if(cpu[mesta[d]][2] == false){
							cpu[mesta[d]][2] = true
							break;
						}
					}
				}
			}
		}
	}
}

/*
[n, false, false]

*/


// Skripte za vreme:

function vreme_isk_uk(){
	var opcije = document.getElementsByName("vreme_radio")
	if(opcije[0].checked == true){
		document.getElementById("vrem_ogr_input").disabled = false
		return true
	} else {
		document.getElementById("vrem_ogr_input").disabled = true
		return false
	}
}

function vreme() {
	var value = document.getElementById("vrem_ogr_input").value
	var smanjenje = 400/value
	if(document.getElementById("child_div").style.width = "400px"){
		document.getElementById("child_div").style.background = "#0f0"
	}
	var new_width = 400 - smanjenje
	interval = setInterval(function() {
		document.getElementById("child_div").style.width = new_width + "px"
		new_width -= smanjenje
		if(new_width <= 400*75/100){
			document.getElementById("child_div").style.background = "cyan"
		}
		if(new_width <= 400*50/100){
			document.getElementById("child_div").style.background = "orange"
		}
		if(new_width <= 400*25/100){
			document.getElementById("child_div").style.background = "red"
		}
		if(document.getElementById("child_div").style.width == "0px"){
			alert("Vreme isteklo!")
			clearInterval(interval)
		}
	}, 1000)
}

// Promena sadržaja

function change(name) {
	if(name == "Nova igra") {
		document.getElementById("content").style.display = "block"
		document.getElementById("settings").style.display = "none"
		novo()
		document.getElementById("reset").disabled = false
	} else if(name == "Druga podešavanja") {
		document.getElementById("content").style.display = "none"
		document.getElementById("settings").style.display = "block"
		clearInterval(interval)
		document.getElementById("reset").disabled = true
		document.getElementById("table").innerHTML = ""
		document.getElementById("child_div").style.width = "0px"
		document.getElementById("child_div").style.background = "#0f0"
	} else if(name == "Reset") {
		clearInterval(interval)
		document.getElementById("table").innerHTML = ""
		novo()
	}
}

// mikac_inc

function mikac_inc() {
	window.open('https://www.instagram.com/mikac_inc/', '_blank');
}

// promena težine

function promena_tezine(value) {
	if(value == "Lako"){
		document.getElementById("nBrojeva").value = 4
		nBrojeva(4)
		document.getElementById("nRedova").value = 10
		nRedova(10)
		document.getElementById("nKolona").value = 4
		nKolona(4)
		document.getElementById("obelezi_polja").checked = true
		document.getElementsByName("vreme_radio")[0].checked = true
		vreme_isk_uk()
		document.getElementById("vrem_ogr_input").value = 90
		document.getElementById("aktuelni_red").checked = false
	} else if(value == "Normalno"){
		document.getElementById("nBrojeva").value = 6
		nBrojeva(6)
		document.getElementById("nRedova").value = 7
		nRedova(7)
		document.getElementById("nKolona").value = 4
		nKolona(4)
		document.getElementById("obelezi_polja").checked = false
		document.getElementsByName("vreme_radio")[0].checked = true
		vreme_isk_uk()
		document.getElementById("vrem_ogr_input").value = 90
		document.getElementById("aktuelni_red").checked = false
	} else if(value == "Teško"){
		document.getElementById("nBrojeva").value = 7
		nBrojeva(7)
		document.getElementById("nRedova").value = 8
		nRedova(8)
		document.getElementById("nKolona").value = 5
		nKolona(5)
		document.getElementById("obelezi_polja").checked = false
		document.getElementsByName("vreme_radio")[0].checked = true
		vreme_isk_uk()
		document.getElementById("vrem_ogr_input").value = 50
		document.getElementById("aktuelni_red").checked = false
	} else if(value == "Izazov"){
		document.getElementById("nBrojeva").value = 8
		nBrojeva(8)
		document.getElementById("nRedova").value = 14
		nRedova(14)
		document.getElementById("nKolona").value = 6
		nKolona(6)
		document.getElementById("obelezi_polja").checked = false
		document.getElementsByName("vreme_radio")[0].checked = true
		vreme_isk_uk()
		document.getElementById("vrem_ogr_input").value = 200
		document.getElementById("aktuelni_red").checked = true
		document.getElementById("vreme_za_uklanjanje").value = 4
	}
}

// Boja

function boja(value) {
	document.getElementsByTagName("table")[0].style.background = "linear-gradient(black 50%, " + value + ")"
}