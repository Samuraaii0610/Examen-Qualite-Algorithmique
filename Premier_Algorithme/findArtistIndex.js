function findArtistIndex(artists, name) {
  for (let i = 0; i < artists.length; i++) {
    if (artists[i].name === name) {
      return artists[i].id;
    }
  }
  return -1;
}

function findArtistIndexOptimized(artists, name) {
  let low = 0;                    // Index de début
  let high = artists.length - 1;  // Index de fin

  // Tant qu'il reste une zone à explorer
  while (low <= high) {
    // Calcul de l'index du milieu
    const mid = Math.floor((low + high) / 2);

    // Si on trouve l'artiste recherché, on retourne son ID
    if (artists[mid].name === name) {
      return artists[mid].id;
    } 
    // Si le nom de l'artiste du milieu est alphabétiquement avant le nom recherché
    else if (artists[mid].name < name) {
      // On cherche dans la moitié droite
      low = mid + 1;
    } 
    // Si le nom de l'artiste du milieu est alphabétiquement après le nom recherché
    else {
      // On cherche dans la moitié gauche
      high = mid - 1;
    }
  }
  
  // Si l'artiste n'est pas trouvé, on retourne -1
  return -1;
}


// Génération d'une grande liste d'artistes
const generateArtists = (count) => {
  const artists = [];
  for (let i = 0; i < count; i++) {
    artists.push({
      id: i,
      name: `Artist${i}`
    });
  }
  return artists;
};

// Création d'une liste de 10 000 000 d'artistes
const artists = generateArtists(10000000);

console.log("Dummy");
// Choisir un nom d'artiste à rechercher
const testName = "Artist9999999";
const start = performance.now();
const result = findArtistIndex(artists, testName);
const end = performance.now();

console.log(`Résultat: ${result}`);
console.log(`Temps d'exécution: ${(end - start).toFixed(5)} ms`);

console.log("Optimized");

const startOptimized = performance.now();
const resultOptimized = findArtistIndexOptimized(artists, testName);
const endOptimized = performance.now();

console.log(`Résultat: ${resultOptimized}`);
console.log(`Temps d'exécution: ${(endOptimized - startOptimized).toFixed(5)} ms`);