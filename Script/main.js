window.onload = function () {

	const http = new XMLHttpRequest()

	const sky = document.querySelectorAll('.sky,.skyBack')
	const rainDrop = document.querySelectorAll('.rainDrop')
	const snowFlake = document.querySelectorAll('.snowFlake')
	const sun = document.querySelector('.sun')
	const moon = document.querySelector('.moon')
	const mercury = document.querySelector('.mercury')
	const stars = document.querySelector('.stars')
	const plants = document.querySelector('.plants')
	const forest = document.querySelector('.forest')
	const groundBack = document.querySelector('.groundBack')
	const gardenGrass = document.querySelector('.gardenGrass')
	const normalClouds = document.querySelector('.normalClouds')
	const rainClouds = document.querySelector('.rainClouds')
	const plant1 = document.querySelector('.plant1')
	const plant5 = document.querySelector('.plant5')
	const plant7 = document.querySelector('.plant7')

	let summer = true
	let winter = false
	let humidity = 50
	let temperature = 25

	function selectAction() {
		if (temperature < 16){
			if(!winter)
			summer = false
			summerToWinter()
			if (humidity >= 75) setTimeout(winterToSnow,48000)
		} else if(!summer) {
			winter = false
			winterToSummer()
			if (humidity > 75) setTimeout(summerToRain, 48000)
		}
	}

	function summerToWinter() {
		winter = true
		sky[0].classList.remove('summerSkyAnimation')
		sky[1].classList.remove('summerSkyAnimation')
		sky[0].classList.add('winterSkyAnimation')
		sky[1].classList.add('winterSkyAnimation')
		sun.classList.remove('summerSunAnimation')
		sun.classList.add('winterSunAnimation')
		moon.classList.remove('summerMoonAnimation')
		moon.classList.add('winterMoonAnimation')
		mercury.classList.remove('summerMercuryAnimation')
		mercury.classList.add('mercurySummerToWinter')
		setTimeout(function(){
			mercury.classList.remove('mercurySummerToWinter')
			mercury.classList.add('winterMercuryAnimation')
		},500)
		stars.classList.remove('summerStars')
		stars.classList.add('winterStars')
		plants.classList.remove('summerPlants')
		plants.classList.add('winterPlants')
		setTimeout(function(){
			plant1.classList.add('plantHidden')
			plant5.classList.add('plantHidden')
			plant7.classList.add('plantHidden')
		},20000)
	}

	function winterToSummer() {
		summer = true
		sky[0].classList.remove('winterSkyAnimation')
		sky[1].classList.remove('winterSkyAnimation')
		sky[1].classList.add('summerSkyAnimation')
		sky[0].classList.add('summerSkyAnimation')
		sun.classList.remove('winterSunAnimation')
		sun.classList.add('summerSunAnimation')
		moon.classList.remove('winterMoonAnimation')
		moon.classList.add('summerMoonAnimation')
		mercury.classList.remove('winterMercuryAnimation')
		mercury.classList.add('mercuryWinterToSummer')
		setTimeout(function(){
			mercury.classList.remove('mercuryWinterToSummer')
			mercury.classList.add('summerMercuryAnimation')
		},500)
		stars.classList.remove('winterStars')
		stars.classList.add('summerStars')
		plants.classList.remove('winterPlants')
		plants.classList.add('summerPlants')
		forest.classList.remove('winterForest')
		forest.classList.add('summerForest')
		groundBack.style.backgroundColor = '#9AFE2E'
		gardenGrass.style.backgroundColor = 'green'
		setTimeout(function(){
			plant1.classList.remove('plantHidden')
			plant5.classList.remove('plantHidden')
			plant7.classList.remove('plantHidden')
		},20000)
	}

	function summerToRain() {
		normalClouds.classList.add('normalCloudsRain')
		sky[0].classList.remove('summerSkyAnimation')
		sky[1].classList.remove('summerSkyAnimation')
		sky[1].classList.add('rainSkyAnimation')
		sky[0].classList.add('rainSkyAnimation')
		rainClouds.classList.add('rainCloudsAppear')
		for(let i = 0; i < rainDrop.length; i++) {
			rainDrop[i].classList.remove('rainDropHidden')
			rainDrop[i].classList.add('rainDropAppear')
		}
		setTimeout(rainToSummer,96000)
	}

	function rainToSummer() {
		normalClouds.classList.remove('normalCloudsRain')
		sky[1].classList.remove('rainSkyAnimation')
		sky[0].classList.remove('rainSkyAnimation')
		sky[0].classList.add('summerSkyAnimation')
		sky[1].classList.add('summerSkyAnimation')
		rainClouds.classList.remove('rainCloudsAppear')
		for(let i = 0; i < rainDrop.length; i++) {
			rainDrop[i].classList.remove('rainDropAppear')
			rainDrop[i].classList.add('rainDropHidden')
		}
	}

	function winterToSnow() {
		normalClouds.classList.add('normalCloudsRain')
		sky[0].classList.remove('winterSkyAnimation')
		sky[1].classList.remove('winterSkyAnimation')
		sky[1].classList.add('snowSkyAnimation')
		sky[0].classList.add('snowSkyAnimation')
		rainClouds.classList.add('rainCloudsAppear')
		for(let i = 0; i < snowFlake.length; i++) {
			snowFlake[i].classList.remove('snowFlakeHidden')
			snowFlake[i].classList.add('.snowFlakeAppear')
		}
		setTimeout(function(){
			forest.classList.remove('summerForest')		
			forest.classList.add('winterForest')
			groundBack.style.backgroundColor = 'white'
			gardenGrass.style.backgroundColor = 'white'			
		},30000)
		setTimeout(snowToWinter,96000)
	}

	function snowToWinter() {
		normalClouds.classList.remove('normalCloudsRain')
		sky[1].classList.remove('snowSkyAnimation')
		sky[0].classList.remove('snowSkyAnimation')
		sky[0].classList.add('winterSkyAnimation')
		sky[1].classList.add('winterSkyAnimation')
		rainClouds.classList.remove('rainCloudsAppear')
		for(let i = 0; i < snowFlake.length; i++) {
			snowFlake[i].classList.remove('.snowFlakeAppear')
			snowFlake[i].classList.add('snowFlakeHidden')
		}
	}

	function getWeatherInfo() {
		http.open('GET', 'https://api.weatherapi.com/v1/current.json?key=de67ace33292425db51201946202007&q=buenos aires')
		http.send()
		http.onreadystatechange = function() {
			if (http.responseText === '') return
			const respuesta = JSON.parse(http.responseText)
			humidity = respuesta.current.humidity
			temperature = respuesta.current.temp_c
		}
	}

	sun.addEventListener('animationiteration', selectAction)

	getWeatherInfo()
	setInterval(getWeatherInfo,96000)
}

