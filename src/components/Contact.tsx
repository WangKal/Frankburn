import { useState } from "react";
import { Phone, MessageCircle, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mqaljjoz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent Successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({
          title: "Message Failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "Call Us",
      description: "Speak directly with our property experts",
      value: "+254 728 221 665",
      action: "tel:+254728221665",
      buttonText: "Call Now",
      bgColor: "bg-gradient-ocean"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: "WhatsApp",
      description: "Quick responses and property updates",
      value: "+254 742 292 727",
      action: "https://wa.me/254742292727?text=Hi, I'm interested in the Frankburn Plots beachfront property",
      buttonText: "Chat on WhatsApp",
      bgColor: "bg-gradient-sunset"
    },
    {
      icon: <Mail className="w-8 h-8 text-white" />,
      title: "Email",
      description: "Detailed information and documentation",
      value: "Idimemalindi@gmail.com",
      action: "mailto:Idimemalindi@gmail.com?subject=Inquiry about Frankburn Plots",
      buttonText: "Send Email",
      bgColor: "bg-gradient-ocean"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 text-gradient-ocean">
            Contact Us Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to secure your piece of this prime beachfront paradise? 
            Get in touch with our property experts for detailed information and site visits.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <div className="animate-fade-in-left">
            <h3 className="text-3xl font-bold mb-8 text-gradient-sunset">
              Get In Touch
            </h3>
            
            <div className="space-y-6 mb-12">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index}
                  className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-card overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className={`${method.bgColor} p-6 flex items-center justify-center`}>
                        {method.icon}
                      </div>
                      <div className="flex-1 p-6">
                        <h4 className="text-xl font-bold text-foreground mb-2">
                          {method.title}
                        </h4>
                        <p className="text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <p className="font-semibold text-foreground mb-4">
                          {method.value}
                        </p>
                        <Button asChild className="btn-ocean w-full">
                          <a href={method.action} target="_blank" rel="noopener noreferrer">
                            {method.buttonText}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Location Info */}
            <Card className="bg-gradient-beach border-0 shadow-luxury">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-foreground mb-2">
                      Property Location
                    </h4>
                    <p className="text-muted-foreground">
                      Frankburn Plots, Sand Pipper , Malindi<br />
                      Opposite Sand Pipper International School<br />
                      Coast Province, Kenya
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="animate-fade-in-right">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-luxury">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-8 text-gradient-ocean">
                  Send Us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="h-12"
                        placeholder="+254 XXX XXX XXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="min-h-32 resize-none"
                      placeholder="I'm interested in the Frankburn Plots beachfront property. Please provide more details about..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-ocean w-full h-14 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
                
                <div className="mt-8 p-6 bg-gradient-beach rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    <h4 className="text-lg font-bold text-foreground">Quick Response Guarantee</h4>
                  </div>
                  <p className="text-muted-foreground">
                    We respond to all inquiries within 24 hours. For urgent matters, 
                    please call or WhatsApp us directly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
