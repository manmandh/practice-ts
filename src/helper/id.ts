function randomID(): string {
  const idLength = 8;
  let randomID = "";
  for (let i = 0; i < idLength; i++) {
    randomID += Math.floor(Math.random() * 10);
  }
  return randomID;
}

export default randomID;
