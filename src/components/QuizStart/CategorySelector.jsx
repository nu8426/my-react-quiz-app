import React, { useEffect, useState } from 'react'

const CategorySelector = ({ settings, setSettings }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://opentdb.com/api_category.php')
        const data = await res.json()
        setCategories(data.trivia_categories)
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    setSettings({ ...settings, category: e.target.value })
  }

  return (
    <div>
      <label htmlFor="category">Choose Category:</label>
      <select id="category" value={settings.category} onChange={handleChange}>
        <option value="">Any Category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategorySelector
