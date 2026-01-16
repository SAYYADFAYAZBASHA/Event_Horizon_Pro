import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  Package,
  Palette,
  MessageSquare,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { ProductCard } from "@/components/ProductCard";
import { DecorationCard } from "@/components/DecorationCard";
import { Timeline } from "@/components/Timeline";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { events, getCategoryColor, formatDate } from "@/lib/data";

const EventDetails = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          src={event.coverImage}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-6 left-6"
        >
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:neon-glow transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Event Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="container mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(
                event.category
              )} mb-4`}
            >
              {event.category}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl lg:text-5xl font-display font-bold mb-4"
            >
              {event.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>{event.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-2xl lg:text-3xl font-display font-bold mb-4">
              About This Event
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {event.fullDescription}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-16">
              {/* Budget Section */}
              <BudgetCalculator budget={event.budget} />

              {/* Products Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                    <Package className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      Products & Items
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Everything you need for a perfect event
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {event.products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Decoration Layouts */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-secondary to-primary">
                    <Palette className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      Decoration Layouts
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Stunning designs for every space
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.decorationLayouts.map((layout, index) => (
                    <DecorationCard
                      key={layout.id}
                      layout={layout}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-neon-tertiary to-primary">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      Event Timeline
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Your day, perfectly planned
                    </p>
                  </div>
                </div>

                <Timeline items={event.timeline} />
              </motion.div>

              {/* Testimonials */}
              {event.testimonials.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold">
                        Testimonials
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        What our clients say
                      </p>
                    </div>
                  </div>

                  <TestimonialSlider testimonials={event.testimonials} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetails;
