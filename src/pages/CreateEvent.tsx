import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Calendar,
  DollarSign,
  Package,
  Palette,
  Clock,
  Plus,
  Trash2,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Event, Product, DecorationLayout } from "@/lib/data";
import { ImageUpload } from "@/components/ImageUpload";

const steps = [
  { id: 1, title: "Basic Details", icon: Calendar },
  { id: 2, title: "Budget", icon: DollarSign },
  { id: 3, title: "Products", icon: Package },
  { id: 4, title: "Decorations", icon: Palette },
  { id: 5, title: "Timeline", icon: Clock },
];

const categories = [
  "Marriage",
  "Birthday",
  "Corporate",
  "Engagement",
  "Anniversary",
  "Baby Shower",
] as const;

const productCategories = [
  "Flowers",
  "Lights",
  "Food",
  "Decoration",
  "Stage",
  "Seating",
] as const;

const decorationTypes = [
  "Stage",
  "Entrance",
  "Lighting",
  "Centerpiece",
  "Theme",
] as const;

interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

interface FormData {
  name: string;
  date: string;
  category: Event["category"];
  location: string;
  description: string;
  fullDescription: string;
  coverImage: string;
  budget: {
    venue: number;
    decoration: number;
    catering: number;
    photography: number;
    miscellaneous: number;
  };
  products: Omit<Product, "id">[];
  decorationLayouts: Omit<DecorationLayout, "id">[];
  timeline: TimelineItem[];
}

