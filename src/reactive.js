const unreact = document.querySelectorAll.bind(document)
 
document.addEventListener('DOMContentLoaded', function () {
unreact('[reactive]').forEach(el => {
    const key = el.attributes['reactive'].value
    if (!window[key]) window[key] = { elements: [], proxy: null }
    window[key].elements.push(el)
    window[key].proxy = new Proxy({ value: el.innerText }, {
    set(obj, prop, value) {
        window[key].elements.forEach(el => el.innerHTML = value)
        return true
    }
    })
})
})

window.render = (key, value) => window[key].proxy.value = value

// change element on API cal
setInterval(() => {    
fetch('https://catfact.ninja/fact')
    .then(res => res.json())
    .then(res => render('paragraph', res.fact))
}, 5000)
