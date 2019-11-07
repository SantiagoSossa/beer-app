import beers from "../assets/beers.json";

const findRandomBeer = () => {
    const randomBeer = beers[Math.floor(Math.random() * beers.length)];
    return {
        id: randomBeer.id,
        name: randomBeer.name,
        image: randomBeer.image,
        country: randomBeer.country,
        alcoholRate: randomBeer.alcoholRate,
        ibu: randomBeer.ibu,
        rating: randomBeer.rating,
    }
}

export default findRandomBeer;