import { useDealerContext } from "@core-dir/dealer-provider";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Button from "@elements-dir/button";
import { getCompanyOpeningHours } from "@core-dir/helpers/CompanyInfoProcessor";

export default function ContactContentOne() {
  const { dealerData } = useDealerContext();
  const dealerName = dealerData?.CompanyName || "Our Dealership";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 p-3 text-sm rounded-lg placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 transition-all";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're here to help! Whether you have questions about our
                vehicles, financing options, or would like to schedule a test
                drive, our team is ready to assist you.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="space-y-4">
              {/* Address */}
              {dealerData?.Address && (
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                    <p className="text-gray-600">{dealerData.Address}</p>
                    {dealerData?.City && dealerData?.PostCode && (
                      <p className="text-gray-600">
                        {dealerData.City}, {dealerData.PostCode}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Phone */}
              {dealerData?.Phone && (
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                    <a
                      href={`tel:${dealerData.Phone}`}
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      {dealerData.Phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Email */}
              {dealerData?.Email && (
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <a
                      href={`mailto:${dealerData.Email}`}
                      className="text-gray-600 hover:text-primary transition-colors break-all"
                    >
                      {dealerData.Email}
                    </a>
                  </div>
                </div>
              )}

              {/* Business Hours */}
              {dealerData?.Schedules && dealerData.Schedules.length > 0 && (
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                  <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(
                        getCompanyOpeningHours(dealerData?.Schedules || [])
                      ).map(([day, hours]) => (
                        <div
                          //   key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-gray-700 font-medium capitalize">
                            {day}
                          </span>
                          <span className="text-gray-600">
                            {/* {schedule.IsClosed ? (
                              <span className="text-red-600 font-medium">
                                Closed
                              </span>
                            ) : (
                              `${schedule.OpenTime} - ${schedule.CloseTime}`
                            )} */}
                            {hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Map or Additional Info */}
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/20">
              <h3 className="font-semibold text-lg mb-2">
                Why Choose {dealerName}?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Expert advice from experienced professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Wide selection of quality vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Flexible financing options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Comprehensive warranty packages</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClasses}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={inputClasses}
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClasses}
                />
              </div>
              
              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className={inputClasses}
                />
              </div>

              {/* Submit Button */}
              <Button
                variant="primary"
                btnText={isSubmitting ? "Sending..." : "Send Message"}
                // type="submit"
                widthUtilities="w-full"
                // disabled={isSubmitting}
              />

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our Privacy Policy and
                Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
