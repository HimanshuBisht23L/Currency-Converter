const flagURL = 'https://flagsapi.com/BE/flat/64.png'
const url = 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'ba39d4881amsh72b882f10ba1585p153e32jsn20878c51ddce',
		'x-rapidapi-host': 'currency-conversion-and-exchange-rates.p.rapidapi.com'
	}
};

let amount = document.querySelector(".amount input")
let button = document.querySelector(".convert-btn")
let output = document.querySelector(".output")
let tovalue = document.querySelector(".select-to-code select")
let fromvalue = document.querySelector(".select-from-code select")
const selects = document.querySelectorAll("select")

for (let element of selects) {
	for (let key in countryList) {
		let option = document.createElement("option")
		option.innerText = key;
		element.append(option)
	}

	element.addEventListener("change", (event) => {
		let currencycode = event.target.value
		let countrycode = countryList[currencycode]
		element.parentElement.querySelector("img").src = `https://flagsapi.com/${countrycode}/flat/64.png`
	})
}

button.addEventListener("click", async (event) => {
	event.preventDefault()
	if (amount.value < 1 || amount.value === "") {
		amount.value = 1;
	}

	let newurl = url + `from=${fromvalue.value}&to=${tovalue.value}&amount=${amount.value}`
	let response = await fetch(newurl, options)
	let data = await response.json()
	let answer = data.result;
	output.innerText = `${amount.value} ${fromvalue.value} = ${answer} ${tovalue.value}`
})

async function initialFunc() {
	let newurl = url + `from=USD&to=INR&amount=1`
	let response = await fetch(newurl, options)
	let data = await response.json()
	let answer = data.result;
	output.innerText = `1 USD = ${answer} INR`
	i++;
}

let i = 0;
if (i === 0) {
	fromvalue.value = "USD"
	document.querySelector(".from img").src = `https://flagsapi.com/US/flat/64.png`
	tovalue.value = "INR"
	document.querySelector(".to img").src = `https://flagsapi.com/IN/flat/64.png`
	initialFunc()
}