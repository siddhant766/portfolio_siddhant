import SplitText from "./SplitText";
import BorderGlow from "./BorderGlow";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.id]: "" });
    setErrorMessage("");
  };

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = "Please enter your name (min 2 chars).";
      valid = false;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };

  const submitContact = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok && (data.success || !data.error)) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorMessage(data.error || data.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Could not reach the server. Make sure the backend is running.");
      setStatus("error");
    }
    
    // Automatically reset error status styling after a few seconds
    if (status !== 'success') {
      setTimeout(() => {
         if(status === 'error') setStatus("idle");
      }, 3000);
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setErrorMessage("");
  };

  const downloadCV = () => {
    const a = document.createElement("a");
    a.href = "/Siddhant_Patel_CV.pdf";
    a.download = "Siddhant_Patel_CV.pdf";
    a.click();
  };

  return (
    <section id="contact">
      <div className="sec-head reveal">
        <span className="sec-num">07</span>
        <h2 className="sec-title">
          <SplitText
            text="Get in Touch"
            className=""
            delay={20}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="left"
            tag="span"
          />
        </h2>
        <div className="sec-rule"></div>
      </div>

      {/* Quick links row */}
      <div className="contact-grid reveal">
        <BorderGlow as="a" href="mailto:siddhantpatel766@gmail.com" className="contact-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="c-icon">✉️</div>
          <div>
            <div className="c-lbl">Email</div>
            <div className="c-val">siddhantpatel766@gmail.com</div>
          </div>
        </BorderGlow>
        <BorderGlow as="a" href="tel:+917668999653" className="contact-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="c-icon">📞</div>
          <div>
            <div className="c-lbl">Phone</div>
            <div className="c-val">+91 7668 999 653</div>
          </div>
        </BorderGlow>
        <BorderGlow as="a" href="https://linkedin.com/in/siddhant766" target="_blank" rel="noreferrer" className="contact-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="c-icon">💼</div>
          <div>
            <div className="c-lbl">LinkedIn</div>
            <div className="c-val">linkedin.com/in/siddhant766</div>
          </div>
        </BorderGlow>
        <BorderGlow as="a" href="https://github.com/siddhant766" target="_blank" rel="noreferrer" className="contact-card" backgroundColor="var(--bg1)" style={{ background: 'transparent', border: 'none' }}>
          <div className="c-icon">🐙</div>
          <div>
            <div className="c-lbl">GitHub</div>
            <div className="c-val">github.com/siddhant766</div>
          </div>
        </BorderGlow>
      </div>

      {/* Location Map */}
      <div className="reveal" style={{
        marginTop: '32px',
        marginBottom: '32px',
        background: 'var(--bg1)',
        border: '1px solid var(--line)',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          padding: '20px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid var(--line)'
        }}>
          <span style={{ fontSize: '1.2rem' }}>📍</span>
          <div>
            <div style={{ fontWeight: '700', color: 'var(--t1)', fontSize: '1.05rem' }}>Based in Bareilly, Uttar Pradesh</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.85rem', color: 'var(--t3)', letterSpacing: '.05em' }}>India</div>
          </div>
        </div>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112576.65485428804!2d79.36894019257074!3d28.364028954498966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996e441de47e72f%3A0x4b6f0e428c1f7d35!2sBareilly%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1711100000000"
          width="100%"
          height="280"
          style={{ border: 'none', display: 'block', filter: 'grayscale(0.6) contrast(1.1) brightness(0.85)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Form */}
      <div className="form-wrap reveal">
        <div className="form-left">
          <div className="form-eyebrow">Send a Message</div>
          <h3 className="form-heading">
            Let's work<br />
            <em>together</em>
          </h3>
          <p className="form-subtext">
            Fill in the form and I'll get back to you as soon as possible.
          </p>
          <div className="form-meta">
            <div className="form-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Usually responds within 24 hours
            </div>
            <div className="form-meta-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.09-1.09a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Open to freelance &amp; internships
            </div>
          </div>
        </div>

        <div className="form-right">
          {status === "success" ? (
            <div id="form-success" className="form-success" style={{ display: "flex" }}>
              <div className="success-icon">✓</div>
              <div className="success-title">Message Sent!</div>
              <div className="success-text">Thanks for reaching out. I'll be in touch soon.</div>
              <button className="btn btn-ghost" style={{ marginTop: "16px", fontSize: "1.0rem" }} onClick={resetForm}>
                Send another
              </button>
            </div>
          ) : (
            <form id="contact-form" onSubmit={submitContact}>
              <div className="field-row">
                <div className="field">
                  <label className="field-label" htmlFor="name">Your Name</label>
                  <input
                    className={`field-input ${fieldErrors.name ? "error" : ""}`}
                    id="name"
                    type="text"
                    placeholder="Rahul Sharma"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <span className="field-error">{fieldErrors.name}</span>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="email">Email Address</label>
                  <input
                    className={`field-input ${fieldErrors.email ? "error" : ""}`}
                    id="email"
                    type="email"
                    placeholder="rahul@gmail.com"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="field-error">{fieldErrors.email}</span>
                </div>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="message">Message</label>
                <textarea
                  className={`field-input field-textarea ${fieldErrors.message ? "error" : ""}`}
                  id="message"
                  placeholder="Hi Siddhant, I'd love to discuss a project with you..."
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <span className="field-error">{fieldErrors.message}</span>
              </div>
              <div className="form-footer-row">
                <span className="form-api-error">{errorMessage}</span>
                <button
                  className="btn btn-fill form-submit"
                  type="submit"
                  disabled={status === "loading"}
                  style={status === "error" ? { backgroundColor: "#F44336", borderColor: "#F44336" } : {}}
                >
                  <span id="btn-text">
                    {status === "loading" ? "Sending..." : status === "error" ? "Failed" : "Send Message"}
                  </span>
                  {status !== "loading" && (
                    <svg
                      id="btn-icon"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                  )}
                  {status === "loading" && (
                    <svg
                      id="btn-spinner"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: "spin .7s linear infinite", marginLeft: "8px" }}
                    >
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* CV Banner */}
      <div className="cv-banner reveal">
        <div>
          <div className="cv-sub">Download Resume</div>
          <div className="cv-main">Grab a copy of my CV</div>
        </div>
        <button className="btn btn-fill" onClick={downloadCV}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download CV
        </button>
      </div>
    </section>
  );
}
