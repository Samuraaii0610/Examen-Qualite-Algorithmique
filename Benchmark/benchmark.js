class Benchmark {
    constructor(iterations) {
      this.iterations = iterations;
      this.tests = [];
    }
  
    add(func, params) {
      this.tests.push({ func, params });
    }
  
    async execute() {
      const executionTimes = [];
  
      for (const { func, params } of this.tests) {
        const timeResults = [];
  
        for (let i = 0; i < this.iterations; i++) {
          const time = await this._measureTime(func, params);
          timeResults.push(time);
        }
  
        const avgTime = this._calculateAverage(timeResults);
        executionTimes.push({ funcName: func.name, avgTime });
      }
  
      this._displayResults(executionTimes);
    }
  
    _measureTime(func, params) {
      const start = performance.now();
      func(...params);
      const end = performance.now();
      return end - start;
    }
  
    _calculateAverage(times) {
      const totalTime = times.reduce((acc, curr) => acc + curr, 0);
      return totalTime / times.length;
    }
  
    _displayResults(times) {
      console.log("\nTests exécutés :");
  
      times.forEach(({ funcName, avgTime }) => {
        console.log(`${funcName}: ${avgTime.toFixed(4)} ms`);
      });
  
      const sortedTimes = [...times].sort((a, b) => a.avgTime - b.avgTime);
      const fastest = sortedTimes[0];
      const slowest = sortedTimes[sortedTimes.length - 1];
  
      console.log(`\nFonction la plus rapide : ${fastest.funcName} (${fastest.avgTime.toFixed(4)} ms)`);
      console.log(`Fonction la plus lente : ${slowest.funcName} (${slowest.avgTime.toFixed(4)} ms)`);
    }
  }
  
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
  
  // Création de l'instance de Benchmark
  const benchmark = new Benchmark(10); // 10 itérations pour un test plus rapide
  
  // Création des données
  console.log("Creating data");
  const array = [];
  for (let index = 0; index < 100000; index++) {
    array[index] = index;
  }
  console.log("Creating data done");
  
  // Ajout des fonctions à tester
  benchmark.add(containsDuplicate, [array]);
  benchmark.add(containsDuplicateOptimize, [array]);
  
  // Lancer les tests
  benchmark.execute();

  module.exports = { Benchmark };
  