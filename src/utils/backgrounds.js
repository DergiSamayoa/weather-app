const backgrounds = (icon) => {
    let image = ""
    if (icon === null) {
    image = "bg-[url('/images/background-light.svg')]"
    } else if (icon === "01d" || icon === "02d") {
    image = "bg-[url('/images/day.jpg')]"
    } else if (icon === "01n" || icon === "02n") {
    image = "bg-[url('/images/night.webp')]"
    } else if (icon === "03d" || icon === "04d") {
    image = "bg-[url('/images/cloudy-day.jpg')]"
    } else if (icon === "03n" || icon === "04n") {
    image = "bg-[url('/images/cloudy-night.jpg')]"
    } else if (icon === "09d" || icon === "10d") {
    image = "bg-[url('/images/rainy-day.webp')]"
    } else if (icon === "09n" || icon === "10n") {
    image = "bg-[url('/images/rainy-night.webp')]"
    } else if (icon === "11d") {
    image = "bg-[url('/images/stormy-day.webp')]"
    } else if (icon === "11n") {
    image = "bg-[url('/images/stormy-night.webp')]"
    } else if (icon === "13d") {
    image = "bg-[url('/images/snowy-day.webp')]"
    } else if (icon === "13n") {
    image = "bg-[url('/images/snowy-night.webp')]"
    } else if (icon === "50d") {
    image = "bg-[url('/images/foggy-day.jpg')]"
    } else {
    image = "bg-[url('/images/foggy-night.jpg')]"
    }
    // console.log(icon)
    return image
}  
export default backgrounds



