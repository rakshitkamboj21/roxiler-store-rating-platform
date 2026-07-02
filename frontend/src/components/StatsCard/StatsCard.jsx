import { motion } from "framer-motion";

import "./StatsCard.css";

function StatsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      className="stats-card"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
    >
      <div
        className="stats-icon"
        style={{
          background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        }}
      >
        {icon}
      </div>

      <div className="stats-info">

        <h2>
          {typeof value === "number" ? (
            value
          ) : (
            <span className="text-value">
              {value}
            </span>
          )}
        </h2>

        <p>{title}</p>

      </div>
    </motion.div>
  );
}

export default StatsCard;