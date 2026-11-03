(() => {
  const storageKey = "iyaMozzedatProducts";
  const defaults = [
    { id: "indomie-egg", name: "Indomie & Egg", price: 1200, category: "Food", detail: "One plate", image: "indomie.png" },
    { id: "bread-egg", name: "Bread & Egg", price: 1000, category: "Food", detail: "Medium size", image: "bread and egg.png" },
    { id: "beans-bread", name: "Beans & Bread", price: 1200, category: "Food", detail: "Medium size", image: "breadand beans.png" },
    { id: "pepsi", name: "Pepsi", price: 500, category: "Drinks", detail: "Per bottle", image: "pepsi.png" },
    { id: "fanta", name: "Fanta", price: 500, category: "Drinks", detail: "Per bottle", image: "fantas.png" },
    { id: "coke", name: "Coke", price: 500, category: "Drinks", detail: "Per bottle", image: "coke.png" },
    { id: "eva-water", name: "Eva Water", price: 300, category: "Drinks", detail: "Per bottle", image: "Eva.png" },
    { id: "trophy", name: "Trophy", price: 800, category: "Drinks", detail: "Per bottle", image: "throphy.png" }
  ];

  function getProducts() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) return defaults.map((product) => ({ ...product }));
      const products = JSON.parse(saved);
      return Array.isArray(products) ? products : defaults.map((product) => ({ ...product }));
    } catch (error) {
      return defaults.map((product) => ({ ...product }));
    }
  }

  function saveProducts(products) {
    localStorage.setItem(storageKey, JSON.stringify(products));
  }

  window.IyaProducts = { getProducts, saveProducts };
})();