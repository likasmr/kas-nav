import { IconContext } from "react-icons";

export default function LinkCard({ category }) {
  return (
    <div className="category-card">
      <h2 className="category-title">{category.name}</h2>
      <div className="links-container">
        {category.links.map((link) => {
          const Icon = require("react-icons/fa")[link.icon];
          return (
            <a 
              href={link.url} 
              className="link-item"
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
            >
              <IconContext.Provider value={{ className: "link-icon" }}>
                <Icon />
              </IconContext.Provider>
              <span>{link.name}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
} 