import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ShoppingCart, 
  MessageCircle, 
  Award, 
  Zap, 
  Shield,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "AI-Powered Marketplace",
      description: "Connect with buyers through intelligent matching based on your crops, location, and harvest timing."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Mentorship",
      description: "Learn from experienced farmers in your area. Get personalized guidance and grow your farming knowledge."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Community Forum",
      description: "Join discussions, share experiences, and get answers from fellow farmers across South Africa."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Equipment Sharing",
      description: "Share and borrow farming equipment with your community. Reduce costs and increase efficiency."
    }
  ];

  const benefits = [
    "Increase crop sales through AI matching",
    "Learn from experienced mentors",
    "Access shared farming equipment",
    "Connect with local farming community",
    "Get real-time market insights",
    "Improve farming techniques"
  ];

  const testimonials = [
    {
      name: "Thabo Mokoena",
      location: "Gauteng",
      text: "Inkululeko helped me connect with buyers I never would have found on my own. My tomato sales increased by 40%!",
      rating: 5
    },
    {
      name: "Nomsa Dlamini",
      location: "KwaZulu-Natal",
      text: "The mentorship program changed my farming approach. I learned drought-resistant techniques that saved my harvest.",
      rating: 5
    },
    {
      name: "Sipho Khumalo",
      location: "Limpopo",
      text: "Being able to share equipment with neighbors has reduced my costs significantly. Great community platform!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Growing Together,
              <br />
              <span className="text-primary-200">Harvesting Success</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
              Join South Africa's premier agricultural social network. Connect with buyers, 
              learn from mentors, and grow your farming business with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/dashboard"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with community-driven support 
              to help South African farmers thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Inkululeko?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We understand the unique challenges facing South African farmers. 
                Our platform is designed to address these challenges with innovative 
                solutions and community support.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="South African farmers"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Zap className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">AI-Powered</p>
                    <p className="font-semibold text-gray-900">Smart Matching</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Farmers Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of South African farmers who are already growing with Inkululeko
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join the Inkululeko community today and start connecting with buyers, 
            mentors, and fellow farmers across South Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <div className="flex items-center justify-center space-x-2 text-primary-100">
              <Shield className="w-5 h-5" />
              <span>Free to join • No hidden fees</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;