const initialFormData: FormData = {
  name: "",
  date: "",
  category: "Marriage",
  location: "",
  description: "",
  fullDescription: "",
  coverImage: "",
  budget: {
    venue: 0,
    decoration: 0,
    catering: 0,
    photography: 0,
    miscellaneous: 0,
  },
  products: [],
  decorationLayouts: [],
  timeline: [],
};

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Event name is required";
      if (!formData.date) newErrors.date = "Event date is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.description.trim()) newErrors.description = "Short description is required";
      if (!formData.coverImage.trim()) newErrors.coverImage = "Cover image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // In a real app, this would save to a database
      toast({
        title: "Event Created Successfully!",
        description: `"${formData.name}" has been added to your events.`,
      });
      navigate("/events");
    }
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [
        ...formData.products,
        {
          name: "",
          image: "",
          price: 0,
          quantity: 1,
          category: "Decoration",
        },
      ],
    });
  };

  const removeProduct = (index: number) => {
    setFormData({
      ...formData,
      products: formData.products.filter((_, i) => i !== index),
    });
  };

  const updateProduct = (index: number, field: keyof Omit<Product, "id">, value: string | number) => {
    const updatedProducts = [...formData.products];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    setFormData({ ...formData, products: updatedProducts });
  };

  const addDecoration = () => {
    setFormData({
      ...formData,
      decorationLayouts: [
        ...formData.decorationLayouts,
        {
          title: "",
          description: "",
          image: "",
          type: "Stage",
        },
      ],
    });
  };

  const removeDecoration = (index: number) => {
    setFormData({
      ...formData,
      decorationLayouts: formData.decorationLayouts.filter((_, i) => i !== index),
    });
  };

  const updateDecoration = (
    index: number,
    field: keyof Omit<DecorationLayout, "id">,
    value: string
  ) => {
    const updated = [...formData.decorationLayouts];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, decorationLayouts: updated });
  };

  const addTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [
        ...formData.timeline,
        {
          time: "",
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeTimelineItem = (index: number) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.filter((_, i) => i !== index),
    });
  };

  const updateTimelineItem = (
    index: number,
    field: keyof TimelineItem,
    value: string
  ) => {
    const updated = [...formData.timeline];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, timeline: updated });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const totalBudget = Object.values(formData.budget).reduce((sum, val) => sum + val, 0);

  return (
    <Layout>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium">Create New Event</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-bold mb-4">
              Design Your <span className="gradient-text">Dream Event</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fill in the details below to create a memorable event experience.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: step.id * 0.1 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                    disabled={step.id > currentStep}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      step.id === currentStep
                        ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground neon-glow"
                        : step.id < currentStep
                        ? "bg-primary text-primary-foreground"
                        : "glass"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.button>
                  <span
                    className={`mt-2 text-sm font-medium hidden sm:block ${
                      step.id === currentStep ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 lg:p-8"
          >
            <AnimatePresence mode="wait">
              {/* Step 1: Basic Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-2xl font-display font-bold mb-6">Basic Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Event Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl glass border ${
                          errors.name ? "border-destructive" : "border-border/50"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent`}
                        placeholder="Royal Garden Wedding"
                      />
                      {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Event Date <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl glass border ${
                          errors.date ? "border-destructive" : "border-border/50"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent`}
                      />
                      {errors.date && <p className="text-destructive text-sm mt-1">{errors.date}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value as Event["category"] })
                        }
                        className="w-full px-4 py-3 rounded-xl glass border border-border/50 focus:border-primary outline-none bg-transparent"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-card">
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Location <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl glass border ${
                          errors.location ? "border-destructive" : "border-border/50"
                        } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent`}
                        placeholder="The Grand Palace, Mumbai"
                      />
                      {errors.location && (
                        <p className="text-destructive text-sm mt-1">{errors.location}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Short Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className={`w-full px-4 py-3 rounded-xl glass border ${
                        errors.description ? "border-destructive" : "border-border/50"
                      } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent resize-none`}
                      placeholder="A brief description for the event card..."
                    />
                    {errors.description && (
                      <p className="text-destructive text-sm mt-1">{errors.description}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Description</label>
                    <textarea
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl glass border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent resize-none"
                      placeholder="Detailed description about the event..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Cover Image <span className="text-destructive">*</span>
                    </label>
                    <ImageUpload
                      value={formData.coverImage}
                      onChange={(url) => setFormData({ ...formData, coverImage: url })}
                      placeholder="Upload event cover image"
                      aspectRatio="video"
                      error={errors.coverImage}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold">Budget Estimation</h2>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Budget</p>
                      <p className="text-2xl font-bold gradient-text">{formatCurrency(totalBudget)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: "venue", label: "Venue Cost", icon: "🏛️" },
                      { key: "decoration", label: "Decoration Cost", icon: "🎨" },
                      { key: "catering", label: "Food & Catering", icon: "🍽️" },
                      { key: "photography", label: "Photography", icon: "📸" },
                      { key: "miscellaneous", label: "Miscellaneous", icon: "📦" },
                    ].map((item) => (
                      <div key={item.key}>
                        <label className="flex items-center gap-2 text-sm font-medium mb-2">
                          <span>{item.icon}</span>
                          {item.label}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={formData.budget[item.key as keyof typeof formData.budget] || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                budget: {
                                  ...formData.budget,
                                  [item.key]: parseInt(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-full pl-8 pr-4 py-3 rounded-xl glass border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none bg-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Budget Visualization */}
                  {totalBudget > 0 && (
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <h3 className="font-semibold mb-4">Budget Distribution</h3>
                      <div className="space-y-3">
                        {Object.entries(formData.budget).map(([key, value]) => {
                          const percentage = totalBudget > 0 ? (value / totalBudget) * 100 : 0;
                          return (
                            <div key={key}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">{key}</span>
                                <span>{percentage.toFixed(1)}%</span>
                              </div>
                              <div className="h-2 rounded-full bg-muted overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 3: Products */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold">Products & Items</h2>
                      <p className="text-sm text-muted-foreground">
                        Add products needed for your event
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addProduct}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Product
                    </motion.button>
                  </div>

                  {formData.products.length === 0 ? (
                    <div className="text-center py-12 glass rounded-xl">
                      <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No products added yet</p>
                      <p className="text-sm text-muted-foreground">
                        Click "Add Product" to get started
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {formData.products.map((product, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="glass rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">
                              Product #{index + 1}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeProduct(index)}
                              className="p-1 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Product Image</label>
                              <ImageUpload
                                value={product.image}
                                onChange={(url) => updateProduct(index, "image", url)}
                                placeholder="Upload product photo"
                                aspectRatio="square"
                              />
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                  type="text"
                                  value={product.name}
                                  onChange={(e) => updateProduct(index, "name", e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                  placeholder="Product name"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                  value={product.category}
                                  onChange={(e) => updateProduct(index, "category", e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                >
                                  {productCategories.map((cat) => (
                                    <option key={cat} value={cat} className="bg-card">
                                      {cat}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-sm font-medium mb-1">Price (₹)</label>
                                  <input
                                    type="number"
                                    min="0"
                                    value={product.price || ""}
                                    onChange={(e) =>
                                      updateProduct(index, "price", parseInt(e.target.value) || 0)
                                    }
                                    className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                    placeholder="0"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium mb-1">Quantity</label>
                                  <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) =>
                                      updateProduct(index, "quantity", parseInt(e.target.value) || 1)
                                    }
                                    className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                    placeholder="1"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 4: Decorations */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold">Decoration Layouts</h2>
                      <p className="text-sm text-muted-foreground">
                        Add decoration designs for your event
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addDecoration}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Layout
                    </motion.button>
                  </div>

                  {formData.decorationLayouts.length === 0 ? (
                    <div className="text-center py-12 glass rounded-xl">
                      <Palette className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No decoration layouts added yet</p>
                      <p className="text-sm text-muted-foreground">
                        Click "Add Layout" to get started
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formData.decorationLayouts.map((layout, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="glass rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">
                              Layout #{index + 1}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeDecoration(index)}
                              className="p-1 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <label className="block text-sm font-medium mb-1">Layout Image</label>
                              <ImageUpload
                                value={layout.image}
                                onChange={(url) => updateDecoration(index, "image", url)}
                                placeholder="Upload decoration image"
                                aspectRatio="video"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Title</label>
                              <input
                                type="text"
                                value={layout.title}
                                onChange={(e) => updateDecoration(index, "title", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                placeholder="Stage Design"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Type</label>
                              <select
                                value={layout.type}
                                onChange={(e) => updateDecoration(index, "type", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                              >
                                {decorationTypes.map((type) => (
                                  <option key={type} value={type} className="bg-card">
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <textarea
                                value={layout.description}
                                onChange={(e) =>
                                  updateDecoration(index, "description", e.target.value)
                                }
                                rows={2}
                                className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm resize-none"
                                placeholder="Describe this layout..."
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Step 5: Timeline */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold">Event Timeline</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Add schedule items for your event day
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addTimelineItem}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add Item
                    </motion.button>
                  </div>

                  {formData.timeline.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 glass rounded-xl"
                    >
                      <Clock className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">No timeline items yet</p>
                      <p className="text-sm text-muted-foreground/70 mt-1">
                        Click "Add Item" to create your event schedule
                      </p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {formData.timeline.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="glass rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="text-sm font-medium text-muted-foreground">
                                Schedule Item #{index + 1}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeTimelineItem(index)}
                              className="p-1 rounded-lg hover:bg-destructive/20 text-destructive transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Time</label>
                              <input
                                type="time"
                                value={item.time}
                                onChange={(e) => updateTimelineItem(index, "time", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1">Title</label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => updateTimelineItem(index, "title", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm"
                                placeholder="e.g., Guest Arrival, Ceremony Begins..."
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                              value={item.description}
                              onChange={(e) => updateTimelineItem(index, "description", e.target.value)}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg glass border border-border/50 focus:border-primary outline-none bg-transparent text-sm resize-none"
                              placeholder="Add details about this schedule item..."
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Timeline Preview */}
                  {formData.timeline.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-display font-semibold mb-4">Preview</h3>
                      <div className="glass rounded-xl p-6">
                        <div className="relative">
                          {formData.timeline
                            .filter((item) => item.time && item.title)
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((item, index, arr) => (
                              <div key={index} className="flex gap-4 pb-6 last:pb-0">
                                <div className="relative flex flex-col items-center">
                                  <div className="w-3 h-3 rounded-full bg-primary" />
                                  {index < arr.length - 1 && (
                                    <div className="w-0.5 h-full bg-border absolute top-3" />
                                  )}
                                </div>
                                <div className="flex-1 pb-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-bold text-primary">
                                      {item.time}
                                    </span>
                                    <span className="font-medium">{item.title}</span>
                                  </div>
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "glass hover:neon-glow"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </motion.button>

              {currentStep < steps.length ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium"
                >
                  <Check className="w-5 h-5" />
                  Create Event
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateEvent;
