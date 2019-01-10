function generateRandoms(count, randomsLength) {
  let randoms = [];
  while (randoms.length < randomsLength) {
    let random = parseInt(Math.random() * count);
    if (!randoms.includes(random)) {
      randoms.push(random);
    }
  }
  return randoms;
}
console.log(generateRandoms(10, 5))