import { faker } from "@faker-js/faker"

const tagsFiltrables = ["deporte","cocina","ambiente","educacion","formal","casual","barato"]

function getRandomDeArray(array){
  const indice = Math.floor(Math.random() * array.length)
    return array[indice]
}

function getMocks(cant = 5){
  const mocks = []
  for (let i = 0; i < cant; i++) {
    mocks.push({
      titulo: faker.commerce.productName(),
      precio: faker.random.numeric(4),
      thumbnail: faker.image.imageUrl(),
      tags: [getRandomDeArray(tagsFiltrables)],
    })
  }
  return mocks
}

export const prodService = {
  getMocks,
  tagsFiltrables
}