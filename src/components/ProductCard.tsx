import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Product, formatCurrency } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index: number;
}

const categoryColors = {
  Flowers: "from-pink-500 to-rose-500",
  Lights: "from-amber-500 to-yellow-500",
  Food: "from-orange-500 to-red-500",
  Decoration: "from-purple-500 to-indigo-500",
  Stage: "from-blue-500 to-cyan-500",
  Seating: "from-green-500 to-emerald-500",
};

export const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass rounded-xl overflow-hidden group"
    >
      <div className="relative h-40 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${
              categoryColors[product.category]
            }`}
          >
            {product.category}
          </span>
        </div>

        {/* Quantity Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm">
            Qty: {product.quantity}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h4 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <ShoppingBag className="w-4 h-4" />
            <span>per unit</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
