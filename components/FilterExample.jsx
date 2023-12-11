import React, { useState, useEffect } from 'react';

const ExampleFilterComponent = () => {
  const exampleArray = [
    { name: 'Item 1', category: 'A', price: 20 },
    { name: 'Item 2', category: 'B', price: 30 },
    { name: 'Item 3', category: 'A', price: 25 },
    { name: 'Item 4', category: 'C', price: 40 },
    { name: 'Item 5', category: 'B', price: 35 },
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [filteredArray, setFilteredArray] = useState(exampleArray);

  useEffect(() => {
    // Filter the array based on selectedCategory and selectedPriceRange
    const filteredItems = exampleArray.filter(item => {
      const categoryCondition =
        selectedCategory === 'All' || item.category === selectedCategory;
      const priceCondition =
        selectedPriceRange === 'All' ||
        (selectedPriceRange === 'Low' && item.price <= 30) ||
        (selectedPriceRange === 'High' && item.price > 30);

      return categoryCondition && priceCondition;
    });

    setFilteredArray(filteredItems);
  }, [selectedCategory, selectedPriceRange]);

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceRangeChange = e => {
    setSelectedPriceRange(e.target.value);
  };

  return (
    <div>
      <label>
        Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="A">Category A</option>
          <option value="B">Category B</option>
          <option value="C">Category C</option>
        </select>
      </label>
      <label>
        Price Range:
        <select value={selectedPriceRange} onChange={handlePriceRangeChange}>
          <option value="All">All</option>
          <option value="Low">Low (&#x2264; $30)</option>
            <option value="High">High (&gt; $30)</option>
        </select>
      </label>
      <ul>
        {filteredArray.map((item, index) => (
          <li key={index}>
            {item.name} - Category: {item.category}, Price: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleFilterComponent;
