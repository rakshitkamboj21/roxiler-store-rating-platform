import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { motion } from "framer-motion";

import "./Chart.css";

function Chart({
  totalUsers = 0,
  totalStores = 0,
  totalRatings = 0,
  averageRating = 0,
  owner = false,
}) {

  const data = owner
    ? [
        {
          name: "Customers",
          value: totalUsers,
          gradient: "users",
        },
        {
          name: "Reviews",
          value: totalRatings,
          gradient: "ratings",
        },
        {
          name: "Avg Rating",
          value: averageRating,
          gradient: "average",
        },
      ]
    : [
        {
          name: "Users",
          value: totalUsers,
          gradient: "users",
        },
        {
          name: "Stores",
          value: totalStores,
          gradient: "stores",
        },
        {
          name: "Ratings",
          value: totalRatings,
          gradient: "ratings",
        },
        {
          name: "Avg",
          value: averageRating,
          gradient: "average",
        },
      ];

  return (
    <motion.div
      className="chart-card"
      initial={{
        opacity: 0,
        x: 40,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <div className="chart-header">

        <div>

          <h2>
            {owner
              ? "Store Performance"
              : "Dashboard Analytics"}
          </h2>

          <p>
            {owner
              ? "Store Insights"
              : "Live Statistics"}
          </p>

        </div>

        <div className="chart-live">
          Live
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <BarChart data={data}>

          <defs>

            <linearGradient
              id="users"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2563EB"
              />
              <stop
                offset="100%"
                stopColor="#60A5FA"
              />
            </linearGradient>

            <linearGradient
              id="stores"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#10B981"
              />
              <stop
                offset="100%"
                stopColor="#34D399"
              />
            </linearGradient>

            <linearGradient
              id="ratings"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#F59E0B"
              />
              <stop
                offset="100%"
                stopColor="#FBBF24"
              />
            </linearGradient>

            <linearGradient
              id="average"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#8B5CF6"
              />
              <stop
                offset="100%"
                stopColor="#A78BFA"
              />
            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#E5E7EB"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              fill: "#EEF4FF",
            }}
            contentStyle={{
              borderRadius: "14px",
              border: "none",
              boxShadow:
                "0 12px 30px rgba(0,0,0,.12)",
              background: "#fff",
              padding: "12px",
            }}
          />

          <Bar
            dataKey="value"
            radius={[12, 12, 0, 0]}
            animationDuration={1600}
            animationEasing="ease-out"
            activeBar={{
              fillOpacity: 0.9,
            }}
          >
            {data.map((item, index) => (
              <Cell
                key={index}
                fill={`url(#${item.gradient})`}
              />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </motion.div>
  );
}

export default Chart;