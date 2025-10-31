interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  onClick: () => void;
}

export default function ProductCard({ name, price, image, category, onClick }: ProductCardProps) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image-container">
        <img src={image} alt={name} className="product-image" />
        <div className="product-overlay">
          <button className="quick-view-button">View Details</button>
        </div>
      </div>
      <div className="product-info">
        <p className="product-category">{category}</p>
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
      </div>
    </div>
  );
}
