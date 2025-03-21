import fishpic from '../assets/placeholder.png';
function Categories() {
  return (
    <section className="categories">
      <h2>Popularne kategorie</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <a key={category.name} href="#" className="category">
            <img src={fishpic} alt={category.name} width={50} height={50} />
            <span>{category.name}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

const categories = [
  { name: "Odzież"},
  { name: "Kołowrotki"},
  { name: "Przynęty"},
  { name: "Wędki"},
  { name: "Żyłki"},
  { name: "Haczyki"},
]

export default Categories

