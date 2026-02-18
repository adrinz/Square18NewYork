import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Headphones
} from 'lucide-react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    orderNumber: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@square18newyork.com',
      link: 'mailto:info@square18newyork.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '(646) 639-8287',
      link: 'tel:+16466398287',
      description: 'Mon-Fri, 9:00 AM - 8:00 PM EST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: '160 Walt Whitman Rd, Huntington Station, NY 11746',
      link: 'https://maps.google.com',
      description: 'By appointment only',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Friday',
      link: null,
      description: '9:00 AM - 8:00 PM EST',
    },
  ];

  const faqItems = [
    {
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight delivery. Free shipping is available on orders over $50.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. Products must be unused and in original packaging. Contact our support team to initiate a return.',
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can also log into your account to view order status.',
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within the United States. We\'re working on expanding to international markets soon.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      orderNumber: '',
      message: '',
    });
  };

  return (
    <main className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero__content text-center">
            <span className="section-subtitle">Get In Touch</span>
            <h1 className="contact-hero__title">Contact Us</h1>
            <div className="divider divider-center"></div>
            <p className="contact-hero__desc">
              Have a question, feedback, or need assistance? We're here to help. 
              Reach out to us and we'll respond as soon as we can.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info section-sm">
        <div className="container">
          <div className="contact-info__grid">
            {contactInfo.map((item, index) => (
              <div key={index} className="contact-info__card">
                <div className="contact-info__icon">
                  <item.icon size={24} />
                </div>
                <h3 className="contact-info__title">{item.title}</h3>
                {item.link ? (
                  <a href={item.link} className="contact-info__content">
                    {item.content}
                  </a>
                ) : (
                  <span className="contact-info__content">{item.content}</span>
                )}
                <span className="contact-info__desc">{item.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section section">
        <div className="container">
          <div className="contact-form__grid">
            {/* Form */}
            <div className="contact-form__wrapper">
              <div className="contact-form__header">
                <MessageSquare size={32} className="contact-form__header-icon" />
                <h2 className="contact-form__title">Send Us a Message</h2>
                <p className="contact-form__subtitle">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-form__row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="form-select"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a topic...</option>
                      <option value="order">Order Inquiry</option>
                      <option value="shipping">Shipping Question</option>
                      <option value="returns">Returns & Exchanges</option>
                      <option value="product">Product Question</option>
                      <option value="wholesale">Wholesale Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="orderNumber" className="form-label">
                      Order Number (if applicable)
                    </label>
                    <input
                      type="text"
                      id="orderNumber"
                      name="orderNumber"
                      className="form-input"
                      placeholder="e.g., SQ18-12345"
                      value={formData.orderNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows="6"
                    placeholder="Please describe how we can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                  <Send size={18} />
                </button>
              </form>
            </div>

            {/* FAQ Sidebar */}
            <div className="contact-faq">
              <div className="contact-faq__header">
                <Headphones size={32} className="contact-faq__header-icon" />
                <h3 className="contact-faq__title">Frequently Asked Questions</h3>
              </div>
              <div className="contact-faq__list">
                {faqItems.map((item, index) => (
                  <div key={index} className="faq-item">
                    <h4 className="faq-item__question">{item.question}</h4>
                    <p className="faq-item__answer">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="contact-map__placeholder">
          <MapPin size={48} />
          <h3>Square18 New York</h3>
          <p>160 Walt Whitman Rd, Huntington Station, NY 11746</p>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
