"use client"

import { useState } from "react"
import { ArrowRight, Minus, Plus, Server, Cpu, HardDrive, Zap, Shield, Clock, Users } from "lucide-react"

interface Plan {
  id: string
  name: string
  description: string
  price: number
  ram: string
  cores: string
  storage: string
  bandwidth: string
  popular: boolean
}

interface Duration {
  value: number
  label: string
  discount: number
}

interface SelectedPlans {
  [key: number]: number
}

const VPSCheckoutPage = () => {
  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for small projects and development",
      price: 3000,
      ram: "4GB",
      cores: "2",
      storage: "100GB",
      bandwidth: "2TB",
      popular: false,
    },
    {
      id: "growth",
      name: "Growth",
      description: "Ideal for growing applications and teams",
      price: 5000,
      ram: "8GB",
      cores: "4",
      storage: "200GB",
      bandwidth: "4TB",
      popular: true,
    },
    {
      id: "power",
      name: "Power",
      description: "Built for high-performance workloads",
      price: 8000,
      ram: "16GB",
      cores: "8",
      storage: "400GB",
      bandwidth: "8TB",
      popular: false,
    },
  ]

  const durations: Duration[] = [
    { value: 1, label: "1 Month", discount: 0 },
    { value: 3, label: "3 Months", discount: 0.05 },
    { value: 6, label: "6 Months", discount: 0.1 },
    { value: 12, label: "1 Year", discount: 0.15 },
  ]

  const [selectedPlans, setSelectedPlans] = useState<SelectedPlans>({})
  const [duration, setDuration] = useState<number>(1)

  const updatePlanQuantity = (planIndex: number, change: number) => {
    setSelectedPlans((prev) => {
      const currentQty = prev[planIndex] || 0
      const newQty = Math.max(0, currentQty + change)

      if (newQty === 0) {
        const { [planIndex]: removed, ...rest } = prev
        return rest
      }

      return { ...prev, [planIndex]: newQty }
    })
  }

  const calculateTotal = () => {
    let subtotal = 0
    Object.entries(selectedPlans).forEach(([index, qty]) => {
      subtotal += plans[Number.parseInt(index)].price * (qty as number)
    })

    const selectedDuration = durations.find((d) => d.value === duration)
    const discount = selectedDuration?.discount || 0
    const total = subtotal * duration * (1 - discount)

    return {
      subtotal: subtotal * duration,
      discount: subtotal * duration * discount,
      total,
    }
  }

  const totals = calculateTotal()
  const selectedDuration = durations.find((d) => d.value === duration)
  const hasItems = Object.keys(selectedPlans).length > 0

  return (
    <div className="min-h-screen bg-white mt-20 dark:bg-[#0a0a0a] transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-gray-100/50 dark:from-gray-900/30 dark:via-transparent dark:to-gray-800/30"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="space-y-4">
                {plans.map((plan, index) => {
                  const qty = selectedPlans[index] || 0
                  const isSelected = qty > 0

                  return (
                    <div
                      key={index}
                      className={`bg-white/80 dark:bg-[#17181b] backdrop-blur-lg rounded-2xl p-6 shadow-md dark:shadow-white/20 border border-gray-200/20 dark:border-gray-700/20 transition-all duration-300 ${
                        isSelected ? "ring-2 ring-gray-900 dark:ring-white/50" : ""
                      }`}
                    >
                      {plan.popular && (
                        <div className="inline-block px-3 py-1 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-medium rounded-full mb-4">
                          Most Popular
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono rounded-lg border border-gray-200 dark:border-gray-700">
                              {plan.price.toLocaleString()} DA/mo
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{plan.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <Server className="w-4 h-4 text-gray-900 dark:text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{plan.ram}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">RAM</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <Cpu className="w-4 h-4 text-gray-900 dark:text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{plan.cores}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">vCores</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <HardDrive className="w-4 h-4 text-gray-900 dark:text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{plan.storage}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">SSD</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-gray-900 dark:text-white" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">{plan.bandwidth}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">Transfer</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updatePlanQuantity(index, -1)}
                            disabled={qty === 0}
                            className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center text-gray-900 dark:text-white"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <div className="w-12 text-center font-mono font-semibold text-gray-900 dark:text-white">{qty}</div>

                          <button
                            onClick={() => updatePlanQuantity(index, 1)}
                            className="h-10 w-10 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 flex items-center justify-center text-gray-900 dark:text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Select Billing Period</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {durations.map((dur) => {
                  const isSelected = duration === dur.value

                  return (
                    <div
                      key={dur.value}
                      className={`relative bg-white/80 dark:bg-[#17181b] backdrop-blur-lg rounded-xl p-4 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border ${
                        isSelected
                          ? "border-gray-900 dark:border-white ring-2 ring-gray-900 dark:ring-white/50"
                          : "border-gray-200/20 dark:border-gray-700/20"
                      }`}
                      onClick={() => setDuration(dur.value)}
                    >
                      {dur.discount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                          Save {dur.discount * 100}%
                        </span>
                      )}
                      <div className="text-center">
                        <p className="font-semibold text-gray-900 dark:text-white">{dur.label}</p>
                        {dur.discount > 0 && <p className="text-xs text-green-500 mt-1">{dur.discount * 100}% off</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/80 dark:bg-[#17181b] backdrop-blur-lg rounded-2xl overflow-hidden shadow-md dark:shadow-white/20 border border-gray-200/20 dark:border-gray-700/20">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
                </div>

                <div className="p-6">
                  {hasItems ? (
                    <>
                      <div className="space-y-4 mb-6">
                        {Object.entries(selectedPlans).map(([index, qty]) => {
                          const planIndex = Number.parseInt(index)
                          const quantity = qty as number
                          
                          return (
                            <div key={index} className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{plans[planIndex].name} VPS</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {quantity} × {duration} month{duration > 1 ? "s" : ""}
                                </p>
                              </div>
                              <p className="font-mono font-medium text-gray-900 dark:text-white">
                                {(plans[planIndex].price * quantity * duration).toLocaleString()} DA
                              </p>
                            </div>
                          )
                        })}
                      </div>

                      <div className="pt-4 mb-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                          <span className="font-mono text-gray-900 dark:text-white">{totals.subtotal.toLocaleString()} DA</span>
                        </div>

                        {selectedDuration?.discount && selectedDuration.discount > 0 && (
                          <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                            <span>Discount ({selectedDuration.discount * 100}%)</span>
                            <span className="font-mono">−{totals.discount.toLocaleString()} DA</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mb-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-600 dark:text-gray-400">Total</span>
                          <div className="text-right">
                            <p className="text-2xl font-bold font-mono text-gray-900 dark:text-white">{totals.total.toLocaleString()}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">DA</p>
                          </div>
                        </div>
                      </div>

                      <button className="w-full h-12 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 group">
                        <span>Complete Purchase</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" />
                        Secure checkout • No hidden fees
                      </p>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Server className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="font-medium mb-1 text-gray-900 dark:text-white">Your cart is empty</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add servers to get started</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { icon: Shield, text: "99.9% uptime guarantee" },
                  { icon: Zap, text: "Instant deployment" },
                  { icon: Users, text: "24/7 expert support" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <item.icon className="w-4 h-4" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VPSCheckoutPage