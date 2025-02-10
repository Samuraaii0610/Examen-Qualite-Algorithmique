const { Benchmark } = require('./benchmark');

// Définition des fonctions à tester
function containsDuplicate(array) {
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                return true;
            }
        }
    }
    return false;
}

function containsDuplicateOptimize(array) {
    const set = new Set();
    for (let num of array) {
        if (set.has(num)) {
            return true;
        }
        set.add(num);
    }
    return false;
}

// Création d'un tableau de test avec des doublons
const testArray = Array.from({ length: 1000000 }, (_, i) => i % 100); // Crée un tableau de 1000 éléments avec des doublons

// Création de l'instance de Benchmark
const benchmark = new Benchmark(100);

// Ajouter les fonctions avec le même tableau de test
benchmark.add(containsDuplicate, [testArray]);
benchmark.add(containsDuplicateOptimize, [testArray]);

// Lancer les tests
benchmark.execute();